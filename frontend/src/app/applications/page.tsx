'use client';

import { useState, useEffect, useRef } from 'react';
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

const AGENTS = [
  { key: 'cv', label: 'CV Optimization' },
  { key: 'cover', label: 'Cover Letter' },
  { key: 'interview', label: 'Interview Prep' },
  { key: 'skill', label: 'Skill Enhancement' },
  { key: 'strategy', label: 'Application Strategy' },
];

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
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0].key);
  const searchParams = useSearchParams();
  const welcomeMessageAdded = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // On mount, check for agent in query params
  useEffect(() => {
    const agentParam = searchParams.get('agent');
    if (agentParam && AGENTS.some(a => a.key === agentParam)) {
      setSelectedAgent(agentParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const jobParam = searchParams.get('job');
    if (jobParam && !welcomeMessageAdded.current) {
      try {
        const job = JSON.parse(decodeURIComponent(jobParam));
        setJobContext(job);
        
        // Add a welcome message with job context
        const welcomeMessage: Message = {
          id: `welcome-${Date.now()}`,
          content: `I see you're applying for the ${job.title} position at ${job.company}. This looks like a great opportunity! I can help you tailor your application for this specific role. What would you like to focus on first?`,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, welcomeMessage]);
        welcomeMessageAdded.current = true;
      } catch (error) {
        console.error('Error parsing job data:', error);
      }
    }
  }, [searchParams]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        content: `(${AGENTS.find(a => a.key === selectedAgent)?.label} Agent): I understand you're working on your application. Let me help you with that. Could you share more details about the specific job or what you'd like to focus on?`,
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
    <div className="h-full flex flex-col bg-transparent">
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 p-4 md:p-2">
        {/* Header */}
        <div className="mb-3">
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Job Application Assistant</h1>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            AI-powered help for your job applications
          </p>
        </div>
        
        {/* Job Context - Compact */}
        {jobContext && (
          <div className="mb-3 p-3 bg-blue-50/80 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">
              {jobContext.title}
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-blue-700 dark:text-blue-300">
              <div className="flex items-center gap-1">
                <Building size={12} />
                {jobContext.company}
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                {jobContext.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                {jobContext.type}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign size={12} />
                {jobContext.salary}
              </div>
            </div>
          </div>
        )}

        {/* Agent Selection - Compact */}
        <div className="flex items-center gap-2 p-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-lg border border-white/30 dark:border-white/20 shadow-sm">
          <label htmlFor="agent-select" className="text-xs font-medium text-slate-700 dark:text-slate-200">AI Agent:</label>
          <select
            id="agent-select"
            value={selectedAgent}
            onChange={e => setSelectedAgent(e.target.value)}
            className="flex-1 rounded px-2 py-1 bg-white/80 dark:bg-slate-700/80 border border-white/30 dark:border-white/20 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-xs"
          >
            {AGENTS.map(agent => (
              <option key={agent.key} value={agent.key}>{agent.label}</option>
            ))}
          </select>
          <span className="text-xs text-slate-500 dark:text-slate-400">Switch anytime</span>
        </div>
      </div>

      {/* Scrollable Chat Container */}
      <div className="flex-1 overflow-y-auto px-4 md:px-2 pb-4">
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-lg border border-white/30 dark:border-white/20 h-full flex flex-col shadow-lg">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-indigo-500 text-white'
                  }`}>
                    {message.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className={`rounded-lg px-3 py-2 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/70 dark:bg-slate-700/70 text-slate-800 dark:text-white'
                  }`}>
                    <p className="text-xs leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 ${
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
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-white/30 dark:border-white/20 bg-white/30 dark:bg-slate-700/30 rounded-b-lg">
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 rounded-lg border border-white/30 dark:border-white/20 bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-transparent text-sm resize-none"
                  rows={1}
                  style={{ minHeight: '40px', maxHeight: '120px' }}
                />
                <button className="absolute right-2 bottom-2 p-1 hover:bg-slate-100 dark:hover:bg-slate-600 rounded transition-colors">
                  <Paperclip size={14} className="text-slate-500 dark:text-slate-400" />
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="px-3 py-2 rounded-lg shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-3 border-blue-400 text-blue-900 dark:text-blue-200 font-medium text-sm hover:ring-1 hover:ring-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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