import feedbackPrompt from "../prompts/feedbackPrompt.js"
import llm from "../config/llm.js"



export const feedbackAgent = async (data) => {
    try {
        const prompt = feedbackPrompt(data);
    
        //send prompt to llm
        const response = await llm.invoke(prompt);

     //cleaned response
         const cleaned = response.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    } catch (error) {
        console.log("Error in feedback agent", error);
        console.log(response.content)
        throw new Error("Failed to generate feedback.");
    }
}