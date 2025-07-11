'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, MapPin, Building, Clock, DollarSign, ExternalLink, X, Heart, HeartOff, FileText, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
  compatibility: number; // 0-100
}

const dummyJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $150k',
    description: 'We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using modern technologies.',
    requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
    postedDate: '2024-06-01',
    compatibility: 0 // Will be set on client
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100k - $130k',
    description: 'Join our fast-growing startup as a Full Stack Engineer. You will work on both frontend and backend development, helping us scale our platform.',
    requirements: ['JavaScript', 'Python', 'AWS', '3+ years experience'],
    postedDate: '2024-05-29',
    compatibility: 0
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Design Studio Pro',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$80k - $100k',
    description: 'We are seeking a talented UI/UX Designer to create beautiful and intuitive user experiences for our clients.',
    requirements: ['Figma', 'Adobe Creative Suite', 'User Research', '2+ years experience'],
    postedDate: '2024-05-27',
    compatibility: 0
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'Cloud Solutions Ltd.',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$110k - $140k',
    description: 'Help us build and maintain our cloud infrastructure. You will be responsible for CI/CD pipelines, monitoring, and automation.',
    requirements: ['Docker', 'Kubernetes', 'AWS', '4+ years experience'],
    postedDate: '2024-05-25',
    compatibility: 0
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'Analytics Corp',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130k - $160k',
    description: 'Join our data science team to build machine learning models and drive insights from large datasets.',
    requirements: ['Python', 'TensorFlow', 'SQL', 'PhD or MS in Statistics'],
    postedDate: '2024-05-23',
    compatibility: 0
  },
  {
    id: '6',
    title: 'Mobile App Developer',
    company: 'AppWorks Inc.',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$90k - $120k',
    description: 'Develop cutting-edge mobile applications for iOS and Android platforms using React Native.',
    requirements: ['React Native', 'JavaScript', 'Mobile Development', '3+ years experience'],
    postedDate: '2024-05-21',
    compatibility: 0
  },
  {
    id: '7',
    title: 'Backend Developer',
    company: 'API Solutions',
    location: 'Remote',
    type: 'Full-time',
    salary: '$95k - $125k',
    description: 'Build scalable backend services and APIs using modern technologies and best practices.',
    requirements: ['Node.js', 'PostgreSQL', 'Redis', 'Microservices'],
    postedDate: '2024-05-19',
    compatibility: 0
  },
  {
    id: '8',
    title: 'Product Manager',
    company: 'Innovation Labs',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$140k - $180k',
    description: 'Lead product strategy and development for our next-generation software platform.',
    requirements: ['Product Strategy', 'Agile', 'User Research', '5+ years experience'],
    postedDate: '2024-05-17',
    compatibility: 0
  },
  {
    id: '9',
    title: 'Security Engineer',
    company: 'CyberSec Pro',
    location: 'Washington, DC',
    type: 'Full-time',
    salary: '$120k - $150k',
    description: 'Protect our systems and data from cyber threats through advanced security measures.',
    requirements: ['Cybersecurity', 'Penetration Testing', 'SIEM', 'Security Certifications'],
    postedDate: '2024-05-15',
    compatibility: 0
  },
  {
    id: '10',
    title: 'QA Engineer',
    company: 'Quality First',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$85k - $110k',
    description: 'Ensure software quality through comprehensive testing and automation strategies.',
    requirements: ['Selenium', 'Jest', 'API Testing', 'Test Automation'],
    postedDate: '2024-05-13',
    compatibility: 0
  },
  {
    id: '11',
    title: 'Machine Learning Engineer',
    company: 'AI Innovations',
    location: 'San Jose, CA',
    type: 'Full-time',
    salary: '$140k - $170k',
    description: 'Build and deploy machine learning models for real-world applications.',
    requirements: ['TensorFlow', 'PyTorch', 'MLOps', 'Deep Learning'],
    postedDate: '2024-05-11',
    compatibility: 0
  },
  {
    id: '12',
    title: 'Cloud Architect',
    company: 'CloudScale',
    location: 'Denver, CO',
    type: 'Full-time',
    salary: '$150k - $190k',
    description: 'Design and implement scalable cloud infrastructure solutions for enterprise clients.',
    requirements: ['AWS', 'Azure', 'Terraform', 'Architecture Design'],
    postedDate: '2024-05-09',
    compatibility: 0
  }
];

