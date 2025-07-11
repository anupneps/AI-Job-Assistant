'use client';

import { useState, useEffect } from 'react';
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
  },
  {
    id: '5',
    jobTitle: 'Data Scientist',
    company: 'Analytics Corp',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130k - $160k',
    status: 'Initial Call',
    lastMessage: 'Great! Let\'s schedule your initial call with the team...',
    lastMessageTime: '2 days ago',
    chatDate: '2024-01-08',
    messageCount: 5
  },
  {
    id: '6',
    jobTitle: 'Mobile App Developer',
    company: 'AppWorks Inc.',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$90k - $120k',
    status: 'Selected',
    lastMessage: 'Congratulations! You\'ve been selected for the position...',
    lastMessageTime: '1 week ago',
    chatDate: '2024-01-03',
    messageCount: 20
  },
  {
    id: '7',
    jobTitle: 'Backend Developer',
    company: 'API Solutions',
    location: 'Remote',
    type: 'Full-time',
    salary: '$95k - $125k',
    status: 'Rejected',
    lastMessage: 'Thank you for your interest, but we\'ve decided to move forward...',
    lastMessageTime: '3 days ago',
    chatDate: '2024-01-07',
    messageCount: 10
  },
  {
    id: '8',
    jobTitle: 'Product Manager',
    company: 'Innovation Labs',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$140k - $180k',
    status: 'Interview',
    lastMessage: 'Your interview is scheduled for next Tuesday at 2 PM...',
    lastMessageTime: '5 days ago',
    chatDate: '2024-01-06',
    messageCount: 18
  },
  {
    id: '9',
    jobTitle: 'Security Engineer',
    company: 'CyberSec Pro',
    location: 'Washington, DC',
    type: 'Full-time',
    salary: '$120k - $150k',
    status: 'Pending',
    lastMessage: 'I\'ll help you prepare for the security assessment...',
    lastMessageTime: '4 days ago',
    chatDate: '2024-01-09',
    messageCount: 7
  },
  {
    id: '10',
    jobTitle: 'QA Engineer',
    company: 'Quality First',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$85k - $110k',
    status: 'Technical Assessment',
    lastMessage: 'Here are some practice questions for your technical round...',
    lastMessageTime: '6 days ago',
    chatDate: '2024-01-04',
    messageCount: 14
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
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(6); // Show 6 applications per page
  const router = useRouter();

  const filteredApplications = applications.filter(app =>
    (app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || app.status === statusFilter)
  );

  // Pagination calculations
  const totalApplications = filteredApplications.length;
  const totalPages = Math.ceil(totalApplications / applicationsPerPage);
  const startIndex = (currentPage - 1) * applicationsPerPage;
  const endIndex = startIndex + applicationsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleStatusUpdate = (id: string, newStatus: Application['status']) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  // Accept agentKey: 'interview', 'skill', or undefined for default
  const handleOpenChat = (application: Application, agentKey?: string) => {
    // In a real app, you'd navigate to the chat with the application context
    let url = `/applications?applicationId=${application.id}`;
    if (agentKey) {
      url += `&agent=${agentKey}`;
    }
    router.push(url);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of applications list
    const applicationsContainer = document.querySelector('.applications-container');
    if (applicationsContainer) {
      applicationsContainer.scrollTop = 0;
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 p-4 md:p-2">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Applications</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Track your job applications and AI-assisted conversations
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-4">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-white/30 dark:border-white/20 bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-transparent text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-white/30 dark:border-white/20 bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-transparent text-sm"
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
      </div>

      {/* Scrollable Applications List Section */}
      <div className="flex-1 overflow-y-auto px-4 md:px-2 pb-4 applications-container">
        <div className="space-y-2">
          {paginatedApplications.map((application) => (
            <div
              key={application.id}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-lg border border-white/30 dark:border-white/20 p-3 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-colors"
            >
              {/* Header with title, status, and more button */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-white truncate">
                      {application.jobTitle}
                    </h3>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${statusColors[application.status]}`}>
                      {application.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 mb-1.5 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Building size={12} />
                      <span className="truncate">{application.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span className="truncate">{application.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {application.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={12} />
                      {application.salary}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {application.lastMessageTime}
                  </span>
                  <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors">
                    <MoreVertical size={12} className="text-slate-600 dark:text-slate-300" />
                  </button>
                </div>
              </div>

              {/* Message info */}
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 mb-2">
                <div className="flex items-center gap-1">
                  <MessageSquare size={12} />
                  {application.messageCount} messages
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  {application.chatDate}
                </div>
              </div>

              {/* Last message */}
              <p className="text-slate-700 dark:text-slate-300 text-xs line-clamp-1 mb-2 leading-relaxed">
                {application.lastMessage}
              </p>

              {/* Action buttons */}
              <div className="flex gap-1.5 flex-wrap">
                <button
                  onClick={() => handleOpenChat(application)}
                  className="px-2.5 py-1 rounded shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-3 border-blue-400 text-blue-900 dark:text-blue-200 font-medium text-xs hover:ring-1 hover:ring-blue-200 transition-colors"
                >
                  Open Chat
                </button>
                <button
                  onClick={() => handleOpenChat(application, 'interview')}
                  className="px-2.5 py-1 rounded shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-3 border-green-400 text-green-900 dark:text-green-200 font-medium text-xs hover:ring-1 hover:ring-green-200 transition-colors"
                >
                  Interview Prep
                </button>
                <button
                  onClick={() => handleOpenChat(application, 'skill')}
                  className="px-2.5 py-1 rounded shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-3 border-purple-400 text-purple-900 dark:text-purple-200 font-medium text-xs hover:ring-1 hover:ring-purple-200 transition-colors"
                >
                  Skill Enhancement
                </button>
                <select
                  value={application.status}
                  onChange={(e) => handleStatusUpdate(application.id, e.target.value as Application['status'])}
                  className="px-2.5 py-1 rounded shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-3 border-slate-400 text-slate-700 dark:text-white font-medium text-xs hover:ring-1 hover:ring-slate-200 transition-colors"
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col items-center gap-3">
            {/* Application Count */}
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Showing {startIndex + 1}-{Math.min(endIndex, totalApplications)} of {totalApplications} applications
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-1">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-2 py-1 rounded font-medium text-xs shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-2 transition-colors ${
                  currentPage === 1
                    ? 'border-slate-300 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    : 'border-blue-400 text-blue-900 dark:text-blue-200 hover:ring-1 hover:ring-blue-200'
                }`}
              >
                Prev
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-7 h-7 rounded font-medium text-xs shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-2 transition-colors ${
                        currentPage === pageNum
                          ? 'border-blue-400 text-blue-900 dark:text-blue-200 ring-1 ring-blue-300'
                          : 'border-slate-400 text-slate-700 dark:text-slate-300 hover:border-blue-400 hover:text-blue-900 dark:hover:text-blue-200 hover:ring-1 hover:ring-blue-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 rounded font-medium text-xs shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-2 transition-colors ${
                  currentPage === totalPages
                    ? 'border-slate-300 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    : 'border-blue-400 text-blue-900 dark:text-blue-200 hover:ring-1 hover:ring-blue-200'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 