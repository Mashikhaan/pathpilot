
import { START, END, StateGraph } from "@langchain/langgraph";
import InterviewState from "./state.js";
import { feedbackNode, interviewNode, summaryNode } from "./nodes.js";



//Decide first node based on action
function router(state){
    switch(state.action){
        case "start":
            return "interviewAgent";
        case "feedback":
            return "feedbackAgent";
        default:
             return END;
    }
}

//Decide after feedback
function feedbackRouter(state){
    if(state.completed){
        return "summaryAgent";
    }

    return END;
}


//create graph with interview state

const graph = new StateGraph(InterviewState)

//register node
.addNode("interviewAgent", interviewNode)
.addNode("feedbackAgent", feedbackNode)
.addNode("summaryAgent", summaryNode)

//register edge
.addEdge("interviewAgent", "feedbackAgent")
.addEdge("feedbackAgent", "summaryAgent")

//START -> ROUTER -> END
.addConditionalEdges(
    START,
    router,
    {
        interviewAgent: "interviewAgent",
        feedbackAgent: "feedbackAgent",
    }
)

//INTERVIEW -> END
.addEdge("interviewAgent", END)

//FEEDBACK -> SUMMARY/END
.addConditionalEdges(
    "feedbackAgent",
    feedbackRouter,
    {
        summaryAgent: "summaryAgent",
        [END]: END,
    }
)

//SUMMARY -> END
.addEdge("summaryAgent", END)

//compile graph
.compile();

export default graph;