import React, { useState } from 'react';
import { Sparkles, Heart, Gift, Flame, Send, Star, ChevronDown, Check } from 'lucide-react';
import { triggerBirthdayConfetti, triggerHeartConfetti } from '../utils/confetti';
import { playCandleBlowSound, playPopSound } from '../utils/sound';
import { Wish, SiteConfig } from '../types';

interface HeroWishesProps {
  config: SiteConfig;
  wishes: Wish[];
  onAddWish: (wish: Omit<Wish, 'id' | 'likes'>) => void;
  onLikeWish: (wishId: string) => void;
}

export const HeroWishes: React.FC<HeroWishesProps> = ({
  config,
  wishes,
  onAddWish,
  onLikeWish,
}) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishesExpanded, setWishesExpanded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [newMsg, setNewMsg] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('✨');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) {
      setCandlesBlown(false);
      return;
    }
    playCandleBlowSound();
    setCandlesBlown(true);
    triggerBirthdayConfetti();
  };

  const handleOpenWishes = () => {
    playPopSound();
    triggerHeartConfetti();
    setWishesExpanded(true);
    
    // Smooth scroll down to wishes cards
    setTimeout(() => {
      const cardsEl = document.getElementById('wishes-cards-container');
      if (cardsEl) {
        cardsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 150);
  };

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !newMsg.trim()) return;

    onAddWish({
      sender: senderName.trim(),
      relationship: relationship.trim() || 'Friend',
      message: newMsg.trim(),
      emoji: selectedEmoji,
      color: 'from-purple-100 to-pink-50',
    });

    playPopSound();
    triggerBirthdayConfetti();
    setSenderName('');
    setRelationship('');
    setNewMsg('');
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowAddForm(false);
    }, 1800);
  };

  return (
    <section id="wishes" className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative ambient glowing orbs in natural tones */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[520px] h-80 sm:h-[520px] bg-[#E0C3FC]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#FDE2E4]/40 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#E2F0CB]/35 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Top celebratory pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#EBE8FF] shadow-xs backdrop-blur-sm mb-6 animate-float-slow">
          <Sparkles className="w-3.5 h-3.5 text-[#8E94F2]" />
          <span className="text-[#FF85A1] text-xs font-bold uppercase tracking-[0.25em]">
            Birthday Celebration
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8E94F2]/50" />
          <span className="text-[#8E94F2] text-xs font-medium uppercase tracking-wider">Natural Tones</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-[#22223B] leading-[1.14] mb-6">
          Happy Birthday, <br className="hidden sm:inline" />
          <span className="text-[#8E94F2]">
            {config.recipientName}!
          </span>
        </h1>

        {/* Heartfelt Subtitle Message */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#9A8C98] font-normal leading-relaxed mb-10">
          {config.subMessage}
        </p>

        {/* Interactive Virtual Birthday Cake & Candle */}
        <div className="inline-block mb-10">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#F3F0FF] shadow-sm max-w-md mx-auto transition-all hover:shadow-md hover:border-[#EBE8FF]">
            <div className="flex flex-col items-center">
              {/* Candles graphic */}
              <div
                onClick={handleBlowCandles}
                className="relative cursor-pointer group flex flex-col items-center select-none py-2"
                title={candlesBlown ? "Click to relight the candles" : "Click to make a wish & blow out the candle!"}
              >
                {/* Flame effect */}
                <div className="relative h-10 w-10 flex items-center justify-center">
                  {!candlesBlown ? (
                    <div className="relative">
                      {/* Glow halo */}
                      <div className="absolute -inset-2 bg-amber-300/40 rounded-full blur-md animate-pulse" />
                      {/* Flickering Flame */}
                      <Flame className="w-8 h-8 text-amber-500 fill-amber-400 animate-flicker relative z-10 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                    </div>
                  ) : (
                    /* Smoke drift when blown */
                    <div className="flex flex-col items-center animate-fade-out">
                      <div className="w-1.5 h-1.5 bg-[#9A8C98] rounded-full animate-ping mb-1" />
                      <span className="text-xs text-[#9A8C98] font-medium">💨 Wish Made!</span>
                    </div>
                  )}
                </div>

                {/* Candle Stick */}
                <div className="w-4 h-12 bg-gradient-to-b from-[#E6E6FA] via-[#FDE2E4] to-[#E0C3FC] rounded-t-sm shadow-xs border border-[#EBE8FF]" />

                {/* Cake Tier */}
                <div className="w-36 h-10 bg-gradient-to-r from-[#FAF9FF] via-[#FDE2E4]/40 to-[#FAF9FF] rounded-xl border border-[#EBE8FF] shadow-xs flex items-center justify-around px-3 -mt-1">
                  <span className="text-xs">🍓</span>
                  <span className="text-xs">✨</span>
                  <span className="text-xs">🎂</span>
                  <span className="text-xs">✨</span>
                  <span className="text-xs">🍓</span>
                </div>

                {/* Cake Base */}
                <div className="w-48 h-12 bg-gradient-to-r from-[#E6E6FA] via-[#FAF9FF] to-[#D8E2DC] rounded-b-2xl border-t border-[#EBE8FF] shadow-inner flex items-center justify-center -mt-1">
                  <div className="w-40 h-1.5 bg-[#8E94F2]/20 rounded-full" />
                </div>
              </div>

              {/* Candle Prompt */}
              <div className="mt-4 text-center">
                <button
                  onClick={handleBlowCandles}
                  className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#FAF9FF] hover:bg-[#F3F0FF] text-[#8E94F2] transition-colors border border-[#EBE8FF] cursor-pointer"
                >
                  {!candlesBlown ? '✨ Tap candle to make a wish & blow it out!' : '🎉 Wish granted! Tap to light again ✨'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Primary CTA: "Open Your Wishes" */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleOpenWishes}
            id="open-wishes-btn"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-white bg-[#8E94F2] hover:bg-[#7D84E8] shadow-lg shadow-[#8E94F2]/25 hover:scale-103 active:scale-98 transition-all cursor-pointer overflow-hidden"
          >
            <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 text-white" />
            <span className="relative">Open Your Wishes</span>
            <span className="text-amber-200">✨</span>
          </button>

          <a
            href="#letter"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm font-medium text-[#4A4E69] bg-white/90 hover:bg-white border border-[#EBE8FF] shadow-xs hover:shadow-sm transition-all"
          >
            <span>Read Birthday Letter</span>
            <ChevronDown className="w-4 h-4 text-[#8E94F2]" />
          </a>
        </div>
      </div>

      {/* Wishes Section Cards */}
      <div id="wishes-cards-container" className="w-full max-w-5xl mx-auto mt-20 pt-8 border-t border-[#EBE8FF]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#22223B] flex items-center gap-2">
              <span>Warm Wishes & Blessings</span>
              <span className="text-xl">💌</span>
            </h2>
            <p className="text-[#9A8C98] text-sm mt-1">
              Heartfelt messages from the people who love and celebrate you.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#FAF9FF] hover:bg-[#F3F0FF] text-[#8E94F2] border border-[#EBE8FF] transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            {showAddForm ? 'Close Form' : '+ Add a Wish for Ayush'}
          </button>
        </div>

        {/* Add Wish Form */}
        {showAddForm && (
          <div className="mb-10 bg-white rounded-[32px] p-6 sm:p-8 border border-[#F3F0FF] shadow-sm animate-in fade-in slide-in-from-top-4">
            <h3 className="font-display font-semibold text-lg text-[#22223B] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8E94F2]" />
              Write a Birthday Wish for Ayush
            </h3>

            {formSubmitted ? (
              <div className="py-8 text-center text-emerald-600 font-medium flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Check className="w-5 h-5" />
                </div>
                <span>Your wish has been added to Ayush&apos;s wall! 🎉</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitWish} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4A4E69] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah, Rohit, Maya"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF9FF] border border-[#EBE8FF] rounded-xl text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#8E94F2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4A4E69] mb-1">Relationship / Group</label>
                    <input
                      type="text"
                      placeholder="e.g. College Friend, Colleague, Sibling"
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-[#FAF9FF] border border-[#EBE8FF] rounded-xl text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#8E94F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A4E69] mb-1">Your Message</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Write your sweet birthday message..."
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF9FF] border border-[#EBE8FF] rounded-xl text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#8E94F2]"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#9A8C98]">Pick an icon:</span>
                    {['✨', '🥂', '🎉', '🚀', '🌟', '💖', '🎂'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                          selectedEmoji === emoji
                            ? 'bg-[#8E94F2] text-white scale-110 shadow-xs'
                            : 'bg-[#FAF9FF] hover:bg-[#F3F0FF] text-[#4A4E69]'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#8E94F2] hover:bg-[#7D84E8] text-white shadow-xs hover:shadow transition-all cursor-pointer"
                  >
                    Post Birthday Wish ✨
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="group relative bg-white rounded-[32px] p-6 border border-[#F3F0FF] shadow-sm hover:shadow-md hover:border-[#DCD6F7] transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#FAF9FF] border border-[#EBE8FF] flex items-center justify-center text-lg shadow-2xs">
                      {wish.emoji || '✨'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#22223B] text-sm sm:text-base">
                        {wish.sender}
                      </h4>
                      {wish.relationship && (
                        <p className="text-xs text-[#8E94F2] font-medium">
                          {wish.relationship}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playPopSound();
                      onLikeWish(wish.id);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FAF9FF] hover:bg-[#FDE2E4]/40 text-[#4A4E69] hover:text-[#FF85A1] transition-colors border border-[#EBE8FF] cursor-pointer"
                    title="Send a heart"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#FF85A1] fill-[#FF85A1]/20" />
                    <span>{wish.likes}</span>
                  </button>
                </div>

                <p className="text-[#4A4E69] text-sm sm:text-base leading-relaxed">
                  &ldquo;{wish.message}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F3F0FF] flex items-center justify-between text-xs text-[#9A8C98]">
                <span className="flex items-center gap-1 text-[#8E94F2] font-medium">
                  <Star className="w-3 h-3 fill-[#8E94F2] text-[#8E94F2]" />
                  Birthday Blessing
                </span>
                <span>For Ayush Gupta</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
