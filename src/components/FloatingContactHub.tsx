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
    <div className={`fixed bottom-4 sm:bottom-6 ${isRTL ? 'left-3 sm:left-6' : 'right-3 sm:right-6'} z-40 flex items-center gap-2 pointer-events-auto pb-[env(safe-area-inset-bottom,0px)]`}>
      <button
        onClick={() => {
          sound.playClick();
          onOpenModal();
        }}
        className="group relative flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white w-12 h-12 sm:w-auto sm:h-auto sm:pl-4 sm:pr-5 sm:py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white cursor-pointer"
        title="Direct WhatsApp & Architectural Inquiries"
      >
        {/* Pulse Dot */}
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-full w-full bg-emerald-200"></span>
        </span>

        <MessageCircle className="w-5 h-5 text-white shrink-0" />
        
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-black tracking-wide leading-none">WhatsApp</span>
          <span className="text-[10px] text-emerald-100 font-medium leading-none mt-1">Chat Direct</span>
        </div>
      </button>
    </div>
  );
};
