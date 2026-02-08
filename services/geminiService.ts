
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Agent, Message } from "../types";

export const chatWithAgent = async (
  agent: Agent,
  history: Message[],
  userInput: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Prepare history for Gemini format
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  // Add current message
  contents.push({
    role: 'user',
    parts: [{ text: userInput }]
  });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: agent.model,
      contents,
      config: {
        systemInstruction: agent.systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: " + (error instanceof Error ? error.message : "An unexpected error occurred.");
  }
};

export const suggestAgentDetails = async (description: string): Promise<Partial<Agent>> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Based on the following short description: "${description}", suggest a professional name, a more detailed description, and a comprehensive system instruction for an AI agent. Return the result in a clean JSON format with keys: name, description, systemInstruction.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const json = JSON.parse(response.text || "{}");
    return json;
  } catch (error) {
    console.error("Suggestion Error:", error);
    return {};
  }
};
