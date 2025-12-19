
import { GoogleGenAI } from "@google/genai";

export async function askSCMAssistant(prompt: string, contextData: any) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    You are the Twellium SCM AI Assistant. 
    You have access to current inventory levels and activity logs.
    Your goal is to help warehouse managers optimize operations.
    Current Context: ${JSON.stringify(contextData)}
    Provide concise, professional, and actionable advice.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the brain center. Please try again later.";
  }
}
