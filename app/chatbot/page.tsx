"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import { sendMessage, ChatMessage } from "@/app/api/chatbot/api";
import { getSession } from "next-auth/react";
import Userme from "../api/auth/userme";
import { User } from "../campgrounds/search/page";

const ChatbotPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const session = await getSession();
        const userToken = (session?.user as User)?.token ?? null;

        if (!userToken) {
          router.push("/login");
          return;
        }

        setToken(userToken);
        const user = await Userme(userToken);
        setProfile(user?.data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending || !token) return;

    const userMessage: ChatMessage = {
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsSending(true);

    try {
      const responseText = await sendMessage(inputText, token);
      const botMessage: ChatMessage = {
        text: responseText, // Using the extracted text from the response
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        text: "Sorry, I couldn't process your message. Please try again.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen  p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 flex flex-col h-[80vh]">
          <ScrollArea className="flex-grow mb-4 pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.isBot
                        ? "bg-gray-200 text-gray-800"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
              disabled={isSending}
            />
            <Button type="submit" disabled={isSending}>
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotPage;
