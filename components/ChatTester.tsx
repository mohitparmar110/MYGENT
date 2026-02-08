
import React, { useState, useRef, useEffect } from 'react';
import { Agent, Message } from '../types';
import { chatWithAgent } from '../services/geminiService';

interface ChatTesterProps {
  agent: Agent;
  onBack: () => void;
}

const ChatTester: React.FC<ChatTesterProps> = ({ agent, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseContent = await chatWithAgent(agent, messages, input);

    const modelMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: responseContent,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)] flex flex-col bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      <header className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{agent.icon}</span>
            <div>
              <h2 className="font-bold text-gray-900 leading-none">{agent.name}</h2>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Testing Session</span>
            </div>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Reset
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto opacity-60">
            <div className="text-4xl mb-4">{agent.icon}</div>
            <p className="text-sm font-medium text-gray-600 mb-2">Hello! I'm {agent.name}.</p>
            <p className="text-xs text-gray-400">Type a message below to see if my system instructions are working as expected.</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
            }`}>
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3.5 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <input 
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={`Talk to ${agent.name}...`}
            className="flex-1 px-5 py-4 rounded-2xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all pr-16"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-gray-200 transition-all shadow-md shadow-indigo-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
        <p className="text-[10px] text-center text-gray-400 mt-3 font-medium tracking-tight">
          Running on <span className="text-indigo-500">{agent.model}</span>
        </p>
      </footer>
    </div>
  );
};

export default ChatTester;
