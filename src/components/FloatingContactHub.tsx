import React from 'react';
import { MessageCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface FloatingContactHubProps {
  onOpenModal: () => void;
  isRTL: boolean;
}

export const FloatingContactHub: React.FC<FloatingContactHubProps> = ({
  onOpenModal,
  isRTL
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 pointer-events-auto">
      <button
        onClick={() => {
          sound.playClick();
          onOpenModal();
        }}
        className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white pl-4 pr-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white cursor-pointer"
        title="Direct WhatsApp & Architectural Inquiries"
      >
        {/* Pulse Dot */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>

        <MessageCircle className="w-5 h-5 text-white" />
        
        <div className="flex flex-col text-left">
          <span className="text-xs font-black tracking-wide leading-none">WhatsApp</span>
          <span className="text-[10px] text-emerald-100 font-medium leading-none mt-1">Chat Direct</span>
        </div>
      </button>
    </div>
  );
};
