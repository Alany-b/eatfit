import React, { useState, useRef, useEffect } from 'react';
import { getFittyResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';

const initialMessage: ChatMessage = {
  role: 'model',
  parts: [{ text: "¡Hola! Soy Fitty 🍏. ¿En qué puedo ayudarte hoy sobre nutrición o sobre EatFit?" }],
};

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${isUser ? 'bg-green-700 text-white' : 'bg-gray-700 text-gray-200'}`}>
        <p className="whitespace-pre-wrap">{message.parts[0].text}</p>
      </div>
    </div>
  );
};

const TypingIndicator: React.FC = () => (
    <div className="flex justify-start">
      <div className="bg-gray-700 text-gray-200 rounded-2xl px-4 py-2">
        <div className="flex items-center space-x-1">
            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
);


export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', parts: [{ text: userInput.trim() }] };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const responseText = await getFittyResponse(newMessages.slice(1), userInput.trim()); // Pass history without initial welcome message
      const modelMessage: ChatMessage = { role: 'model', parts: [{ text: responseText }] };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Error fetching Fitty's response:", error);
      const errorMessage: ChatMessage = { role: 'model', parts: [{ text: "Oops, algo salió mal. Por favor, inténtalo de nuevo." }] };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed bottom-20 right-5 sm:right-10 z-40 w-[90vw] max-w-md h-[60vh] bg-gray-800 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="font-bold text-white">Chat con Fitty 🍏</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </header>

        <main className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => <ChatBubble key={index} message={msg} />)}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
        </main>

        <footer className="p-4 border-t border-gray-700">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Pregúntale a Fitty..."
                    disabled={isLoading}
                    className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 placeholder-gray-400 disabled:opacity-50"
                    aria-label="Chat input"
                />
                <button type="submit" disabled={isLoading || !userInput.trim()} className="p-2.5 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors" aria-label="Send message">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                </button>
            </form>
        </footer>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-5 right-5 sm:right-10 z-50 w-16 h-16 bg-green-600 rounded-full text-white flex items-center justify-center shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-800" aria-label={isOpen ? "Close chat" : "Open chat"}>
        {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}
      </button>
    </>
  );
};
