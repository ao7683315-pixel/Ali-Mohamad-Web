/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CursorFollower } from './components/CursorFollower';
import { Header } from './components/Header';
import { HeroBio } from './components/HeroBio';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { downloadVCard } from './utils/vcard';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-channels');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveContact = () => {
    downloadVCard();
    handleShowToast('Contact card (.vcf) downloaded');
  };

  return (
    <div className="relative min-h-screen bg-[#0B132B] text-[#F5F2EB] selection:bg-[#FF6B35]/25 selection:text-[#FF6B35]">
      {/* 60fps GPU-Accelerated Cursor Follower & Ambient Spotlight */}
      <CursorFollower />

      {/* Main Single-Page Frame */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        
        {/* Navigation & Identity Bar */}
        <Header
          onContactClick={scrollToContact}
          onSaveVCard={handleSaveContact}
        />

        {/* Primary Viewport Content */}
        <main className="flex-1">
          {/* Identity & Introduction Bio */}
          <HeroBio onExploreContact={scrollToContact} />

          {/* Contact Details (ONLY the 3 requested items) */}
          <ContactSection onShowToast={handleShowToast} />
        </main>

        {/* Quiet Clean Footer */}
        <Footer />
      </div>

      {/* Feedback Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
