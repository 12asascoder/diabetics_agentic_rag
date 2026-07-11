'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowLeft, Send, Bot, User, BookOpen } from 'lucide-react';
import DOMPurify from 'dompurify';

interface Citation {
  document: string;
  section: string;
  page: number;
}

interface Message {
  role: string;
  content: string;
  citations: Citation[];
}

export default function AIResearchAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello, researcher. I am ready to query your knowledge base. Ask me to summarize guidelines, compare studies, or find evidence.',
      citations: []
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input, citations: [] };
    setMessages(prev => [...prev, userMessage]);
    
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Based on the provided documents, GLP-1 agonists show a statistically significant reduction in cardiovascular events in patients with Type 2 Diabetes.',
        citations: [
          { document: 'UKPDS 33 Long-term Follow-up', section: 'Results', page: 12 }
        ]
      }]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#1a1a1e] text-slate-900 dark:text-slate-100 p-8 font-sans flex flex-col">
      <header className="mb-8 flex items-center gap-4 shrink-0">
        <Link href="/" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Research Assistant</h1>
          <p className="text-slate-500 dark:text-slate-400">Agentic Retrieval-Augmented Generation</p>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto flex flex-col bg-white dark:bg-[#232328] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-800/50 rounded-tl-none'}`}>
                <div 
                  className="prose dark:prose-invert max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: typeof window !== 'undefined' ? DOMPurify.sanitize(msg.content) : msg.content }}
                />
                
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> Sources
                    </p>
                    <div className="space-y-1">
                      {msg.citations.map((cite: any, i: number) => (
                        <div key={i} className="text-xs bg-white dark:bg-[#1a1a1e] p-2 rounded border border-slate-200 dark:border-slate-700">
                          <span className="font-medium">{cite.document}</span>
                          <span className="text-slate-500 mx-2">•</span>
                          <span className="text-slate-500">{cite.section} (Page {cite.page})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-white dark:bg-[#232328] border-t border-slate-200 dark:border-slate-800">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about guidelines, treatments, or evidence..."
              className="w-full bg-slate-50 dark:bg-[#1a1a1e] border border-slate-200 dark:border-slate-800 rounded-full pl-6 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
