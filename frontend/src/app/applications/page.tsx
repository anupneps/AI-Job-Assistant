'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, Paperclip, User, Bot, Building, MapPin, Clock, DollarSign } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

export default function ApplicationsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm here to help you with your job application. I can help you format your CV, write cover letters, analyze job requirements, and provide application tips. What would you like to work on?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [jobContext, setJobContext] = useState<Job | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const jobParam = searchParams.get('job');
    if (jobParam) {
      try {
        const job = JSON.parse(decodeURIComponent(jobParam));
        setJobContext(job);
        
        // Add a welcome message with job context
        const welcomeMessage: Message = {
          id: '2',
          content: `I see you're applying for the ${job.title} position at ${job.company}. This looks like a great opportunity! I can help you tailor your application for this specific role. What would you like to focus on first?`,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, welcomeMessage]);
      } catch (error) {
        console.error('Error parsing job data:', error);
      }
    }
  }, [searchParams]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you're working on your application. Let me help you with that. Could you share more details about the specific job or what you'd like to focus on?",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-b border-white/30 dark:border-white/20 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Job Application Assistant</h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
            AI-powered help for your job applications
          </p>
          
          {/* Job Context */}
          {jobContext && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                {jobContext.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-sm text-blue-700 dark:text-blue-300">
                <div className="flex items-center gap-1">
                  <Building size={14} />
                  {jobContext.company}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  {jobContext.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {jobContext.type}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign size={14} />
                  {jobContext.salary}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4">
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-white/20 h-full flex flex-col shadow-xl">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-indigo-500 text-white'
                  }`}>
                    {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/70 dark:bg-slate-700/70 text-slate-800 dark:text-white'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' 
                        ? 'text-blue-100' 
                        : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-white/30 dark:border-white/20 p-4">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about CV formatting, cover letters, job requirements analysis..."
                  className="w-full resize-none rounded-xl border border-white/30 dark:border-white/20 bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl p-3 pr-12 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                  rows={1}
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                />
                <button className="absolute right-2 bottom-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <Paperclip size={16} />
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors flex items-center justify-center"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 