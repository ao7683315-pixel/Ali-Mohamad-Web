import React, { useRef, useState } from 'react';
import { ArrowDown, Terminal, Shield, Cpu, Lock, CheckCircle2 } from 'lucide-react';

interface HeroBioProps {
  onExploreContact: () => void;
}

export const HeroBio: React.FC<HeroBioProps> = ({ onExploreContact }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)');
  const [isHovered, setIsHovered] = useState(false);

  // Smooth 3D tilt tracking for visual centerpiece (hardware accelerated)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTiltStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -4px, 0)`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)');
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background subtle technical grid mesh */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035] -z-10"
        style={{
          backgroundImage: `linear-gradient(#F5F2EB 1px, transparent 1px), linear-gradient(to right, #F5F2EB 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 80%)'
        }}
      />

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Core Identity & Bio Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Role & Domain kicker */}
            <div className="flex items-center gap-3 text-sm font-semibold tracking-wider uppercase text-[#FF6B35]">
              <span className="flex h-2 w-2 rounded-full bg-[#FF6B35] shadow-[0_0_8px_#FF6B35]" />
              <span>Cybersecurity Student &amp; Computer Science Engineer</span>
            </div>

            {/* Primary Name Display */}
            <h1 className="font-['Syne'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F5F2EB] leading-[1.06] text-balance">
              Ali Mohamad
            </h1>

            {/* High-Impact Professional Introduction Statement */}
            <div className="space-y-4 pt-1">
              <p className="text-lg md:text-xl font-normal leading-relaxed text-[#EAE3D2] text-balance">
                Driven by an analytical engineering mindset and software craftsmanship, I focus on fortifying digital infrastructure, threat modeling, and building resilient computing systems.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[#C7C1B4] max-w-2xl">
                Bridging core computer science foundations with defensive security engineering, I approach vulnerability assessment and architectural integrity with algorithmic precision and proactive vigilance.
              </p>
            </div>

            {/* Engineering Pillars (Clean unboxed inline list with typographic separators) */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-[#C7C1B4]">
              <span className="flex items-center gap-1.5 text-[#EAE3D2]">
                <Shield className="h-3.5 w-3.5 text-[#FF6B35]" />
                <span>Defensive Architecture</span>
              </span>
              <span aria-hidden="true" className="text-[#8E8A80]">·</span>
              <span className="flex items-center gap-1.5 text-[#EAE3D2]">
                <Terminal className="h-3.5 w-3.5 text-[#FF6B35]" />
                <span>Threat Analysis</span>
              </span>
              <span aria-hidden="true" className="text-[#8E8A80]">·</span>
              <span className="flex items-center gap-1.5 text-[#EAE3D2]">
                <Cpu className="h-3.5 w-3.5 text-[#FF6B35]" />
                <span>Systems Engineering</span>
              </span>
            </div>

            {/* Interactive Scroll Action */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreContact}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#0B132B] bg-[#FF6B35] rounded-xl hover:bg-[#FF5722] hover:shadow-[0_0_28px_rgba(255,107,53,0.45)] transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                <span>Direct Contact Channels</span>
                <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
              
              <div className="flex items-center gap-2 text-xs text-[#8E8A80]">
                <CheckCircle2 className="h-4 w-4 text-[#FF6B35]" />
                <span>Phone · LinkedIn · Email</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Centerpiece (Interactive 3D Glassmorphic Frame) */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: tiltStyle,
                transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform'
              }}
              className="relative w-full max-w-md rounded-2xl p-3 glass-panel border border-[#F5F2EB]/12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group"
            >
              {/* Outer glowing border gradient on hover */}
              <div
                className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#FF6B35]/40 via-transparent to-[#101B3B]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
              />

              {/* Top Card Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#F5F2EB]/10 mb-3 text-xs text-[#C7C1B4]">
                <div className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-[#FF6B35]" />
                  <span className="font-mono font-medium text-[11px] tracking-wider text-[#EAE3D2]">SEC_CORE // ARCHITECTURE</span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" title="Active" />
              </div>

              {/* Main Visual Image with Fallback Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#070B16] border border-[#F5F2EB]/10">
                <img
                  src="/src/assets/images/cybersecurity_shield_core_1790594932539.jpg"
                  alt="Cybersecurity engineering cryptographic shield visualization"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    // Resilient fallback container if image fails
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.image-fallback');
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />

                {/* Resilient Fallback Container */}
                <div className="image-fallback hidden absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0F172A]">
                  <Shield className="h-12 w-12 text-[#FF6B35] mb-2 stroke-[1.5]" />
                  <span className="font-['Syne'] font-bold text-base text-[#F5F2EB]">Ali Mohamad</span>
                  <span className="text-xs text-[#C7C1B4]">Cybersecurity Engineering</span>
                </div>

                {/* Overlay Vignette Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/85 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#EAE3D2] px-2 py-1 rounded bg-[#0B132B]/75 backdrop-blur-sm border border-white/10">
                  <span className="truncate">Identity: Ali Mohamad</span>
                  <span className="text-[#FF6B35] shrink-0 ml-2">Verified Profile</span>
                </div>
              </div>

              {/* Sub-card summary footer */}
              <div className="mt-3 px-2 pt-1 pb-1 flex items-center justify-between text-xs text-[#8E8A80]">
                <span>Engineering Portfolio</span>
                <span className="text-[#C7C1B4] font-medium">One-Page Landing Hub</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
