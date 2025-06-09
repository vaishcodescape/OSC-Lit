"use client"
import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiStar, FiGitBranch, FiEye, FiGitCommit, FiAlertCircle, FiGitPullRequest, FiChevronDown, FiAward, FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
  pull_requests_count?: number;
  commit_count?: number;
  is_gsoc_org: boolean;
  gsoc_org_details?: GSOCOrganization;
  updated_at: string;
}

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ElementType;
}

interface DropdownGroup {
  label: string;
  options: DropdownOption[];
}

interface CustomDropdownProps {
  options: DropdownGroup[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

interface GSOCOrganization {
  name: string;
  githubOrg?: string;
  description: string;
  technologies: string[];
  website: string;
}

interface RateLimitInfo {
  remaining: number;
  reset: number;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.flatMap(group => group.options).find(opt => opt.value === value);

  return (
    <div className={`relative isolate ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-4 bg-black/50 text-gray-400 
                 border border-[#2563eb]/40 rounded-xl hover:border-[#00f0ff]/40 transition-all duration-200"
      >
        <div className="flex items-center gap-2 min-w-0">
          {selectedOption?.icon && <selectedOption.icon className="text-xl flex-shrink-0" />}
          <span className="truncate">{selectedOption?.label || placeholder}</span>
        </div>
        <FiChevronDown className={`text-xl transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)} />
          <div className="absolute z-[101] w-full mt-2 bg-[#0a0a0a] border border-[#2563eb]/40 rounded-xl shadow-xl 
                        max-h-[300px] overflow-y-auto custom-scrollbar">
            {options.map((group, index) => (
              <div key={index}>
                {group.label && (
                  <div className="px-4 py-2 text-sm font-medium text-[#00f0ff] bg-black/50 sticky top-0">
                    {group.label}
                  </div>
                )}
                {group.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-3 text-left transition-colors
                              ${value === option.value 
                                ? 'bg-[#00f0ff]/20 text-[#00f0ff]' 
                                : 'text-gray-400 hover:bg-[#00f0ff]/10 hover:text-[#00f0ff]'}`}
                  >
                    {option.icon && <option.icon className="text-xl flex-shrink-0" />}
                    <span className="truncate">{option.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function Explore(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [sortBy, setSortBy] = useState('stars-desc');
  const [showGSOCOnly, setShowGSOCOnly] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gsocOrgs, setGSOCOrgs] = useState<GSOCOrganization[]>([]);
  const [isLoadingGSOC, setIsLoadingGSOC] = useState(false);

  const popularLanguages: string[] = ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust'];
  const webLanguages: string[] = ['HTML', 'CSS', 'Vue', 'React', 'Angular', 'Svelte'];
  const mobileLanguages: string[] = ['Swift', 'Kotlin', 'Dart', 'React Native'];
  const systemsLanguages: string[] = ['C++', 'Rust', 'Go', 'Assembly'];
  const scriptingLanguages: string[] = ['Python', 'Ruby', 'PHP', 'Perl', 'Shell', 'PowerShell'];
  const functionalLanguages: string[] = ['Haskell', 'Scala', 'Clojure', 'Elixir'];
  const otherLanguages: string[] = ['R', 'MATLAB', 'Groovy', 'Lua', 'Objective-C'];

  const developmentTopics: string[] = [
    'web-development',
    'mobile-development',
    'desktop-development',
    'game-development',
    'devops',
    'cloud-computing'
  ];
  const frontendTopics: string[] = [
    'react',
    'vue',
    'angular',
    'svelte',
    'next.js',
    'ui-design',
    'ux-design'
  ];
  const backendTopics: string[] = [
    'node.js',
    'express',
    'django',
    'flask',
    'spring',
    'laravel',
    'rails',
    'graphql',
    'rest'
  ];
  const dataAITopics: string[] = [
    'machine-learning',
    'artificial-intelligence',
    'data-science',
    'computer-vision',
    'natural-language-processing',
    'data-structures',
    'algorithms'
  ];
  const infrastructureTopics: string[] = [
    'docker',
    'kubernetes',
    'aws',
    'azure',
    'gcp',
    'linux',
    'networking',
    'system-design'
  ];
  const securityTopics: string[] = [
    'cybersecurity',
    'blockchain',
    'cryptocurrency',
    'security',
    'privacy'
  ];
  const bestPracticesTopics: string[] = [
    'testing',
    'ci-cd',
    'agile',
    'design-patterns',
    'documentation',
    'performance',
    'accessibility'
  ];

  const languageGroups: DropdownGroup[] = [
    {
      label: 'Popular',
      options: [
        { value: 'all', label: 'All Languages' },
        ...popularLanguages.map((lang: string) => ({ value: lang, label: lang }))
      ]
    },
    {
      label: 'Web',
      options: webLanguages.map((lang: string) => ({ value: lang, label: lang }))
    },
    {
      label: 'Mobile',
      options: mobileLanguages.map((lang: string) => ({ value: lang, label: lang }))
    },
    {
      label: 'Systems',
      options: systemsLanguages.map((lang: string) => ({ value: lang, label: lang }))
    },
    {
      label: 'Scripting',
      options: scriptingLanguages.map((lang: string) => ({ value: lang, label: lang }))
    },
    {
      label: 'Functional',
      options: functionalLanguages.map((lang: string) => ({ value: lang, label: lang }))
    },
    {
      label: 'Other',
      options: otherLanguages.map((lang: string) => ({ value: lang, label: lang }))
    }
  ];

  const topicGroups: DropdownGroup[] = [
    {
      label: 'Development',
      options: [
        { value: 'all', label: 'All Topics' },
        ...developmentTopics.map(topic => ({
          value: topic,
          label: topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        }))
      ]
    },
    {
      label: 'Frontend',
      options: frontendTopics.map(topic => ({
        value: topic,
        label: topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      }))
    },
    {
      label: 'Backend',
      options: backendTopics.map(topic => ({
        value: topic,
        label: topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      }))
    },
    {
      label: 'Data & AI',
      options: dataAITopics.map(topic => ({
        value: topic,
        label: topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      }))
    },
    {
      label: 'Infrastructure',
      options: infrastructureTopics.map(topic => ({
        value: topic,
        label: topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      }))
    },
    {
      label: 'Security',
      options: securityTopics.map(topic => ({
        value: topic,
        label: topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      }))
    },
    {
      label: 'Best Practices',
      options: bestPracticesTopics.map(topic => ({
        value: topic,
        label: topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      }))
    }
  ];

  const sortGroups = [
    {
      label: 'Popularity',
      options: [
        { value: 'stars-desc', label: 'Most Stars', icon: FiStar },
        { value: 'stars-asc', label: 'Least Stars', icon: FiStar },
        { value: 'forks-desc', label: 'Most Forks', icon: FiGitBranch },
        { value: 'forks-asc', label: 'Least Forks', icon: FiGitBranch },
      ]
    },
    {
      label: 'Activity',
      options: [
        { value: 'commits-desc', label: 'Most Commits', icon: FiGitCommit },
        { value: 'commits-asc', label: 'Least Commits', icon: FiGitCommit },
        { value: 'issues-desc', label: 'Most Issues', icon: FiAlertCircle },
        { value: 'issues-asc', label: 'Least Issues', icon: FiAlertCircle },
        { value: 'prs-desc', label: 'Most PRs', icon: FiGitPullRequest },
        { value: 'prs-asc', label: 'Least PRs', icon: FiGitPullRequest },
      ]
    },
    {
      label: 'Time',
      options: [
        { value: 'updated-desc', label: 'Recently Updated', icon: FiGitCommit },
        { value: 'updated-asc', label: 'Least Recently Updated', icon: FiGitCommit },
      ]
    }
  ];

  const gsocOrganizations = [
    "apache",
    "kubernetes",
    "numfocus",
    "gnome",
    "KDE",
    "blender",
    "mozilla",
    "python",
    "eclipse",
    "debian",
    "OSGeo",
    "chromium",
    "gitlab-org",
    "wikimedia",
    "osrf",
    "GNOME",
    "inkscape",
    "LibreOffice",
    "OWASP",
    "qemu",
    "ceph",
    "boostorg",
    "llvm",
    "opencv",
    "tensorflow"
  ];

  const getRateLimitInfo = async (): Promise<RateLimitInfo> => {
    try {
      const response = await fetch('https://api.github.com/rate_limit', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rate limit info');
      }

      const data = await response.json();
      return {
        remaining: data.resources.search.remaining,
        reset: data.resources.search.reset
      };
    } catch (error) {
      console.error('Error fetching rate limit info:', error);
      return { remaining: 0, reset: 0 };
    }
  };

  const waitForRateLimitReset = async (resetTime: number): Promise<void> => {
    const now = Math.floor(Date.now() / 1000);
    const waitTime = Math.max(0, resetTime - now) * 1000;
    if (waitTime > 0) {
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  };

  const fetchPullRequestCount = async (owner: string, repo: string): Promise<number> => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=1`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          const resetTime = parseInt(response.headers.get('X-RateLimit-Reset') || '0', 10);
          await waitForRateLimitReset(resetTime);
          return 0;
        }
        throw new Error(`Failed to fetch pull requests: ${response.status}`);
      }

      const linkHeader = response.headers.get('Link');
      if (!linkHeader) return 0;

      const match = linkHeader.match(/page=(\d+)>; rel="last"/);
      return match ? parseInt(match[1], 10) : 0;
    } catch (error) {
      console.error(`Error fetching pull requests for ${owner}/${repo}:`, error);
      return 0;
    }
  };

  const fetchCommitCount = async (owner: string, repo: string): Promise<number> => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          const resetTime = parseInt(response.headers.get('X-RateLimit-Reset') || '0', 10);
          await waitForRateLimitReset(resetTime);
          return 0;
        }
        throw new Error(`Failed to fetch commits: ${response.status}`);
      }

