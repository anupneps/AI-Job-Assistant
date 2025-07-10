'use client';

import { useState } from 'react';
import { Search, Filter, MapPin, Building, Clock, DollarSign, ExternalLink, X } from 'lucide-react';
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
    postedDate: '2 days ago'
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
    postedDate: '1 week ago'
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
    postedDate: '3 days ago'
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
    postedDate: '5 days ago'
  }
];

export default function DashboardPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredJobs = dummyJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (job: Job) => {
    // In a real app, you'd save the job context to localStorage or state management
    // For now, we'll just redirect with job info in URL params
    const jobData = encodeURIComponent(JSON.stringify(job));
    router.push(`/applications?job=${jobData}`);
  };

  return (
    <div className="flex-1 p-6 md:p-12 bg-transparent">
      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs, companies, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/30 dark:border-white/20 bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/30 dark:border-white/20 bg-white/50 dark:bg-slate-700/50 backdrop-blur-xl text-slate-800 dark:text-white hover:bg-white/70 dark:hover:bg-slate-700/70 transition-colors">
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-white/20 p-6 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-colors cursor-pointer"
            onClick={() => setSelectedJob(job)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                  {job.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1">
                    <Building size={16} />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} />
                    {job.salary}
                  </div>
                </div>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {job.postedDate}
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm line-clamp-2 mb-3">
              {job.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.requirements.slice(0, 3).map((req, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                >
                  {req}
                </span>
              ))}
              {job.requirements.length > 3 && (
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full">
                  +{job.requirements.length - 3} more
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApply(job);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
              >
                Apply Now
                <ExternalLink size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedJob(job);
                }}
                className="px-4 py-2 border border-white/30 dark:border-white/20 bg-white/30 dark:bg-slate-700/30 text-slate-700 dark:text-white rounded-xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Job Modal */}
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