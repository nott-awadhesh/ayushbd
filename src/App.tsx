import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FloatingParticles } from './components/FloatingParticles';
import { HeroWishes } from './components/HeroWishes';
import { LetterSection } from './components/LetterSection';
import { MemoriesGallery } from './components/MemoriesGallery';
import { Footer } from './components/Footer';
import { initialSiteConfig, initialWishes, initialLetter, initialMemories } from './data/defaultData';
import { Wish, Memory, LetterData, SiteConfig } from './types';
import { triggerBirthdayConfetti } from './utils/confetti';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('ayush_birthday_config');
    return saved ? JSON.parse(saved) : initialSiteConfig;
  });

  const [wishes, setWishes] = useState<Wish[]>(() => {
    const saved = localStorage.getItem('ayush_birthday_wishes');
    return saved ? JSON.parse(saved) : initialWishes;
  });

  const [letter, setLetter] = useState<LetterData>(() => {
    const saved = localStorage.getItem('ayush_birthday_letter');
    return saved ? JSON.parse(saved) : initialLetter;
  });

  const [memories, setMemories] = useState<Memory[]>(() => {
    const saved = localStorage.getItem('ayush_birthday_memories');
    return saved ? JSON.parse(saved) : initialMemories;
  });

  // Save to localStorage on state changes
  useEffect(() => {
    localStorage.setItem('ayush_birthday_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('ayush_birthday_wishes', JSON.stringify(wishes));
  }, [wishes]);

  useEffect(() => {
    localStorage.setItem('ayush_birthday_letter', JSON.stringify(letter));
  }, [letter]);

  useEffect(() => {
    localStorage.setItem('ayush_birthday_memories', JSON.stringify(memories));
  }, [memories]);

  // Initial welcome confetti burst on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerBirthdayConfetti();
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleAddWish = (newWishData: Omit<Wish, 'id' | 'likes'>) => {
    const newWish: Wish = {
      ...newWishData,
      id: `w-${Date.now()}`,
      likes: 1,
    };
    setWishes((prev) => [newWish, ...prev]);
  };

  const handleLikeWish = (wishId: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === wishId ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  const handleUpdateLetter = (updatedLetter: LetterData) => {
    setLetter(updatedLetter);
  };

  const handleAddMemory = (newMemoryData: Omit<Memory, 'id' | 'likes'>) => {
    const newMem: Memory = {
      ...newMemoryData,
      id: `m-${Date.now()}`,
      likes: 1,
    };
    setMemories((prev) => [newMem, ...prev]);
  };

  const handleUpdateMemory = (updatedMem: Memory) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === updatedMem.id ? updatedMem : m))
    );
  };

  const handleLikeMemory = (memId: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === memId ? { ...m, likes: m.likes + 1 } : m))
    );
  };

  return (
    <div className="min-h-screen bg-mesh-soft text-[#4A4E69] relative selection:bg-[#EBE8FF] selection:text-[#22223B]">
      {/* Subtle Floating Ambient Background Particles */}
      <FloatingParticles />

      {/* Navigation */}
      <Navbar recipientName={config.recipientName} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section 1: Wishes */}
        <HeroWishes
          config={config}
          wishes={wishes}
          onAddWish={handleAddWish}
          onLikeWish={handleLikeWish}
        />

        {/* Section 2: Letter */}
        <LetterSection
          letter={letter}
          onUpdateLetter={handleUpdateLetter}
        />

        {/* Section 3: Memories */}
        <MemoriesGallery
          memories={memories}
          onAddMemory={handleAddMemory}
          onUpdateMemory={handleUpdateMemory}
          onLikeMemory={handleLikeMemory}
        />
      </main>

      {/* Footer */}
      <Footer recipientName={config.recipientName} />
    </div>
  );
}
