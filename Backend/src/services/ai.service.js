const  { GoogleGenAI } = require("@google/genai");
const {z} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY,
});


const interviewReportSchema = z.object({
    technicalQuestions: z.array(z.object({
        question=z.string().describe("The technical question can be ask in the interview"),
        intention=z.string().describe("The intention of interview behind asking this question"),
        answer=string.describe("How to answer this question , what points to cover , what approach to take etc,")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer that"),
       
    behaviouralQuestions: z.array(z.object({
         question=z.string().describe("The technical question can be ask in the interview"),
        intention=z.string().describe("The intention of interview behind asking this question"),
        answer=string.describe("How to answer this question , what points to cover , what approach to take etc,")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer that"),
       
    skillGap=z.array(z.object({
        skill=z.string().describe("The skill which the candidate is lacking "),
        severity=z.enum(["low","medium","high"]).describe("The severity of this gap i.e, how important is this skill for this job "),
    })).describe("List of skill gaps in the candidate's profile aling with their severity"),
   

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
});

async function generateInterviewReport({resume,selfDescription,jobDescription}){

    const prompt = `Generate an interview report for a candidate with the following details:
                    Resume: ${resume} 
                    Self Description: ${selfDescription}
                     Job Description: ${jobDescription}`

    const response =await ai.models.generateContent({
        model:"gemini-3.1-flash-lite",
        content : prompt,
        config :{
            responseMimeType:"application/json",
            responseJsonSchema:zodToJsonSchema(interviewReportSchema)
        }
    })
       return JSON.parse(response.text)

}
 module.exports = generateInterviewReport;