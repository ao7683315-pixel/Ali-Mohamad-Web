import React from 'react';
import { ArrowDownRight, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onContactClick: () => void;
  onSaveVCard: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onContactClick, onSaveVCard }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#F5F2EB]/10 bg-[#0B132B]/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-10">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6B35]/15 border border-[#FF6B35]/30 text-[#FF6B35]">
            <ShieldCheck className="h-4.5 w-4.5" />
          </span>
          <a
            href="#"
            className="font-['Syne'] text-xl font-bold tracking-tight text-[#F5F2EB] hover:text-[#FF6B35] transition-colors duration-200"
          >
            Ali Mohamad
          </a>
        </div>

        {/* Zone 2: Clean unboxed descriptive status */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-medium tracking-wide text-[#C7C1B4]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
          <span>Cybersecurity &amp; Systems Engineering</span>
          <span aria-hidden="true" className="text-[#8E8A80]">·</span>
          <span>Cairo, Egypt (GMT+2)</span>
        </div>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSaveVCard}
            title="Download contact card (.vcf)"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-[#EAE3D2] border border-[#F5F2EB]/15 rounded-lg hover:border-[#FF6B35]/40 hover:bg-[#FF6B35]/5 transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            Save Contact
          </button>
          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-semibold text-[#0B132B] bg-[#FF6B35] rounded-lg hover:bg-[#FF5722] hover:shadow-[0_0_20px_rgba(255,107,53,0.4)] transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-95"
          >
            <span>Get in Touch</span>
            <ArrowDownRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
