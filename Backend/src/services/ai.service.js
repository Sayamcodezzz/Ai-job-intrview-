const  { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY,
});
async function invokeGeminiAi() {
  try {
    const response = await ai.models.generateContent({
      model: "models/gemini-3.1-flash-lite",
      contents: "Explain how AI works in a few words",
    });

    console.log(response.text);
  } catch (err) {
    console.error(err.message);
    console.error(err);
  }
}
 module.exports=invokeGeminiAi;