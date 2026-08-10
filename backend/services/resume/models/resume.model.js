import mongoose from "mongoose";

//resume schema
const resumeSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    extractedText: {
        type: String,
        required: true
    },
    score: {
        type: Number,
       default: 0
    },
    summary: {
        type: String,
        default: 0
    },
    name:{
        type: String,
       default: ""
    },
    email: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    education:{
        type: [String],
        default: []
    },
    skills:  {
        type: [String],
        default: []
    },
    projects: {
        type: [String],
        default: []
    },
    experience: {
        type: [String],
        default: []
    },
    Strength: {
        type: [String],
        default: []
    },
    weakness: {
        type: [String],
        default: []
    },
    missingSkills: {
        type: [String],
        default: []
    },
    suggestedRole: {
        type: [String],
        default: ""
    },
    recommendations: {
        type: [String],
        default: []
    },
   

} ,{timestamps: true})

//resume model
const resumeModel = mongoose.model("Resume", resumeSchema);
export default resumeModel