'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Message } from '@/types';

const SUGGESTIONS = [
  'What do you offer?',
  'How much does it cost?',
  'How fast do you deliver?',
  'Book a free call',
];

const DEMO_RESPONSES: Record<string, string> = {
  price:    "Our plans start at $500/month for chess club content and $750/month for the Starter package. Growth at $1,500/mo is our most popular — 8 SEO posts, 24 captions, and a newsletter. Want to book a free call to find the right fit?",
  cost:     "Our plans start at $500/month for chess club content and $750/month for the Starter package. Growth at $1,500/mo is our most popular — 8 SEO posts, 24 captions, and a newsletter. Want to book a free call to find the right fit?",
  much:     "Our plans start at $500/month for chess club content and $750/month for the Starter package. Growth at $1,500/mo is our most popular — 8 SEO posts, 24 captions, and a newsletter. Want to book a free call to find the right fit?",
  fast:     "We deliver first drafts within 24-48 hours — compared to 1-2 weeks at traditional agencies. AI-powered workflow is what makes that possible.",
  deliver:  "We deliver first drafts within 24-48 hours — compared to 1-2 weeks at traditional agencies. AI-powered workflow is what makes that possible.",
  book:     "You can book a free 30-minute discovery call at your convenience — no pitch, just a clear plan. Email us at hello@getanchorstudio.com to get started.",
  call:     "You can book a free 30-minute discovery call at your convenience — no pitch, just a clear plan. Email us at hello@getanchorstudio.com to get started.",
  chess:    "Chess clubs are our best-fit niche — and for good reason. Anchor Studio was founded by Nivaan, a Chess National Master. We handle newsletters, tournament recaps, game annotations, and social posts, all integrated with chess-club-hub.",
  offer:    "We produce AI-powered blogs, social captions, email sequences, and chatbots for businesses. Our chess club content tier is unique — powered by a National Master founder. What type of business are you running?",
};

function getDemoResponse(text: string): string {
  const t = text.toLowerCase();
  for (const [key, response] of Object.entries(DEMO_RESPONSES)) {
    if (t.includes(key)) return response;
  }
  return "Great question! We use AI to produce professional content 3× faster and at a fraction of agency cost. What would you like to know more about — our services, pricing, or chess club content?";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => { if (!isOpen) setShowBadge(true); }, 2000);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Close chat on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(o => !o);
    setShowBadge(false);
    if (!isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    setShowSuggestions(false);
    setError(null);
    const userMsg: Message = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
        signal: AbortSignal.timeout(30000), // 30s timeout
      });
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const data = await res.json();
      if (data.error && !data.reply) {
        throw new Error(data.error);
      }
      const reply = data.reply ?? getDemoResponse(text);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Connection error';
      console.error('Chat error:', errorMsg);
      
      // Fallback to demo mode
      await new Promise(r => setTimeout(r, 800));
      setMessages(prev => [...prev, { role: 'assistant', content: getDemoResponse(text) }]);
      setError('Running in demo mode. For live support, email hello@getanchorstudio.com');
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      sendMessage(input); 
    }
  };

  return (
    <>
      {/* Chat window */}
      <div 
        ref={containerRef}
        className={`fixed bottom-24 right-7 w-[380px] max-h-[560px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
        role="dialog"
        aria-labelledby="chat-title"
        aria-modal="true"
      >

        {/* Header */}
        <div className="bg-slate px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center text-white text-xs font-semibold flex-shrink-0" aria-hidden="true">AS</div>
          <div className="flex-1">
            <div id="chat-title" className="font-serif text-white text-[0.9rem]">Anchor Studio AI</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-mid" style={{ animation: 'pulse 2s infinite' }} aria-hidden="true" />
              <span className="text-teal-mid text-[0.68rem]">Online — ask me anything</span>
            </div>
          </div>
          <button 
            onClick={toggleChat} 
            className="text-white/40 hover:text-white transition-colors p-1"
            aria-label="Close chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="px-3 py-2 bg-yellow-50 border-b border-yellow-200 text-yellow-800 text-[0.75rem] rounded flex items-start gap-2">
            <span aria-hidden="true">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Suggestions */}
        {showSuggestions && (
          <div className="px-3 pt-3 pb-2 flex flex-wrap gap-1.5 border-b border-rule flex-shrink-0">
            {SUGGESTIONS.map(s => (
              <button 
                key={s} 
                onClick={() => sendMessage(s)} 
                className="text-[0.73rem] px-2.5 py-1 rounded-full border border-teal-mid text-teal bg-teal-light hover:bg-teal hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
                aria-label={`Ask: ${s}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" role="log" aria-live="polite" aria-label="Chat messages">
          {messages.length === 0 && (
            <div className="flex gap-2 items-end">
              <div className="w-7 h-7 rounded-full bg-teal flex items-center justify-center text-white text-[0.6rem] font-semibold flex-shrink-0" aria-hidden="true">AS</div>
              <div className="bg-warm rounded-xl rounded-bl px-3 py-2 text-[0.875rem] text-ink leading-relaxed max-w-[78%]">
                Hi! I&apos;m the Anchor Studio AI. Ask me about our services, pricing, or chess club content.
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 items-end ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div 
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[0.6rem] font-semibold flex-shrink-0 ${m.role === 'user' ? 'bg-slate' : 'bg-teal'}`} 
                aria-hidden="true"
              >
                {m.role === 'user' ? 'You' : 'AS'}
              </div>
              <div className={`rounded-xl px-3 py-2 text-[0.875rem] leading-relaxed max-w-[78%] ${m.role === 'user' ? 'bg-slate text-white rounded-br' : 'bg-warm text-ink rounded-bl'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 items-end" role="status" aria-label="Loading response">
              <div className="w-7 h-7 rounded-full bg-teal flex items-center justify-center text-white text-[0.6rem] font-semibold flex-shrink-0" aria-hidden="true">AS</div>
              <div className="bg-warm rounded-xl rounded-bl px-4 py-3 flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-teal-mid typing-dot" style={{ animationDelay: `${i * 0.2}s` }} aria-hidden="true" />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-rule flex gap-2 items-end flex-shrink-0">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything about Anchor Studio…"
            rows={1}
            aria-label="Message input"
            className="flex-1 resize-none rounded-lg border border-rule bg-warm px-3 py-2 text-[0.875rem] text-ink outline-none focus:border-teal-mid focus:bg-white focus:ring-2 focus:ring-teal transition-colors min-h-[38px] max-h-24"
            style={{ lineHeight: '1.5' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="w-9 h-9 bg-teal rounded-lg flex items-center justify-center text-white hover:bg-teal-dark transition-colors disabled:bg-rule disabled:cursor-not-allowed flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-teal"
            aria-label="Send message"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/></svg>
          </button>
        </div>

        <div className="text-center py-1.5 text-[0.65rem] text-mid border-t border-rule">
          Powered by Claude · Anchor Studio © {new Date().getFullYear()}
        </div>
      </div>

      {/* Bubble trigger */}
      <button
        onClick={toggleChat}
        aria-label="Open Anchor Studio chat"
        className="fixed bottom-7 right-7 w-14 h-14 bg-teal rounded-full shadow-lg flex items-center justify-center hover:scale-105 hover:bg-teal-dark transition-all z-50 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
        {showBadge && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center border-2 border-white" aria-hidden="true">1</span>
        )}
      </button>
    </>
  );
}
