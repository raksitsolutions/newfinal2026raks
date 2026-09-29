
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface AIConsultantProps {
  onClose: () => void;
}

const AIConsultant: React.FC<AIConsultantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Namaste! I'm your RAKS IT SOLUTIONS AI Consultant. I specialize in helping businesses in Telangana with digital transformation. How can I help your business grow today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `
            You are a professional AI consultant for 'RAKS IT SOLUTIONS', the top software and digital marketing agency in Warangal, Hanamkonda, and Hyderabad, Telangana.
            
            Key areas of expertise:
            1. SEO (Local & Enterprise)
            2. SMO/SMM (Social Media Growth)
            3. PPC/Google Ads (ROI-focused)
            4. Web & App Development (MERN, Python, Flutter)
            5. Branding & Logo Design (Mention our Free AI Logo Generator tool)
            
            Your mission:
            - Provide expert, concise advice.
            - Focus on driving ROI for Telangana businesses.
            - If a user expresses deep interest or asks for pricing, encourage them to use our WhatsApp contact (+91 90105 91950) or the Contact Us form for a personalized quote.
            - Always be polite, encouraging, and tech-savvy.
            - Refer to our local hubs in Warangal, Hanamkonda, and Hyderabad.
          `
        }
      });

      const aiResponse = response.text || "I apologize, I'm having trouble processing that right now. Please try again soon.";
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I encountered an error. Please try again later or contact our team directly at +91 90105 91950." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-brand-ash/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="p-6 bg-brand-blue text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-none mb-1 text-white">RAKS IT AI Hub</h3>
              <p className="text-xs text-brand-white/60 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online Consultant
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-brand-ash/5">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3 items-end`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-brand-ash/10 shadow-sm' : 'bg-brand-blue text-white shadow-md'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-brand-blue text-white rounded-br-none' 
                    : 'bg-white border border-brand-ash/10 text-brand-ash rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[85%] flex-row gap-3 items-end">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-blue text-white shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-brand-ash/10 text-brand-ash/40 rounded-bl-none flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-blue" /> Thinking...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-brand-ash/10">
          <div className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about SEO, Web Dev, or Logo Design..."
              className="w-full bg-brand-ash/5 border-none rounded-2xl pl-5 pr-14 py-4 focus:ring-2 focus:ring-brand-blue transition-all text-sm outline-none shadow-inner"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-3 bg-brand-blue text-white rounded-xl hover:bg-brand-blue/80 disabled:opacity-50 transition-all shadow-md active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] text-center text-brand-ash/40 mt-2 italic">
            RAKS IT SOLUTIONS AI Hub v1.1 • Warangal, Telangana
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
