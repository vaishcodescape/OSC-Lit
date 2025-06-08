import React from 'react';

interface KeyFeatureProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const KeyFeature: React.FC<KeyFeatureProps> = ({ title, description, icon }) => (
  <div className="relative bg-[#181828] p-7 rounded-xl transition-all duration-200 feature shadow-lg overflow-hidden border border-[#2563eb]/60 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:border-cyan-400 hover:shadow-cyan-400/30 group animate-float">
    {/* Neon border effect */}
    <div className="absolute -inset-1 rounded-xl pointer-events-none z-0 bg-gradient-to-r from-[#00f0ff] via-[#2563eb] to-[#00ff85] blur-md opacity-30 group-hover:opacity-60 group-hover:blur-lg transition-all duration-200"></div>
    <div className="relative z-10 flex flex-col items-center text-center">
      {/* Icon with glow */}
      {icon && (
        <div className="mb-4 flex items-center justify-center">
          <span className="relative">
            <span className="absolute inset-0 rounded-full blur-md opacity-60 bg-gradient-to-tr from-[#2563eb] via-[#00f0ff] to-[#00ff85] w-12 h-12 -z-10 group-hover:blur-lg group-hover:opacity-80 transition-all duration-200"></span>
            {icon}
          </span>
        </div>
      )}
      <h3 className="text-xl font-bold mb-1 text-white tracking-tight drop-shadow-sm">{title}</h3>
      <p className="text-gray-300 text-sm font-normal leading-snug drop-shadow-sm">{description}</p>
    </div>
  </div>
);

export default KeyFeature; 