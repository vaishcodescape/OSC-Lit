"use client"
import { useState } from 'react';
import { FiSearch, FiFilter, FiStar, FiGitBranch, FiEye, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface Repository {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  lastUpdated: string;
}

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const languages = [
    'all',
    'TypeScript',
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Go',
    'Rust',
    'Ruby',
    'PHP',
    'Swift',
    'Kotlin',
    'Scala',
    'R',
    'Dart',
    'Elixir',
    'Haskell',
    'Clojure',
    'Perl',
    'Shell',
    'HTML',
    'CSS',
    'Assembly',
    'Objective-C',
    'MATLAB',
    'Groovy',
    'Lua',
    'PowerShell',
    'Vue',
    'React',
    'Angular',
    'Svelte'
  ];
  const topics = [
    'all',
    'web-development',
    'mobile-development',
    'desktop-development',
    'game-development',
    'machine-learning',
    'artificial-intelligence',
    'data-science',
    'blockchain',
    'cryptocurrency',
    'cybersecurity',
    'devops',
    'cloud-computing',
    'database',
    'api',
    'microservices',
    'react',
    'vue',
    'angular',
    'svelte',
    'nextjs',
    'nodejs',
    'express',
    'django',
    'flask',
    'spring',
    'laravel',
    'rails',
    'graphql',
    'rest',
    'typescript',
    'javascript',
    'python',
    'java',
    'csharp',
    'cpp',
    'rust',
    'go',
    'kotlin',
    'swift',
    'flutter',
    'react-native',
    'unity',
    'unreal-engine',
    'docker',
    'kubernetes',
    'aws',
    'azure',
    'gcp',
    'linux',
    'open-source',
    'contributing',
    'documentation',
    'testing',
    'ci-cd',
    'agile',
    'design-patterns',
    'algorithms',
    'data-structures',
    'computer-vision',
    'natural-language-processing',
    'robotics',
    'iot',
    'embedded-systems',
    'networking',
    'system-design',
    'performance',
    'accessibility',
    'ui-design',
    'ux-design',
    'mobile-app',
    'web-app',
    'desktop-app',
    'cli',
    'automation',
    'scripting',
    'security',
    'privacy',
    'analytics',
    'monitoring',
    'logging',
    'caching',
    'search',
    'recommendation-systems',
    'social-media',
    'e-commerce',
    'finance',
    'healthcare',
    'education',
    'gaming',
    'entertainment',
    'productivity',
    'communication',
    'collaboration'
  ];

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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00f0ff] via-[#2563eb] to-[#00ff85] bg-clip-text text-transparent mb-4">
            Discover Open Source Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find and contribute to amazing open source projects. Filter by language, topic, or search for specific repositories.
          </p>
        </motion.div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-black/40 border border-[#2563eb]/40 rounded-xl p-6 backdrop-blur-sm shadow-xl"
        >
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative group">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#00f0ff] transition-colors" />
              <input
                type="text"
                placeholder="Search repositories..."
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-[#2563eb]/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2563eb]/20 text-[#2563eb] rounded-lg hover:bg-[#2563eb]/30 transition-colors"
            >
              <FiFilter />
              <span>Filters</span>
            </button>

            {/* Filter Options */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#2563eb]/20">
                    {/* Language Filter */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400">Language</label>
                      <select
                        className="w-full bg-black/50 border border-[#2563eb]/40 rounded-lg text-white px-4 py-2 focus:outline-none focus:border-cyan-400 transition-colors"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                      >
                        {languages.map((lang) => (
                          <option key={lang} value={lang} className="bg-black">
                            {lang === 'all' ? 'All Languages' : lang}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Topic Filter */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-400">Topic</label>
                      <select
                        className="w-full bg-black/50 border border-[#2563eb]/40 rounded-lg text-white px-4 py-2 focus:outline-none focus:border-cyan-400 transition-colors"
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                      >
                        {topics.map((topic) => (
                          <option key={topic} value={topic} className="bg-black">
                            {topic === 'all' ? 'All Topics' : topic}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Repositories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]"
        >
          {/* Repository cards will be added here */}
          <div className="col-span-full flex justify-center items-center text-gray-400">
            <p className="text-center">No repositories found. Try adjusting your filters or search query.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}