// Dummy applications history for stats
const dummyApplications = [
  { id: '1', status: 'Pending' },
  { id: '2', status: 'Technical Assessment' },
  { id: '3', status: 'Pending' },
  { id: '4', status: 'Interview' }
];

export default function DashboardPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [tab, setTab] = useState<'all' | 'saved'>('all');
  const [jobs, setJobs] = useState<Job[]>(dummyJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(8); // Show 8 jobs per page
  const router = useRouter();

  // Initialize compatibility scores on client side
  useEffect(() => {
    const jobsWithCompatibility = dummyJobs.map(job => ({
      ...job,
      compatibility: Math.floor(Math.random() * 41) + 60 // 60-100
    }));
    setJobs(jobsWithCompatibility);
  }, []);

  // Stats
  const totalApplied = dummyApplications.length;
  const totalPending = dummyApplications.filter(a => a.status === 'Pending').length;
  const highlyCompatible = useMemo(() => {
    // Only jobs posted in last 7 days and compatibility >= 80
    const now = new Date();
    return jobs.filter(job => {
      const posted = new Date(job.postedDate);
      const daysAgo = (now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24);
      return daysAgo <= 7 && job.compatibility >= 80;
    }).length;
  }, [jobs]);

  // Filtered jobs
  const filteredJobs = jobs.filter(job =>
    (tab === 'all' || savedJobs.includes(job.id)) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination calculations
  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  // Reset to first page when search or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, tab]);

  const handleApply = (job: Job) => {
    const jobData = encodeURIComponent(JSON.stringify(job));
    router.push(`/applications?job=${jobData}`);
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of job listings
    const jobListingsContainer = document.querySelector('.job-listings-container');
    if (jobListingsContainer) {
      jobListingsContainer.scrollTop = 0;
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 p-4 md:p-2">
        {/* Stats Row - Glassmorphic, modern, neutral */}
        <div className="w-full flex flex-wrap gap-4 items-center justify-center mb-6 mt-2">
          {/* Applied */}
          <div className="relative flex flex-col items-center w-[120px] h-[100px] bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-lg p-3 shadow-lg border-l-4 border-blue-400 group overflow-hidden">
            <FileText size={32} className="absolute top-1.5 right-1.5 text-blue-400/60 dark:text-blue-300/60 drop-shadow-md" />
            <div className="w-10 h-10 flex flex-col items-center justify-center rounded-full shadow bg-white/80 dark:bg-white/10 text-blue-900 dark:text-white/90 border border-blue-100/40 mb-1">
              <span className="text-lg font-extrabold text-blue-800 dark:text-white drop-shadow-lg">{totalApplied}</span>
            </div>
            <div className="text-xs font-bold text-blue-900 dark:text-blue-200 text-center opacity-90 tracking-wide">Applied</div>
          </div>
          {/* Pending */}
          <div className="relative flex flex-col items-center w-[120px] h-[100px] bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-lg p-3 shadow-lg border-l-4 border-amber-400 group overflow-hidden">
            <Clock size={32} className="absolute top-1.5 right-1.5 text-amber-500/60 dark:text-amber-300/60 drop-shadow-md" />
            <div className="w-10 h-10 flex flex-col items-center justify-center rounded-full shadow bg-white/80 dark:bg-white/10 text-yellow-900 dark:text-yellow-100 border border-yellow-100/40 mb-1">
              <span className="text-lg font-extrabold text-yellow-800 dark:text-yellow-100 drop-shadow-lg">{totalPending}</span>
            </div>
            <div className="text-xs font-bold text-yellow-900 dark:text-yellow-200 text-center opacity-90 tracking-wide">Pending</div>
          </div>
          {/* Highly Compatible */}
          <div className="relative flex flex-col items-center w-[120px] h-[100px] bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-lg p-3 shadow-lg border-l-4 border-emerald-400 group overflow-hidden animate-pulse-slow">
            <Star size={32} className="absolute top-1.5 right-1.5 text-emerald-500/60 dark:text-emerald-300/60 drop-shadow-md" />
            <div className="w-10 h-10 flex flex-col items-center justify-center rounded-full shadow bg-white/80 dark:bg-white/10 text-emerald-900 dark:text-emerald-100 border border-emerald-100/40 mb-1">
              <span className="text-lg font-extrabold text-emerald-800 dark:text-emerald-100 drop-shadow-lg">{highlyCompatible}</span>
            </div>
            <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200 text-center opacity-90 tracking-wide">Highly Compatible</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            className={`px-3 py-1.5 rounded-md font-medium text-sm shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-3 border-blue-400 text-blue-900 dark:text-blue-200 transition-colors ${tab === 'all' ? 'ring-1 ring-blue-300' : 'hover:ring-1 hover:ring-blue-200'}`}
            onClick={() => setTab('all')}
          >
            All Jobs
          </button>
          <button
            className={`px-3 py-1.5 rounded-md font-medium text-sm shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-3 border-emerald-400 text-emerald-900 dark:text-emerald-200 transition-colors ${tab === 'saved' ? 'ring-1 ring-emerald-300' : 'hover:ring-1 hover:ring-emerald-200'}`}
            onClick={() => setTab('saved')}
          >
            Saved Jobs
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-4">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search jobs, companies, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-white/30 dark:border-white/20 bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-transparent text-sm"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-md shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-3 border-indigo-400 text-indigo-900 dark:text-indigo-200 hover:ring-1 hover:ring-indigo-200 transition-colors text-sm font-medium">
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Job Listings Section */}
      <div className="flex-1 overflow-y-auto px-4 md:px-2 pb-4 job-listings-container">
        <div className="space-y-2">
          {paginatedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-lg border border-white/30 dark:border-white/20 p-3 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              {/* Header with title, compatibility, and save button */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-white truncate">
                      {job.title}
                    </h3>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${job.compatibility >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>
                      {job.compatibility}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 mb-1.5 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Building size={12} />
                      <span className="truncate">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={12} />
                      {job.salary}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {job.postedDate}
                  </span>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleSaveJob(job.id);
                    }}
                    className={`p-1 rounded shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-2 ${savedJobs.includes(job.id) ? 'border-emerald-400' : 'border-blue-400'} text-blue-500 hover:ring-1 hover:ring-blue-200 transition-colors`}
                    aria-label={savedJobs.includes(job.id) ? 'Unsave job' : 'Save job'}
                  >
                    {savedJobs.includes(job.id) ? <HeartOff size={12} /> : <Heart size={12} />}
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-700 dark:text-slate-300 text-xs line-clamp-2 mb-2 leading-relaxed">
                {job.description}
              </p>

              {/* Requirements - ultra compact */}
              <div className="flex flex-wrap gap-1 mb-2">
                {job.requirements.slice(0, 2).map((req, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded"
                  >
                    {req}
                  </span>
                ))}
                {job.requirements.length > 2 && (
                  <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                    +{job.requirements.length - 2}
                  </span>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(job);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-3 border-blue-400 text-blue-900 dark:text-blue-200 font-medium text-xs hover:ring-1 hover:ring-blue-200 transition-colors"
                >
                  Apply
                  <ExternalLink size={11} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedJob(job);
                  }}
                  className="px-2.5 py-1 rounded shadow bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-l-3 border-indigo-400 text-indigo-900 dark:text-indigo-200 font-medium text-xs hover:ring-1 hover:ring-indigo-200 transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-2">
              No jobs found
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col items-center gap-3">
            {/* Job Count */}
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Showing {startIndex + 1}-{Math.min(endIndex, totalJobs)} of {totalJobs} jobs
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

      {/* Job Modal (unchanged) */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                    {selectedJob.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1">
                      <Building size={16} />
                      {selectedJob.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {selectedJob.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {selectedJob.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={16} />
                      {selectedJob.salary}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-600 dark:text-slate-300" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                    Job Description
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedJob.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-slate-700 dark:text-slate-300">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      handleApply(selectedJob);
                      setSelectedJob(null);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
                  >
                    Apply Now
                    <ExternalLink size={16} />
                  </button>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-6 py-3 border border-white/30 dark:border-white/20 bg-white/30 dark:bg-slate-700/30 text-slate-700 dark:text-white rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 