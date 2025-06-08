import React from 'react';
import KeyFeature from './KeyFeature';
import { FiSearch, FiBookOpen, FiUsers } from 'react-icons/fi';

const features = [
  {
    title: 'Easy Project Discovery',
    description: 'Find open source projects that match your interests and skills.',
    icon: <FiSearch className="text-5xl text-blue-500 drop-shadow-glow" />,
  },
  {
    title: 'Contribution Guidance',
    description: 'Step-by-step guides to help you make your first contribution.',
    icon: <FiBookOpen className="text-5xl text-blue-500 drop-shadow-glow" />,
  },
  {
    title: 'Collaboration Made Easy',
    description: 'Find Repositories which belong to companies registered for GSOC and other Open Source Programs.',
    icon: <FiUsers className="text-5xl text-blue-500 drop-shadow-glow" />,
  },
];

const KeyFeaturesSection: React.FC = () => (
  <section className="py-20 px-4 bg-[#161b22]">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((feature, idx) => (
          <KeyFeature key={idx} {...feature} />
        ))}
      </div>
    </div>
  </section>
);

export default KeyFeaturesSection; 