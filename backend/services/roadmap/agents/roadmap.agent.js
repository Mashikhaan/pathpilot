import llm from "../config/llm";
import { SystemMessage, HumanMessage } from "langchain/schema";
import roadmapPrompt from "../prompt/roadmap.prompt.js"

//roadmap agent
const roadmapAgent = async(state) =>{
   try{
       //if resume exists, use it to resume the roadmap
       const resume = state.useResume ? {
         skills: state.resume.skills,
         missingSkills: state.resume.missingSkills,
         projects: state.resume.projects,
         experience: state.resume.experience,
         score: state.resume.score,
         suggestedRole: state.resume.suggestedRole,
         recommendations: state.resume.recommendations,    
       }: null;

       //response 
         const response = await llm.invoke([
        new SystemMessage(roadmapPrompt),
        new HumanMessage(`
            Target Role ${state.role}
            Target Package ${state.targetPackage}
            Resume ${JSON.stringify(resume, null, 2)}`)
         ]);

         //roadmap
         const roadmap = JSON.parse(  //use parse because LLM response can string
      response.content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()
    );

    //schema define first letter capitalize and other small so for safety use this
    const capitalize = (value = "") =>
      value.charAt(0).toUpperCase() +
      value.slice(1).toLowerCase();

    roadmap.level = capitalize(roadmap.level);

    roadmap.modules = (roadmap.modules || []).map((module) => ({
      ...module,
      difficulty: capitalize(module.difficulty),
    }));


    return {
      ...state,
      roadmap,
    };

}catch(error){
    console.error("Error occurred while processing roadmap:", error);
    throw error;
}
}

export default roadmapAgent;