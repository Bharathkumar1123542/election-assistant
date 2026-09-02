import { useCallback, useState } from 'react';
import apiClient from '../services/apiClient';

export type ChatMessage = { text: string; isUser: boolean };

const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: 'Welcome! Ask any election question to get started.', isUser: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (message: string) => {
    const userMessage: ChatMessage = { text: message, isUser: true };
    const loadingMessage: ChatMessage = { text: 'Searching for the best answer...', isUser: false };

    setMessages((current) => [...current, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      const response = await apiClient.post('/chat', { message });
      const answer = response.data?.answer ?? 'Sorry, I could not get a response from the assistant.';
      setMessages((current) => [...current.slice(0, -1), { text: answer, isUser: false }]);
    } catch (error) {
      setMessages((current) => [
        ...current.slice(0, -1),
        { text: 'Unable to reach the election assistant. Please try again.', isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, sendMessage, isLoading };
};

export default useChat;
