
import mongoose from "mongoose";

//module schema
const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
    },
    description: {
        type: String,
        required: true,
    },
    youtube: {
        type: String,
        default: "",
    },
    article: {
        type: String,
        default: "",
    }
},
    { _id: false }
);

//roadmap schema

const roadmapSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
    },
    targetPackage: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true
    },
    modules: {
        type: [moduleSchema],
        default: []
    }
}, { timestamps: true });

//roadmap model
const roadmapModel = mongoose.model("Roadmap", roadmapSchema);

export default roadmapModel;