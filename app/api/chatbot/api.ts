// api.ts
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL_CHAT}/api/v1`;

export interface ChatMessage {
  text: string;
  isBot: boolean;
  timestamp: Date;
}
async function getToken(token?: string) {
  if (token) {
    return token;
  }
  const response = await fetch("/api/token");
  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }
  const data = await response.json();

  console.log("data is", data);
  console.log("data.token is", data.token);
  return data.token;
}

export const sendMessage = async (text: string): Promise<string> => {
  try {
    const token = await getToken();
    const response = await axios.post(
      `${API_URL}/chatbot`,
      { text },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
