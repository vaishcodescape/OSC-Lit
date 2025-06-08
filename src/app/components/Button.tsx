"use client"
import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const baseClasses =
  'inline-block px-6 py-2.5 text-base font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 bg-black text-white border border-[#2563eb]';

const variantClasses = {
  primary:
    'hover:border-cyan-400 hover:shadow-[0_0_16px_2px_rgba(0,240,255,0.25)] hover:scale-105 focus:ring-[#2563eb]',
  secondary:
    'opacity-80 hover:opacity-100 hover:border-cyan-400 hover:shadow-[0_0_16px_2px_rgba(0,240,255,0.18)] hover:scale-105 focus:ring-[#2563eb]'
};

const Button: React.FC<ButtonProps> = ({ children, href, variant = 'primary', className = '', ...props }) => {
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Button; 