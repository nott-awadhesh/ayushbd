import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Heart, X, ChevronLeft, ChevronRight, Plus, MapPin, Calendar, Sparkles, Upload } from 'lucide-react';
import { Memory } from '../types';
import { playPopSound } from '../utils/sound';
import { triggerHeartConfetti } from '../utils/confetti';

interface MemoriesGalleryProps {
  memories: Memory[];
  onAddMemory: (memory: Omit<Memory, 'id' | 'likes'>) => void;
  onUpdateMemory: (updated: Memory) => void;
  onLikeMemory: (id: string) => void;
}

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({
  memories,
  onAddMemory,
  onUpdateMemory,
  onLikeMemory,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [replaceTargetId, setReplaceTargetId] = useState<string | null>(null);

  // New photo form state
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDate, setNewDate] = useState('Today');
  const [newTag, setNewTag] = useState('Celebrations');

  const tags = ['All', 'Celebrations', 'Adventures', 'Candid Moments'];

  const filteredMemories = selectedTag === 'All'
    ? memories
    : memories.filter((m) => m.tag === selectedTag);

  const openLightbox = (index: number) => {
    playPopSound();
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredMemories.length) % filteredMemories.length);
    }
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSound();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredMemories.length);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, forReplaceId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (forReplaceId) {
        const mem = memories.find((m) => m.id === forReplaceId);
        if (mem) {
          onUpdateMemory({ ...mem, imageUrl: base64Url });
          setReplaceTargetId(null);
          playPopSound();
          triggerHeartConfetti();
        }
      } else {
        setNewUrl(base64Url);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !newTitle.trim()) return;

    onAddMemory({
      title: newTitle.trim(),
      imageUrl: newUrl.trim(),
      caption: newCaption.trim() || 'A cherished memory on Ayush\'s birthday.',
      location: newLocation.trim() || 'Special Place',
      date: newDate.trim() || 'Memory',
      tag: newTag,
    });

    playPopSound();
    triggerHeartConfetti();
    setNewTitle('');
    setNewUrl('');
    setNewCaption('');
    setNewLocation('');
    setIsAddModalOpen(false);
  };

  return (
    <section id="memories" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF9FF] border border-[#EBE8FF] text-[#FF85A1] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            <Camera className="w-3.5 h-3.5 text-[#FF85A1]" />
            <span>Photo Journal</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#22223B] tracking-tight">
            Beautiful Memories
          </h2>
          <div className="h-1 w-12 bg-[#FF85A1] mt-3 mb-3 rounded-full mx-auto" />
          <p className="text-[#9A8C98] text-sm sm:text-base mt-2 max-w-lg mx-auto">
            A snapshot gallery of smiles, trips, milestones, and golden days with Ayush Gupta.
          </p>
        </div>

        {/* Filter Tabs and Add Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-white rounded-full border border-[#EBE8FF] shadow-2xs">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  playPopSound();
                  setSelectedTag(tag);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#8E94F2] text-white shadow-xs'
                    : 'text-[#4A4E69] hover:text-[#8E94F2] hover:bg-[#FAF9FF]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              playPopSound();
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#8E94F2] hover:bg-[#7D84E8] text-white shadow-md shadow-[#8E94F2]/20 hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory Photo</span>
          </button>
        </div>

        {/* Memories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((mem, index) => (
            <div
              key={mem.id}
              onClick={() => openLightbox(index)}
              className="group bg-white rounded-[32px] p-3.5 sm:p-4 border border-[#F3F0FF] shadow-sm hover:shadow-md hover:border-[#DCD6F7] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              {/* Photo Image Frame */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#FAF9FF] mb-3 border border-[#F3F0FF]">
                <img
                  src={mem.imageUrl}
                  alt={mem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'update.png';
                  }}
                />

                {/* Subtle Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#22223B]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs text-white font-medium">Click to view full photo ✨</span>
                </div>

                {/* Tag pill */}
                {mem.tag && (
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-sm text-[#8E94F2] border border-[#EBE8FF] shadow-xs">
                    {mem.tag}
                  </span>
                )}
              </div>

              {/* Photo Details */}
              <div className="px-1.5 pb-1">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 className="font-display font-semibold text-base text-[#22223B] line-clamp-1 group-hover:text-[#8E94F2] transition-colors">
                    {mem.title}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playPopSound();
                      onLikeMemory(mem.id);
                    }}
                    className="flex items-center gap-1 text-xs text-[#4A4E69] hover:text-[#FF85A1] transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#FF85A1] fill-[#FF85A1]/20" />
                    <span>{mem.likes}</span>
                  </button>
                </div>

                <p className="text-[#4A4E69] text-xs sm:text-sm line-clamp-2 leading-relaxed mb-3">
                  {mem.caption}
                </p>

                <div className="flex items-center justify-between text-[11px] text-[#9A8C98] pt-2 border-t border-[#F3F0FF]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#8E94F2]" />
                    {mem.date}
                  </span>
                  {mem.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8E94F2]" />
                      {mem.location}
                    </span>
                  )}
                </div>

                {/* Quick Replace Image Button */}
                <div className="mt-2 pt-1 flex justify-end">
                  <label
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] text-[#8E94F2] hover:text-[#7D84E8] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Swap Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, mem.id)}
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Lightbox Modal */}
      {lightboxIndex !== null && filteredMemories[lightboxIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-[#22223B]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-[36px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] border border-[#F3F0FF]"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Main Image View */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
              <img
                src={filteredMemories[lightboxIndex].imageUrl}
                alt={filteredMemories[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] md:max-h-[80vh] w-full object-contain"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevLightbox}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextLightbox}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Details in Lightbox */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FAF9FF] text-[#8E94F2] border border-[#EBE8FF]">
                    {filteredMemories[lightboxIndex].tag || 'Memory'}
                  </span>
                  <span className="text-xs text-[#9A8C98]">
                    {lightboxIndex + 1} of {filteredMemories.length}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-[#22223B] mb-3">
                  {filteredMemories[lightboxIndex].title}
                </h3>

                <p className="text-[#4A4E69] text-sm sm:text-base leading-relaxed mb-6">
                  {filteredMemories[lightboxIndex].caption}
                </p>

                <div className="space-y-2 py-4 border-y border-[#F3F0FF] text-xs text-[#4A4E69]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#8E94F2]" />
                    <span>{filteredMemories[lightboxIndex].date}</span>
                  </div>
                  {filteredMemories[lightboxIndex].location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#8E94F2]" />
                      <span>{filteredMemories[lightboxIndex].location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button
                  onClick={() => {
                    playPopSound();
                    triggerHeartConfetti();
                    onLikeMemory(filteredMemories[lightboxIndex].id);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF9FF] hover:bg-[#FDE2E4]/40 text-[#FF85A1] text-xs font-semibold border border-[#EBE8FF] transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-[#FF85A1] fill-[#FF85A1]" />
                  <span>Loved {filteredMemories[lightboxIndex].likes} times</span>
                </button>

                <button
                  onClick={closeLightbox}
                  className="px-4 py-2 rounded-full bg-[#FAF9FF] hover:bg-[#EBE8FF] text-[#4A4E69] text-xs font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Memory Modal */}
      {isAddModalOpen && (
        <div
          onClick={() => setIsAddModalOpen(false)}
          className="fixed inset-0 z-50 bg-[#22223B]/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[36px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#F3F0FF] animate-in fade-in zoom-in-95"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-xl text-[#22223B] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8E94F2]" />
                Add a Birthday Memory
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#FAF9FF] flex items-center justify-center text-[#9A8C98]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A4E69] mb-1">Memory Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Birthday Dinner, Mountain Trip"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF9FF] border border-[#EBE8FF] rounded-xl text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#8E94F2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A4E69] mb-1">Photo Image (Upload or URL)</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2 text-sm bg-[#FAF9FF] border border-[#EBE8FF] rounded-xl text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#8E94F2]"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FAF9FF] hover:bg-[#F3F0FF] text-[#8E94F2] border border-[#EBE8FF] rounded-xl text-xs font-semibold cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
                {newUrl && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#EBE8FF] mt-2">
                    <img src={newUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A4E69] mb-1">Date / Occasion</label>
                  <input
                    type="text"
                    placeholder="e.g. August 2026"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF9FF] border border-[#EBE8FF] rounded-xl text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#8E94F2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A4E69] mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. New Delhi, Goa"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF9FF] border border-[#EBE8FF] rounded-xl text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#8E94F2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A4E69] mb-1">Tag Category</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF9FF] border border-[#EBE8FF] rounded-xl text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#8E94F2]"
                >
                  <option value="Celebrations">Celebrations</option>
                  <option value="Adventures">Adventures</option>
                  <option value="Candid Moments">Candid Moments</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A4E69] mb-1">Caption / Story</label>
                <textarea
                  rows={2}
                  placeholder="Share a short sweet note about this memory..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF9FF] border border-[#EBE8FF] rounded-xl text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#8E94F2]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#F3F0FF]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#4A4E69] hover:bg-[#FAF9FF] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold bg-[#8E94F2] hover:bg-[#7D84E8] text-white rounded-xl shadow-xs cursor-pointer"
                >
                  Add Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
