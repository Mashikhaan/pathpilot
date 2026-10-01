import { Annotation } from "@langchain/langgraph";


//roadmap state create
export const roadmapState = Annotation.Root({
  role: Annotation,
  targetPackage: Annotation,
  useResume: Annotation,
  resume: Annotation,
  roadmap: Annotation,

})