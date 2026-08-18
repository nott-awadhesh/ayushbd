import React, { useState } from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { triggerBirthdayConfetti, triggerHeartConfetti } from '../utils/confetti';
import { playPopSound } from '../utils/sound';

interface FooterProps {
  recipientName: string;
}

export const Footer: React.FC<FooterProps> = ({ recipientName }) => {
  const [loveCount, setLoveCount] = useState(42);
  const [isLoved, setIsLoved] = useState(false);

  const handleSendLove = () => {
    playPopSound();
    triggerHeartConfetti();
    setLoveCount((prev) => prev + 1);
    setIsLoved(true);
    setTimeout(() => setIsLoved(false), 600);
  };

  const scrollToTop = () => {
    playPopSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#EBE8FF] bg-white/80 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Heart Interactive Button */}
        <button
          onClick={handleSendLove}
          className={`group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FAF9FF] hover:bg-[#FDE2E4]/40 text-[#FF85A1] border border-[#EBE8FF] shadow-2xs hover:shadow-xs transition-all mb-6 cursor-pointer ${
            isLoved ? 'scale-110 ring-4 ring-[#FDE2E4]' : ''
          }`}
          title="Send a heart to Ayush"
        >
          <Heart className={`w-4 h-4 text-[#FF85A1] fill-[#FF85A1] transition-transform ${isLoved ? 'scale-125' : 'group-hover:scale-110'}`} />
          <span className="text-xs font-semibold">Send Love to Ayush ({loveCount})</span>
          <Sparkles className="w-3.5 h-3.5 text-[#FF85A1]" />
        </button>

        {/* Required Footer text: "Made with love for Ayush Gupta ❤️" */}
        <p className="font-display text-base sm:text-lg font-bold text-[#22223B] flex items-center justify-center gap-1.5 mb-2">
          Made with love for <span className="text-[#8E94F2]">{recipientName}</span> ❤️
        </p>

        <p className="text-xs text-[#9A8C98] max-w-sm mb-6">
          May your birthday and all the days ahead be filled with laughter, wonder, and endless triumphs.
        </p>

        {/* Quick Nav Links & Back to Top */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#4A4E69] pt-4 border-t border-[#F3F0FF] w-full max-w-md">
          <a href="#wishes" className="hover:text-[#8E94F2] transition-colors">
            Wishes
          </a>
          <span className="text-[#9A8C98]/40">•</span>
          <a href="#letter" className="hover:text-[#8E94F2] transition-colors">
            Letter
          </a>
          <span className="text-[#9A8C98]/40">•</span>
          <a href="#memories" className="hover:text-[#8E94F2] transition-colors">
            Memories
          </a>
          <span className="text-[#9A8C98]/40">•</span>
          <button
            onClick={scrollToTop}
            className="hover:text-[#8E94F2] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3 text-[#8E94F2]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
