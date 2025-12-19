
import React, { useState, useRef, useEffect } from 'react';
import { askSCMAssistant } from '../services/geminiService.ts';
import { INITIAL_INVENTORY, MOCK_ACTIVITY } from '../constants.ts';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    
    const userMsg = prompt;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setPrompt('');
    setLoading(true);

    const context = {
      inventory: INITIAL_INVENTORY,
      recentActivity: MOCK_ACTIVITY
    };

    const aiResponse = await askSCMAssistant(userMsg, context);
    setMessages(prev => [...prev, { role: 'assistant', text: aiResponse || 'No response' }]);
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 size-14 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <span className="material-symbols-outlined text-3xl">psychology</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setIsOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b flex items-center justify-between bg-primary text-white">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined">smart_toy</span>
                <h3 className="font-bold">Gemini Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="size-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-3xl">chat</span>
                  </div>
                  <p className="text-slate-500 text-sm">Ask me about inventory levels, security alerts, or logistics status.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <div className="size-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="size-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="size-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input 
                  className="flex-1 border-slate-200 rounded-lg text-sm focus:ring-primary focus:border-primary"
                  placeholder="Type a message..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  disabled={loading}
                  className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
