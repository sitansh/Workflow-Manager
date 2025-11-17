
import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyC7f4xc4EyOvdZLi-tfGv7rsm2bAaJRhE8";

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function executePythonCode(code: string): Promise<string> {
  const prompt = `
    You are a Python interpreter. Execute the following Python code and return ONLY the standard output (stdout).
    Do not provide any explanations, introductory text, or markdown formatting like \`\`\`python.
    Just return the raw text that would be printed to the console if the code were run.

    Python code to execute:
    ---
    ${code}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Failed to execute code. Gemini API Error: ${error.message}`;
    }
    return "Failed to execute code due to an unknown error.";
  }
}