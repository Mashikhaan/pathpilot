import mongoose from "mongoose";


//feedback schema
const feedbackSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      default: 0,
    },

    correctness: {
      type: Number,
      default: 0,
    },

    clarity: {
      type: Number,
      default: 0,
    },

    relevance: {
      type: Number,
      default: 0,
    },

    detail: {
      type: Number,
      default: 0,
    },

    efficiency: {
      type: Number,
      default: 0,
    },

    communication: {
      type: Number,
      default: 0,
    },

    problemSolving: {
      type: Number,
      default: 0,
    },

    creativity: {
      type: Number,
      default: 0,
    },

    feedback: {
      type: String,
      default: "",
    },

    improvements: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);


//question schema
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    userAnswer: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    timer: {
      type: Number,
      default: 60,
    },

    feedback: {
      type: feedbackSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

//interview schema
const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["hr", "technical"],
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    useResume: {
      type: Boolean,
      default: false,
    },

    currentQuestion: {
      type: Number,
      default: 0,
    },

    questions: {
      type: [questionSchema],
      default: [],
    },

    overallScore: {
      type: Number,
      default: 0,
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    recommendations: {
      type: [String],
      default: [],
    },

    summary: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },
  },
  {
    timestamps: true,
  }
);

const interviewModel = mongoose.model("Interview", interviewSchema);

export default interviewModel;