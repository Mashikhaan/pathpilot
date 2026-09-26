import graph from "../graph/graph.js";
import interviewModel from "../models/interview.model.js";

//interview start controller
export const startInterviewController = async (req, res) => {
  try {
    //get user id from custom header
    const userId = req.headers["x-user-id"];

    const { type, role, useResume = false, resume = {} } = req.body;

    //validation
    if (!userId || !role) {
      return res.status(400).json({
        success: false,
        message: "Interview type and role are required",
      });
    }

    // LangGraph-graph invocation and update interview state
    const result = await graph.invoke({
      action: "start",
      type,
      role,
      useResume,
      resume,
    });

    const questions = result.questions;
    //questions validation
    if (!questions || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "failed to generate interview questions",
      });
    }

    // Create Interview
    const interview = await interviewModel.create({
      userId,
      type,
      role,
      useResume,
      questions,
      currentQuestion: 0,
      status: "in-progress",
    });

     //delete data from redis when we start interview so that we can get updated data otherwise it will return cached data
    await redis.del(`interviews:${userId}`);

    //send response
    return res.status(201).json({
      success: true,
      interviewId: interview._id,
      currentQuestion: 0,
      totalQuestions: interview.questions.length,
      question: interview.questions[0],
    });
  } catch (error) {
    console.log("Error in start interview controller", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//interview submit answer controller
export const submitAnswerController = async (req, res) => {
  try {
    //get interview id from custom header
    const userId = req.headers["x-user-id"];

    const { interviewId, answer } = req.body;

    //validation
    if (!interviewId || !answer) {
      return res.status(400).json({
        success: false,
        message: "Interview id and answer are required",
      });
    }

    //find interview
    const interview = await interviewModel.findOne({
      _id: interviewId,
      userId,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    //Already completed
    if (interview.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Interview already completed",
      });
    }

    //current question
    const index = interview.currentQuestion;
    const currentQuestion = interview.questions[index];

    //validation
    if (!currentQuestion) {
      return res.status(400).json({
        success: false,
        message: "Invalid question index",
      });
    }

    //save user answer
    currentQuestion.userAnswer = answer;

    //check last question
    const completed =
      interview.currentQuestion + 1 === interview.questions.length;

    //LangGraph-graph invocation and update interview state
    const result = await graph.invoke({
      action: "feedback",
      question: currentQuestion.question,
      answer,
      difficulty: currentQuestion.difficulty,
      completed,
      role: interview.role,
      type: interview.type,
      questions: interview.questions,
    });

    //save feedback
    currentQuestion.feedback = result.feedback;
    interview.currentQuestion++;

    //completed
    if (completed) {
      interview.status = "completed";
      interview.overallScore = result.report.overallScore;
      interview.summary = result.report.summary;
      interview.strengths = result.report.strengths;
      interview.weaknesses = result.report.weaknesses;
      interview.recommendations = result.report.recommendations;

      //save interview in database
      await interview.save();

      //delete data from redis when we complete interview so that we can get updated data otherwise it will return cached data
        await redis.del(`interviews:${userId}`);

      return res.status(200).json({
        success: true,
        completed: true,
        interview,
        feedback: result.feedback,
      });
    }

    //save progress
    await interview.save();

    //delete data from redis when we submit answer so that we can get updated data otherwise it will return cached data
    await redis.del(`interviews:${userId}`);

    return res.status(200).json({
      success: true,
      completed: false,
      currentQuestion: interview.currentQuestion,
      question: interview.questions[interview.currentQuestion],
      feedback: result.feedback,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get interview controller
export const getInterviewController = async (req, res) => {
  try {
    //get userId from custom header
    const userId = req.headers["x-user-id"];
    //get id from param
    const { id } = req.params;

    //find interview
    const interview = await interviewModel.findOne({
      _id: id,
      userId,
    });

    //if not exist
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    //send response
    return res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all interviews controller
export const getAllInterviewsController = async (req, res) => {
  try {
    //get userId from custom header
    const userId = req.headers["x-user-id"];

    //get from redis if exist
    const cache = await redis.get(`interviews:${userId}`);

    if (cache) {
      console.log("data comes from redis cache");
      return res.status(200).json(JSON.parse(cache));
    }

    //MongoDB query to get all interviews
    //find all interviews
    const interviews = await interviewModel
      .find({ userId })
      .sort({ createdAt: -1 });

    //Dashboard  statistics
    //completed interviews
    const completed = interviews.filter(
      (interview) => interview.status === "completed",
    );

    //total questions
    const totalQuestions = interviews.reduce(
      (sum, item) => sum + item.questions.length,
      0,
    );

    //average score
    const averageScore =
      completed.length > 0
        ? Number(
            completed.reduce((sum, item) => sum + item.overallScore, 0) /
              completed.length,
          ).toFixed(1)
        : 0;

    const stats = {
      totalInterviews: interviews.length,
      completedInterviews: completed.length,
      totalQuestions,
      averageScore,
    };

    //Graph Average for technical and hr interviews
    const getAverageData = (list) => {
      if (!list.length) {
        //feedback return
        return [
          { skill: "Correctness", score: 0 },
          { skill: "Clarity", score: 0 },
          { skill: "Relevance", score: 0 },
          { skill: "Detail", score: 0 },
          { skill: "Efficiency", score: 0 },
          { skill: "Communication", score: 0 },
          { skill: "Problem solving", score: 0 },
          { skill: "Creativity", score: 0 },
        ];
      }

      const total = {
        Correctness: 0,
        Clarity: 0,
        Relevance: 0,
        Detail: 0,
        Efficiency: 0,
        Communication: 0,
        problemSolving: 0,
        Creativity: 0,
      };

      list.forEach((interview) => {
        interview.questions.forEach((q) => {
          total.Correctness += q.feedback.Correctness || 0;
          total.Clarity += q.feedback.Clarity || 0;
          total.Relevance += q.feedback.Relevance || 0;
          total.Detail += q.feedback.Detail || 0;
          total.Efficiency += q.feedback.Efficiency || 0;
          total.Communication += q.feedback.Communication || 0;
          total.ProblemSolving += q.feedback.ProblemSolving || 0;
          total.Creativity += q.feedback.Creativity || 0;
        });
      });
       
      const count = list.reduce((sum, item) => sum + item.questions.length, 0);

      if(count === 0){
        return [
            { skill: "Correctness", score: 0 },
            { skill: "Clarity", score: 0 },
            { skill: "Relevance", score: 0 },
            { skill: "Detail", score: 0 },
            { skill: "Efficiency", score: 0 },
            { skill: "Communication", score: 0 },
            { skill: "Problem solving", score: 0 },
            { skill: "Creativity", score: 0 },
        ]
      }

      return [
        { skill: "Correctness", score: Math.round(total.Correctness / count) },
        { skill: "Clarity", score: Math.round(total.Clarity / count) },
        { skill: "Relevance", score: Math.round(total.Relevance / count) },
        { skill: "Detail", score: Math.round(total.Detail / count) },
        { skill: "Efficiency", score: Math.round(total.Efficiency / count) },
        { skill: "Communication", score: Math.round(total.Communication / count) },
        { skill: "Problem solving", score: Math.round(total.ProblemSolving / count) },
        { skill: "Creativity", score: Math.round(total.Creativity / count) },
      ];
    };


     //technical interview
     const technicalInterview = completed.filter((interview) => interview.type === "technical");
     //hr interview
     const HrInterview = completed.filter((interview) => interview.type === "hr");

    //average data for technical and hr interviews
    const technicalAverage = getAverageData(technicalInterview);
    const hrAverage = getAverageData(HrInterview);

    const technicalCount = technicalInterview.length;
    const hrCount = HrInterview.length;

    //payload
    const payload = {
        success: true,
        interviews,
        stats,
        technicalAverage,
        hrAverage,
        technicalCount,
        hrCount
    };

    //set payload in redis cache for 10 minutes hour
    await redis.set(`interviews:${userId}`, JSON.stringify(payload), "EX", 600);

    return res.status(200).json(payload);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
