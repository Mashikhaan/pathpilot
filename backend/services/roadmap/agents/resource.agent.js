import llm from "../config/llm.js";
import { SystemMessage, HumanMessage } from "langchain/schema";
import resourcePrompt from "../prompt/resource.prompt.js";
import searchVideos from "../config/youtube.js";

//resource agent create
const resourceAgent = async(state) =>{
    try{
        //roadmap through state
        const roadmap = state.roadmap;

        //Get all module titles
        const moduleTitle = roadmap.modules.map((module) => module.title).join('\n');

        //llm invoke to get resources 
        const docsResponse = await llm.invoke([
           new SystemMessage(resourcePrompt),
           new HumanMessage(`Modules: ${moduleTitle}`)
        ]);

        let docs = [];

        try{
            //parse the response content to JSON 
            docs = JSON.parse(
                docsResponse.content
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim()
            );
        }
        catch(error){
            docs = [];
            console.error("Error in resource agent", error);
            throw error;
        }

        //create a map of docs with title as key and article as value
        const docsMap = new Map();
        
        //iterate through docs and add to map
        docs.forEach((item) => {
            docsMap.set(item.title.toLowerCase(), item.article);
        });

        // Parallel YouTube Search for each module
        roadmap.modules = await Promise.all(
            roadmap.modules.map(async (module) =>{
              let video = null;

              try{
                //search video for each module
                video = await searchVideos(module.title);

              }catch(error){
                console.error(`Error searching video for module ${module.title}:`, error);
              }
              //return the module with video and article
              return{
                ...module,
                youtube: video?.url || "",
                article: docsMap.get(module.title.toLowerCase()) || "",
              }
            })
        );

        return {
            ...state,
            roadmap,
        };
    }catch(error){
        console.error("resource agent error:", error);
        return state;
    }
}


export default resourceAgent;