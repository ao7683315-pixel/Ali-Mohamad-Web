import React, { useState } from 'react';
import { Phone, Mail, Linkedin, Copy, Check, ExternalLink, Download, Sparkles } from 'lucide-react';
import { downloadVCard } from '../utils/vcard';

interface ContactSectionProps {
  onShowToast: (message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const phoneValue = '01023497715';
  const emailValue = 'ao7683315@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/ali-omar-ab5503395?utm_source=share_via&utm_content=profile&utm_medium=member_android';
  const linkedinDisplay = 'ali-omar-ab5503395';

  const handleCopy = async (text: string, label: string, key: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-https or restricted contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedKey(key);
      onShowToast(`Copied ${label} to clipboard`);
      setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 2500);
    } catch {
      onShowToast(`Failed to copy to clipboard`);
    }
  };

  const handleSaveContact = () => {
    downloadVCard();
    onShowToast('Contact card (.vcf) downloaded');
  };

  return (
    <section id="contact-channels" className="relative py-16 md:py-24 border-t border-[#F5F2EB]/10">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FF6B35] mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />
              <span>Direct Communication</span>
            </div>
            <h2 className="font-['Syne'] text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F2EB]">
              Contact Details
            </h2>
            <p className="mt-2 text-sm text-[#C7C1B4] max-w-xl">
              Reach out directly via phone, professional LinkedIn network, or direct email transmission.
            </p>
          </div>

          {/* Quick Action: Save all into mobile contacts */}
          <button
            onClick={handleSaveContact}
            className="inline-flex items-center gap-2 self-start md:self-auto px-4 py-2.5 text-xs font-medium text-[#EAE3D2] bg-[#101B3B] border border-[#F5F2EB]/15 rounded-xl hover:border-[#FF6B35]/50 hover:bg-[#15234A] transition-all duration-200 cursor-pointer shadow-sm group"
          >
            <Download className="h-4 w-4 text-[#FF6B35] group-hover:scale-110 transition-transform" />
            <span>Save Contact Card (.vcf)</span>
          </button>
        </div>

        {/* The 3 Strictly Designated Contact Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: Phone Number */}
          <div className="interactive-card relative flex flex-col justify-between p-7 rounded-2xl glass-panel glass-panel-hover group">
            <div>
              {/* Channel Indicator & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B35]/15 border border-[#FF6B35]/30 text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-[#0B132B] transition-all duration-300">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono tracking-wider text-[#8E8A80] uppercase">
                  CHANNEL 01
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xs font-medium tracking-wide text-[#C7C1B4] uppercase">
                Direct Phone Number
              </h3>
              <div className="mt-2 font-mono text-xl sm:text-2xl font-bold tracking-tight text-[#F5F2EB] group-hover:text-[#FF6B35] transition-colors">
                {phoneValue}
              </div>
              <p className="mt-1 text-xs text-[#8E8A80]">
                Egypt Mobile (+20) · Voice &amp; WhatsApp
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-5 border-t border-[#F5F2EB]/10 flex items-center gap-2.5">
              <a
                href={`tel:${phoneValue}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-[#0B132B] bg-[#FF6B35] rounded-lg hover:bg-[#FF5722] transition-colors duration-200"
              >
                <span>Call Directly</span>
                <Phone className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={() => handleCopy(phoneValue, 'phone number', 'phone')}
                title="Copy phone number"
                className="inline-flex items-center justify-center p-2.5 text-[#C7C1B4] hover:text-[#F5F2EB] border border-[#F5F2EB]/15 rounded-lg hover:bg-[#F5F2EB]/5 transition-colors cursor-pointer"
                aria-label="Copy phone number"
              >
                {copiedKey === 'phone' ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Card 2: LinkedIn Profile */}
          <div className="interactive-card relative flex flex-col justify-between p-7 rounded-2xl glass-panel glass-panel-hover group">
            <div>
              {/* Channel Indicator & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B35]/15 border border-[#FF6B35]/30 text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-[#0B132B] transition-all duration-300">
                  <Linkedin className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono tracking-wider text-[#8E8A80] uppercase">
                  CHANNEL 02
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xs font-medium tracking-wide text-[#C7C1B4] uppercase">
                LinkedIn Profile
              </h3>
              <div className="mt-2 font-['Syne'] text-lg sm:text-xl font-bold tracking-tight text-[#F5F2EB] group-hover:text-[#FF6B35] transition-colors truncate">
                {linkedinDisplay}
              </div>
              <p className="mt-1 text-xs text-[#8E8A80]">
                Professional Network &amp; Industry Verification
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-5 border-t border-[#F5F2EB]/10 flex items-center gap-2.5">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-[#0B132B] bg-[#FF6B35] rounded-lg hover:bg-[#FF5722] transition-colors duration-200"
              >
                <span>Open LinkedIn</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={() => handleCopy(linkedinUrl, 'LinkedIn profile link', 'linkedin')}
                title="Copy LinkedIn URL"
                className="inline-flex items-center justify-center p-2.5 text-[#C7C1B4] hover:text-[#F5F2EB] border border-[#F5F2EB]/15 rounded-lg hover:bg-[#F5F2EB]/5 transition-colors cursor-pointer"
                aria-label="Copy LinkedIn URL"
              >
                {copiedKey === 'linkedin' ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Card 3: Email Address */}
          <div className="interactive-card relative flex flex-col justify-between p-7 rounded-2xl glass-panel glass-panel-hover group">
            <div>
              {/* Channel Indicator & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF6B35]/15 border border-[#FF6B35]/30 text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-[#0B132B] transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono tracking-wider text-[#8E8A80] uppercase">
                  CHANNEL 03
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xs font-medium tracking-wide text-[#C7C1B4] uppercase">
                Email Address
              </h3>
              <div className="mt-2 font-mono text-base sm:text-lg font-bold tracking-tight text-[#F5F2EB] group-hover:text-[#FF6B35] transition-colors break-all">
                {emailValue}
              </div>
              <p className="mt-1 text-xs text-[#8E8A80]">
                Formal Correspondence &amp; Inquiries
              </p>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-5 border-t border-[#F5F2EB]/10 flex items-center gap-2.5">
              <a
                href={`mailto:${emailValue}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-[#0B132B] bg-[#FF6B35] rounded-lg hover:bg-[#FF5722] transition-colors duration-200"
              >
                <span>Compose Mail</span>
                <Mail className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={() => handleCopy(emailValue, 'email address', 'email')}
                title="Copy email address"
                className="inline-flex items-center justify-center p-2.5 text-[#C7C1B4] hover:text-[#F5F2EB] border border-[#F5F2EB]/15 rounded-lg hover:bg-[#F5F2EB]/5 transition-colors cursor-pointer"
                aria-label="Copy email address"
              >
                {copiedKey === 'email' ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Minimalist Verification Banner */}
        <div className="mt-12 rounded-xl border border-[#F5F2EB]/10 bg-[#101B3B]/40 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C7C1B4]">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-[#FF6B35] shrink-0" />
            <span>High-responsiveness guarantee: All verified inquiries receive immediate personal reply.</span>
          </div>
          <div className="flex items-center gap-2 text-[#8E8A80] text-[11px] font-mono shrink-0">
            <span>SEC_STATUS: READY</span>
          </div>
        </div>

      </div>
    </section>
  );
};
