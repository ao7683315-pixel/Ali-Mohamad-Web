import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#101B3B] border border-[#FF6B35]/40 text-[#F5F2EB] shadow-[0_12px_30px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6B35] text-[#0B132B]">
        <Check className="h-3 w-3 stroke-[3]" />
      </div>
      <span className="text-xs font-medium text-[#EAE3D2]">{message}</span>
    </div>
  );
};
