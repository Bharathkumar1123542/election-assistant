import create from 'zustand';
import { ChatMessage } from '../hooks/useChat';

interface ChatState {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  reset: () => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [{ text: 'Welcome to Election Assistant!', isUser: false }],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  reset: () => set({ messages: [{ text: 'Welcome to Election Assistant!', isUser: false }] }),
}));

export default useChatStore;
