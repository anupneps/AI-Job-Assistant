'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Building, MapPin, Clock, DollarSign, MessageSquare, Calendar, MoreVertical } from 'lucide-react';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  status: 'Pending' | 'Initial Call' | 'Technical Assessment' | 'Interview' | 'Ghosting' | 'Selected' | 'Rejected';
  lastMessage: string;
  lastMessageTime: string;
  chatDate: string;
  messageCount: number;
}

const dummyApplications: Application[] = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $150k',
    status: 'Pending',
    lastMessage: 'I can help you tailor your CV for this React-focused role...',
    lastMessageTime: '2 hours ago',
    chatDate: '2024-01-15',
    messageCount: 8
  },
  {
    id: '2',
    jobTitle: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100k - $130k',
    status: 'Technical Assessment',
    lastMessage: 'Your cover letter looks great! Here are some final tips...',
    lastMessageTime: '1 day ago',
    chatDate: '2024-01-12',
    messageCount: 12
  },
  {
    id: '3',
    jobTitle: 'UI/UX Designer',
    company: 'Design Studio Pro',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$80k - $100k',
    status: 'Interview',
    lastMessage: 'Let\'s prepare for your portfolio presentation...',
    lastMessageTime: '3 days ago',
    chatDate: '2024-01-10',
    messageCount: 15
  },
  {
    id: '4',
    jobTitle: 'DevOps Engineer',
    company: 'Cloud Solutions Ltd.',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110k - $140k',
    status: 'Ghosting',
    lastMessage: 'I haven\'t heard back from them yet. Let\'s follow up...',
    lastMessageTime: '1 week ago',
    chatDate: '2024-01-05',
    messageCount: 6
  }
];

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'Initial Call': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Technical Assessment': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'Interview': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  'Ghosting': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
  'Selected': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
};

export default function ApplicationsListPage() {
  const [applications, setApplications] = useState<Application[]>(dummyApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const router = useRouter();

  const filteredApplications = applications.filter(app =>
    (app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || app.status === statusFilter)
  );

  const handleStatusUpdate = (id: string, newStatus: Application['status']) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const handleOpenChat = (application: Application) => {
    // In a real app, you'd navigate to the chat with the application context
    router.push(`/applications?applicationId=${application.id}`);
  };

  return (
    <div className="flex-1 p-6 md:p-12 bg-transparent">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Applications</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Track your job applications and AI-assisted conversations
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/30 dark:border-white/20 bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-white/30 dark:border-white/20 bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Initial Call">Initial Call</option>
            <option value="Technical Assessment">Technical Assessment</option>
            <option value="Interview">Interview</option>
            <option value="Ghosting">Ghosting</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div
            key={application.id}
            className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-white/20 p-6 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                      {application.jobTitle}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1">
                        <Building size={16} />
                        {application.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {application.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {application.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign size={16} />
                        {application.salary}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
                      {application.status}
                    </span>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <MoreVertical size={16} className="text-slate-600 dark:text-slate-300" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1">
                      <MessageSquare size={16} />
                      {application.messageCount} messages
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {application.chatDate}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {application.lastMessageTime}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-slate-700 dark:text-slate-300 text-sm line-clamp-1 flex-1 mr-4">
                {application.lastMessage}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenChat(application)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors text-sm"
                >
                  Open Chat
                </button>
                <select
                  value={application.status}
                  onChange={(e) => handleStatusUpdate(application.id, e.target.value as Application['status'])}
                  className="px-3 py-2 border border-white/30 dark:border-white/20 bg-white/30 dark:bg-slate-700/30 text-slate-700 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="Pending">Pending</option>
                  <option value="Initial Call">Initial Call</option>
                  <option value="Technical Assessment">Technical Assessment</option>
                  <option value="Interview">Interview</option>
                  <option value="Ghosting">Ghosting</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare size={48} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-2">
            No applications found
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Start applying to jobs from the dashboard to see your applications here.
          </p>
        </div>
      )}
    </div>
  );
} 