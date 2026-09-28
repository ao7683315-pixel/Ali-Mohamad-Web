import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[#F5F2EB]/10 bg-[#070B16] py-12 text-[#C7C1B4]">
      <div className="mx-auto max-w-6xl px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Identity info */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6B35]/15 border border-[#FF6B35]/30 text-[#FF6B35]">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div>
            <span className="font-['Syne'] text-sm font-bold tracking-tight text-[#F5F2EB]">
              Ali Mohamad
            </span>
            <span className="mx-2 text-[#8E8A80] hidden sm:inline">·</span>
            <span className="text-xs text-[#8E8A80] block sm:inline">
              Cybersecurity Student &amp; Computer Science Engineer
            </span>
          </div>
        </div>

        {/* Center / Right: Quiet copyright & back to top */}
        <div className="flex items-center gap-6 text-xs text-[#8E8A80]">
          <span>&copy; {new Date().getFullYear()} Ali Mohamad. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#C7C1B4] hover:text-[#FF6B35] transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