      const linkHeader = response.headers.get('Link');
      if (!linkHeader) return 0;

      const match = linkHeader.match(/page=(\d+)>; rel="last"/);
      return match ? parseInt(match[1], 10) : 0;
    } catch (error) {
      console.error(`Error fetching commits for ${owner}/${repo}:`, error);
      return 0;
    }
  };

  const fetchGSOCOrganizations = async () => {
    setIsLoadingGSOC(true);
    try {
      // Use the predefined list instead of fetching from API
      setGSOCOrgs(gsocOrganizations.map(org => ({
        name: org,
        description: '',
        technologies: [],
        website: ''
      })));
    } catch (err) {
      console.error('Error setting GSOC organizations:', err);
      setError('Failed to load GSOC organizations. Please try again later.');
    } finally {
      setIsLoadingGSOC(false);
    }
  };

  const fetchRepositories = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate GitHub token
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      if (!token) {
        throw new Error('GitHub token is not configured. Please check your environment variables.');
      }

      // Check rate limit before starting
      const rateLimit = await getRateLimitInfo();
      if (rateLimit.remaining < 10) {
        await waitForRateLimitReset(rateLimit.reset);
      }

      let query = 'stars:>100';
      if (selectedLanguage) {
        query += ` language:${selectedLanguage}`;
      }
      if (selectedTopic) {
        query += ` topic:${selectedTopic}`;
      }

      // Handle GSOC organizations separately with better rate limiting
      if (showGSOCOnly) {
        const batchSize = 3; // Process 3 organizations at a time
        const batches = [];
        for (let i = 0; i < gsocOrganizations.length; i += batchSize) {
          batches.push(gsocOrganizations.slice(i, i + batchSize));
        }

        const allRepos = [];
        const errors = [];

        for (const batch of batches) {
          try {
            // Check rate limit before each batch
            const currentRateLimit = await getRateLimitInfo();
            if (currentRateLimit.remaining < batch.length * 2) {
              await waitForRateLimitReset(currentRateLimit.reset);
            }

            const batchPromises = batch.map(async (org) => {
              try {
                // Modified query to be more inclusive for GSOC organizations
                const orgQuery = `org:${org} stars:>10`;
                const response = await fetch(
                  `https://api.github.com/search/repositories?q=${encodeURIComponent(orgQuery)}&sort=stars&order=desc&per_page=20`,
                  {
                    headers: {
                      'Accept': 'application/vnd.github.v3+json',
                      'Authorization': `Bearer ${token}`
                    }
                  }
                );

                if (!response.ok) {
                  if (response.status === 403) {
                    const resetTime = parseInt(response.headers.get('X-RateLimit-Reset') || '0', 10);
                    await waitForRateLimitReset(resetTime);
                    throw new Error(`Rate limit exceeded for ${org}. Please try again later.`);
                  }
                  const errorData = await response.json();
                  throw new Error(`Failed to fetch repositories for ${org}: ${errorData.message || response.statusText}`);
                }

                const data = await response.json();
                if (!data.items || !Array.isArray(data.items)) {
                  throw new Error(`Invalid response for ${org}`);
                }

                // Filter repositories to ensure they're from the correct organization
                const validRepos = data.items.filter((repo: any) => 
                  repo.owner.login.toLowerCase() === org.toLowerCase()
                );

                return validRepos.map((repo: any) => ({
                  ...repo,
                  is_gsoc_org: true,
                  gsoc_org_details: {
                    name: org,
                    description: '',
                    technologies: [],
                    website: ''
                  }
                }));
              } catch (err) {
                console.error(`Error fetching repositories for ${org}:`, err);
                errors.push(`Error fetching ${org}: ${err instanceof Error ? err.message : 'Unknown error'}`);
                return [];
              }
            });

            const batchResults = await Promise.all(batchPromises);
            allRepos.push(...batchResults.flat());

            // Add delay between batches to avoid rate limiting
            if (batches.indexOf(batch) < batches.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          } catch (err) {
            console.error('Error processing batch:', err);
            errors.push(`Batch error: ${err instanceof Error ? err.message : 'Unknown error'}`);
          }
        }

        if (allRepos.length === 0) {
          if (errors.length > 0) {
            setError(`No repositories found. Errors: ${errors.join(', ')}`);
          } else {
            setError('No repositories found for GSOC organizations');
          }
          setRepositories([]);
          return;
        }

        // Sort repositories based on selected criteria
        let sortedRepos = [...allRepos];
        if (sortBy === 'stars-desc') {
          sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        } else if (sortBy === 'stars-asc') {
          sortedRepos.sort((a, b) => a.stargazers_count - b.stargazers_count);
        } else if (sortBy === 'forks-desc') {
          sortedRepos.sort((a, b) => b.forks_count - a.forks_count);
        } else if (sortBy === 'forks-asc') {
          sortedRepos.sort((a, b) => a.forks_count - b.forks_count);
        } else if (sortBy === 'updated-desc') {
          sortedRepos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        } else if (sortBy === 'updated-asc') {
          sortedRepos.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
        }

        // Only fetch additional data if needed
        if (sortBy.includes('prs') || sortBy.includes('commits')) {
          const additionalDataPromises = sortedRepos.map(async (repo: Repository) => {
            try {
              const [prCount, commitCount] = await Promise.all([
                sortBy.includes('prs') ? fetchPullRequestCount(repo.owner.login, repo.name) : Promise.resolve(0),
                sortBy.includes('commits') ? fetchCommitCount(repo.owner.login, repo.name) : Promise.resolve(0)
              ]);
              return { ...repo, pull_requests_count: prCount, commit_count: commitCount };
            } catch (err) {
              console.error(`Error fetching additional data for ${repo.owner.login}/${repo.name}:`, err);
              return { ...repo, pull_requests_count: 0, commit_count: 0 };
            }
          });

          const reposWithData = await Promise.all(additionalDataPromises);
          
          if (sortBy === 'prs-desc') {
            reposWithData.sort((a, b) => b.pull_requests_count - a.pull_requests_count);
          } else if (sortBy === 'prs-asc') {
            reposWithData.sort((a, b) => a.pull_requests_count - b.pull_requests_count);
          } else if (sortBy === 'commits-desc') {
            reposWithData.sort((a, b) => b.commit_count - a.commit_count);
          } else if (sortBy === 'commits-asc') {
            reposWithData.sort((a, b) => a.commit_count - b.commit_count);
          }

          setRepositories(reposWithData);
        } else {
          setRepositories(sortedRepos);
        }
      } else {
        // Regular search without GSOC filter
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=30`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (!response.ok) {
          if (response.status === 403) {
            const resetTime = parseInt(response.headers.get('X-RateLimit-Reset') || '0', 10);
            await waitForRateLimitReset(resetTime);
            throw new Error('GitHub API rate limit exceeded. Please try again later.');
          }
          const errorData = await response.json();
          throw new Error(`Failed to fetch repositories: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        if (!data.items || !Array.isArray(data.items)) {
          throw new Error('Invalid response from GitHub API');
        }

        setRepositories(data.items);
      }
    } catch (err) {
      console.error('Error fetching repositories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      setRepositories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchRepositories();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedLanguage, selectedTopic, sortBy, showGSOCOnly]);

  useEffect(() => {
    fetchGSOCOrganizations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#181028] to-[#161b22] pt-24 pb-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#00f0ff] via-[#2563eb] to-[#00ff85] bg-clip-text text-transparent mb-6">
            Discover Open Source Projects
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Find and contribute to amazing open source projects. Filter by language, topic, or search for specific repositories.
          </p>
        </motion.div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-black/40 border border-[#2563eb]/40 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl relative z-10"
        >
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#00f0ff] transition-colors text-xl" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repositories..."
                className="w-full pl-12 pr-4 py-4 bg-black/50 border border-[#2563eb]/40 rounded-xl text-white 
                         placeholder-gray-400 focus:outline-none focus:border-[#00f0ff] focus:ring-2 
                         focus:ring-[#00f0ff]/20 transition-all duration-200 text-lg"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <CustomDropdown
                options={languageGroups}
                value={selectedLanguage}
                onChange={setSelectedLanguage}
                placeholder="Select Language"
                className="bg-black/50 border-[#2563eb]/40"
              />
              
              <CustomDropdown
                options={topicGroups}
                value={selectedTopic}
                onChange={setSelectedTopic}
                placeholder="Select Topic"
                className="bg-black/50 border-[#2563eb]/40"
              />
              
              <CustomDropdown
                options={sortGroups}
                value={sortBy}
                onChange={setSortBy}
                placeholder="Sort By"
                className="bg-black/50 border-[#2563eb]/40"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setShowGSOCOnly(!showGSOCOnly)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl transition-all duration-200 
                            ${showGSOCOnly 
                              ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40' 
                              : 'bg-black/50 text-gray-400 border border-[#2563eb]/40 hover:border-[#00f0ff]/40'}`}
                >
                  <FiAward className="text-xl" />
                  <span>GSOC Organizations</span>
                </button>
                <button
                  onClick={fetchGSOCOrganizations}
                  disabled={isLoadingGSOC}
                  className="px-4 py-4 bg-black/50 text-gray-400 border border-[#2563eb]/40 rounded-xl 
                           hover:border-[#00f0ff]/40 transition-all duration-200 disabled:opacity-50 
                           disabled:cursor-not-allowed"
                >
                  <FiRefreshCw className={`text-xl ${isLoadingGSOC ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative z-0"
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00f0ff]"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400">
                <p className="text-center">{error}</p>
              </div>
            </div>
          ) : repositories.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="bg-black/40 border border-[#2563eb]/40 rounded-xl p-8 text-center">
                <p className="text-gray-400 text-lg">No repositories found. Try adjusting your filters or search query.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {repositories.map((repo) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-black/40 border border-[#2563eb]/40 rounded-2xl p-6 backdrop-blur-sm 
                           hover:border-[#00f0ff]/40 hover:shadow-lg hover:shadow-[#00f0ff]/5 
                           transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={repo.owner.avatar_url}
                      alt={`${repo.owner.login}'s avatar`}
                      className="w-14 h-14 rounded-xl ring-2 ring-[#2563eb]/20 group-hover:ring-[#00f0ff]/40 
                               transition-all duration-300 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white truncate">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00f0ff] transition-colors"
                          >
                            {repo.owner.login}/{repo.name}
                          </a>
                        </h3>
                        {repo.is_gsoc_org && (
                          <span className="flex items-center gap-1 px-2 py-1 bg-[#00f0ff]/10 text-[#00f0ff] rounded-md text-xs font-medium">
                            <FiAward className="text-sm" />
                            GSOC
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2 break-words">
                        {repo.description || 'No description provided'}
                      </p>
                      {repo.is_gsoc_org && repo.gsoc_org_details && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-400">
                            <span className="text-[#00f0ff]">Technologies:</span>{' '}
                            {repo.gsoc_org_details.technologies.join(', ')}
                          </p>
                          <a
                            href={repo.gsoc_org_details.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#00f0ff] hover:underline mt-1 inline-block"
                          >
                            Visit GSOC Organization Page
                          </a>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {repo.topics.slice(0, 5).map((topic) => (
                          <span
                            key={topic}
                            className="px-3 py-1 text-xs font-medium bg-[#2563eb]/20 text-[#2563eb] 
                                     rounded-full hover:bg-[#2563eb]/30 transition-colors truncate max-w-[150px]"
                          >
                            {topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <FiStar className="text-yellow-400 text-lg flex-shrink-0" />
                          <span className="truncate">{repo.stargazers_count.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiGitBranch className="text-[#00f0ff] text-lg flex-shrink-0" />
                          <span className="truncate">{repo.forks_count.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiEye className="text-purple-400 text-lg flex-shrink-0" />
                          <span className="truncate">{repo.watchers_count.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiAlertCircle className="text-red-400 text-lg flex-shrink-0" />
                          <span className="truncate">{repo.open_issues_count.toLocaleString()}</span>
                        </div>
                        {repo.pull_requests_count !== undefined && (
                          <div className="flex items-center gap-1.5">
                            <FiGitPullRequest className="text-green-400 text-lg flex-shrink-0" />
                            <span className="truncate">{repo.pull_requests_count.toLocaleString()}</span>
                          </div>
                        )}
                        {repo.commit_count !== undefined && (
                          <div className="flex items-center gap-1.5">
                            <FiGitCommit className="text-orange-400 text-lg flex-shrink-0" />
                            <span className="truncate">{repo.commit_count.toLocaleString()}</span>
                          </div>
                        )}
                        {repo.language && (
                          <span className="text-[#00f0ff] font-medium bg-[#00f0ff]/10 px-2 py-0.5 rounded-md truncate max-w-[120px]">
                            {repo.language}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Add this CSS to your global styles or component
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(37, 99, 235, 0.1);
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(37, 99, 235, 0.3);
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(37, 99, 235, 0.5);
  }
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = customScrollbarStyles;
  document.head.appendChild(style);
}