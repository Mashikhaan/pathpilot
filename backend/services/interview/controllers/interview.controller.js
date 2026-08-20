import graph from "../graph/graph.js";
import interviewModel from "../models/interview.model.js";



//interview start controller
export const startInterviewController = async (req, res) => {
    try {
        //get user id from custom header 
    const userId = req.headers["x-user-id"];

    const{
        type,
        role,
        useResume = false,
        resume = {}
    } = req.body;

    //validation
    if(!userId && !role){
        return res.status(400).json({
            success: false,
            message: "Interview type and role are required"
        })
    }

    // LangGraph-graph invocation and update interview state
    const result = await graph.invoke({
        action: "start",
        type,
        role,
        useResume,
        resume
    });

    const questions = result.questions;
    //questions validation
    if(!questions || questions.length === 0){
        return res.status(400).json({
            success: false,
            message: "failed to generate interview questions"
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

    //send response
    return res.status(201).json({
        success: true,
        interviewId: interview._id,
        currentQuestion: 0,
        totalQuestions: interview.questions.length,
        question: interview.questions[0],
    })

    }catch(error){
      console.log("Error in start interview controller", error);
      return res.status(500).json({
          success: false,
          message: error.message
      })
    }

}


//interview submit answer controller
export const submitAnswerController = async (req, res) => {
    try{
        //get interview id from custom header
        const userId = req.headers["x-user-id"];

        const{interviewId, answer} = req.body;

        //validation
        if(!interviewId || !answer){
            return res.status(400).json({
                success: false,
                message: "Interview id and answer are required"
            })
        }

        //find interview 
        const interview = await interviewModel.findOne({
            _id: interviewId,
            userId
        })

        if(!interview){
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            })
        }

        //Already completed
        if(interview.status === "completed"){
            return res.status(400).json({
                success: false,
                message: "Interview already completed"
            })
        }

        //current question
        const index = interview.currentQuestion;
        const currentQuestion = interview.questions[index];
        
        //validation
        if(!currentQuestion){
            return res.status(400).json({
                success: false,
                message: "Invalid question index"
            })
        }

        //save user answer
        currentQuestion.userAnswer = answer;

        //check last question
        const completed = interview.currentQuestion + 1 === interview.questions.length;

        //LangGraph-graph invocation and update interview state
        const result = await graph.invoke({
            action: "feedback",
            question: currentQuestion.question,
            answer,
            difficulty: currentQuestion.difficulty,
            completed,
            role:interview.role,
            type:interview.type,
            questions: interview.questions
        });

        //save feedback
        currentQuestion.feedback = result.feedback;
        interview.currentQuestion++;

        //completed
        if(completed){
            interview.status = "completed";
            interview.overallScore = result.report.overallScore;
            interview.summary = result.report.summary;
            interview.strengths = result.report.strengths;
            interview.weaknesses = result.report.weaknesses;
            interview.recommendations = result.report.recommendations;

            //save interview in database
            await interview.save();

            return res.status(200).json({
                success: true,
                completed:true,
                interview
            })
        }

        //save progress
        await interview.save();

        return res.status(200).json({
            success: true,
            completed:false,
            currentQuestion: interview.currentQuestion,
            question: interview.questions[interview.currentQuestion],
            feedback: result.feedback
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//get interview controller
export const getInterviewController = async (req, res) => {
    try{
      //get userId from custom header
      const userId = req.headers["x-user-id"];
      //get id from param
      const {id} = req.params;

      //find interview
      const interview = await interviewModel.findOne({
        _id: id,
        userId
      })

      //if not exist
      if(!interview){
        return res.status(404).json({
            success: false,
            message: "Interview not found"
        })
      }

      //send response
      return res.status(200).json({
          success: true,
          interview
      })
    }catch(error){
      console.log(error)
      return res.status(500).json({
          success: false,
          message: error.message
      })
    }
}
