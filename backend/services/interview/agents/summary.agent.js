
import llm from "../config/llm";
import summaryPrompt from "../prompts/summaryPrompt.js";

export const summaryAgent = async (data) => {
    try {
        const prompt = summaryPrompt(data);

        //send prompt to llm
        const response = await llm.invoke(prompt);

        //cleaned response
         const cleaned = response.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    } catch (error) {
        console.log("Error in summary agent", error);
        console.log(response.content)
        throw new Error("Failed to generate summary.");
    }
}