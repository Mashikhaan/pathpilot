
import hrInterviewPrompt from "../prompts/hrInterviewPrompt.js"
import technicalInterviewPrompt from "../prompts/technicalInterviewPrompt.js"
import llm from "../config/llm.js"


export const interviewAgent = async (data) => {
    try{
        //prompt 
        const prompt = data.type?.toLowerCase() === "hr" ? hrInterviewPrompt(data) : technicalInterviewPrompt(data)

        //send prompt to llm
        const response = await llm.invoke(prompt)

        //cleaned response
         const cleaned = response.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

      return JSON.parse(cleaned);
    }catch(error){
   console.log("Error in interview agent", error);
   console.log(response.content)
   throw new Error("Failed to generate interview questions.")
    }
}