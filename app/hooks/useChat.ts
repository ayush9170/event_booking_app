"use client"
import { useState } from 'react';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (newMessage: string) => {
    if (!newMessage.trim()) {
      setError('Message cannot be empty');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Add user message to the conversation
      const userMessage: Message = { role: 'user', content: newMessage };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      // Call the API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      
      if (!data.content) {
        throw new Error('Invalid response format from server');
      }

      // Add assistant response to the conversation
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.content 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(
        err instanceof Error ? 
        err.message : 
        'An unknown error occurred while processing your message'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return { 
    messages, 
    sendMessage, 
    isLoading, 
    error,
    clearMessages
  };
};