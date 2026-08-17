import { SystemMessage , HumanMessage} from '@langchain/core/messages';
import llm from '../config/llm.js';


//resume agent
const resumeAgent = async (resumeText) => {
    const response = await llm.invoke([

        //system message
         new SystemMessage(`
You are an Expert ATS Resume Analyzer.

Analyze the given resume.

Extract the following information:

- Full Name
- Email
- Phone Number
- Professional Summary
- Technical Skills
- Projects
- Education
- Experience
- Strengths
- Weaknesses
- Missing Skills
- Suggested Job Role
- ATS Score (0-100)
- Recommendations

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do not use markdown.
3. Do not explain anything.
4. Do not add extra text.
5. Every field must exist.
For education, return an array of strings.
Each education entry must be a single string containing degree, institution, and period.

Example:
"education": [
  "Bachelor of Technology (B.Tech) – Computer Science and Engineering | Dr. A.P.J. Abdul Kalam Technical University, Lucknow, India | 2022 – 2026"
]

For projects, return an array of strings.
For experience, return an array of strings.
For skills, strengths, weaknesses, missingSkills and recommendations, return arrays of strings.

Response Format:

{
  "name":"",
  "email":"",
  "phone":"",
  "summary":"",
  "skills":[],
  "projects":[],
  "education":[],
  "experience":[],
  "strengths":[],
  "weaknesses":[],
  "missingSkills":[],
  "suggestedRole":"",
  "score":0,
  "recommendations":[]
}
`),

  //Human message
     new HumanMessage(resumeText)
    ])

    return response.content;
}

export default resumeAgent