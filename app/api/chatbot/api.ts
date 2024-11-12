// api.ts
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL_CHAT}/api/v1`;

export interface ChatMessage {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const sendMessage = async (
  text: string,
  token: string
): Promise<string> => {
  try {
    const response = await axios.post(
      `${API_URL}/chatbot`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // Assuming the API returns { response: "message text" }
    // Extract the actual message text from the response
    return response.data.response || "No response from bot";
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
