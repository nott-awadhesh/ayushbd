import React, { useState, useEffect } from 'react';
import { Sparkles, Music, VolumeX, Menu, X, Heart } from 'lucide-react';
import { triggerBirthdayConfetti } from '../utils/confetti';
import { musicPlayer, playPopSound } from '../utils/sound';

interface NavbarProps {
  recipientName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ recipientName }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [activeSection, setActiveSection] = useState('wishes');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track current active section
      const sections = ['wishes', 'letter', 'memories'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    playPopSound();
    const playing = musicPlayer.toggle();
    setIsPlayingMusic(playing);
  };

  const handleCelebrate = () => {
    playPopSound();
    triggerBirthdayConfetti();
  };

  const navItems = [
    { label: 'Wishes', href: '#wishes' },
    { label: 'Letter', href: '#letter' },
    { label: 'Memories', href: '#memories' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-xs border-b border-[#EBE8FF] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#wishes"
            className="group flex items-center gap-2.5 text-[#22223B] hover:text-[#8E94F2] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#FAF9FF] border border-[#EBE8FF] flex items-center justify-center text-[#8E94F2] group-hover:scale-105 transition-transform shadow-xs">
              <Sparkles className="w-4 h-4 text-[#8E94F2]" />
            </div>
            <span className="font-display font-semibold text-lg tracking-tight text-[#22223B]">
              {recipientName}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FDE2E4]/60 text-[#FF85A1] border border-[#FF85A1]/30">
              Birthday
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#EBE8FF] shadow-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#8E94F2] text-white shadow-sm shadow-[#8E94F2]/25'
                      : 'text-[#9A8C98] hover:text-[#8E94F2] hover:bg-[#FAF9FF]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Music Player Toggle */}
            <button
              onClick={toggleMusic}
              title={isPlayingMusic ? 'Mute gentle birthday melody' : 'Play gentle birthday melody'}
              className={`p-2 rounded-full border transition-all duration-200 flex items-center gap-1.5 text-xs font-medium ${
                isPlayingMusic
                  ? 'bg-[#FAF9FF] text-[#8E94F2] border-[#8E94F2]/50 ring-2 ring-[#8E94F2]/20'
                  : 'bg-white/80 text-[#9A8C98] border-[#EBE8FF] hover:border-[#8E94F2]/40 hover:text-[#8E94F2]'
              }`}
            >
              {isPlayingMusic ? (
                <>
                  <Music className="w-4 h-4 animate-bounce text-[#8E94F2]" />
                  <span className="pr-1 text-[#8E94F2] font-semibold">Playing</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#9A8C98]" />
                  <span className="pr-1 text-[#9A8C98]">Music</span>
                </>
              )}
            </button>

            {/* Confetti Celebrate Button */}
            <button
              onClick={handleCelebrate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#8E94F2] hover:bg-[#7D84E8] text-white shadow-md shadow-[#8E94F2]/20 hover:scale-103 active:scale-98 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Celebrate</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleCelebrate}
              className="p-2 rounded-full bg-[#8E94F2] text-white shadow-xs"
              title="Celebrate"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#4A4E69] hover:bg-[#FAF9FF] border border-[#EBE8FF]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white/95 backdrop-blur-lg rounded-[28px] border border-[#EBE8FF] shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeSection === item.href.replace('#', '')
                      ? 'bg-[#FAF9FF] text-[#8E94F2] font-bold'
                      : 'text-[#4A4E69] hover:bg-[#FAF9FF]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <hr className="my-1 border-[#EBE8FF]" />
              <button
                onClick={() => {
                  toggleMusic();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between px-4 py-2 text-xs font-medium text-[#4A4E69] rounded-xl hover:bg-[#FAF9FF]"
              >
                <span className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-[#8E94F2]" />
                  {isPlayingMusic ? 'Melody Playing (Tap to Pause)' : 'Play Birthday Melody'}
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-[#FAF9FF] text-[#8E94F2] border border-[#EBE8FF]">
                  {isPlayingMusic ? 'On' : 'Off'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
