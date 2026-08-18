import React, { useState } from 'react';
import { Mail, Heart, Copy, Check, Edit3, Sparkles, Feather } from 'lucide-react';
import { LetterData } from '../types';
import { playPopSound, playChime } from '../utils/sound';
import { triggerHeartConfetti } from '../utils/confetti';

interface LetterSectionProps {
  letter: LetterData;
  onUpdateLetter: (updated: LetterData) => void;
}

export const LetterSection: React.FC<LetterSectionProps> = ({
  letter,
  onUpdateLetter,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Edit states
  const [salutation, setSalutation] = useState(letter.salutation);
  const [bodyText, setBodyText] = useState(letter.paragraphs.join('\n\n'));
  const [signOff, setSignOff] = useState(letter.signOff);
  const [sender, setSender] = useState(letter.sender);

  const handleToggleEnvelope = () => {
    playPopSound();
    if (!isOpen) {
      playChime();
      triggerHeartConfetti();
    }
    setIsOpen(!isOpen);
  };

  const handleCopy = () => {
    playPopSound();
    const fullText = `${letter.salutation}\n\n${letter.paragraphs.join('\n\n')}\n\n${letter.signOff}\n${letter.sender}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    playPopSound();
    const splitParagraphs = bodyText
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    onUpdateLetter({
      ...letter,
      salutation,
      paragraphs: splitParagraphs.length > 0 ? splitParagraphs : [bodyText],
      signOff,
      sender,
    });
    setIsEditing(false);
  };

  return (
    <section id="letter" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background soft ambient accents */}
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF9FF] border border-[#EBE8FF] text-[#FF85A1] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            <Feather className="w-3.5 h-3.5 text-[#FF85A1]" />
            <span>Personal Note</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#22223B] tracking-tight">
            A Letter For You
          </h2>
          <div className="h-1 w-12 bg-[#FF85A1] mt-3 mb-3 rounded-full mx-auto" />
          <p className="text-[#9A8C98] text-sm sm:text-base mt-2 max-w-lg mx-auto">
            A heartfelt keepsake written with fondness, gratitude, and warm birthday wishes.
          </p>
        </div>

        {/* Envelope / Letter Interactive Container */}
        <div className="relative">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between gap-2 mb-4 px-2">
            <button
              onClick={handleToggleEnvelope}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 hover:bg-white text-[#4A4E69] border border-[#EBE8FF] shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[#8E94F2]" />
              <span>{isOpen ? 'Close Note' : 'Open Note'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playPopSound();
                  setIsEditing(!isEditing);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 hover:bg-white text-[#4A4E69] border border-[#EBE8FF] shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#8E94F2]" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Letter'}</span>
              </button>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/90 hover:bg-white text-[#4A4E69] border border-[#EBE8FF] shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#9A8C98]" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* If envelope closed preview */}
          {!isOpen ? (
            <div
              onClick={handleToggleEnvelope}
              className="group cursor-pointer bg-gradient-to-br from-[#FAF9FF] via-[#FDE2E4]/40 to-[#E0C3FC]/30 rounded-[36px] p-10 sm:p-16 border border-[#EBE8FF] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-white shadow-xs border border-[#EBE8FF] flex items-center justify-center text-[#8E94F2] mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-10 h-10 text-[#8E94F2]" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#22223B] mb-2">
                Click to Open the Envelope
              </h3>
              <p className="text-[#9A8C98] text-sm max-w-sm mb-4">
                A personal letter for {letter.recipient} is waiting inside.
              </p>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#8E94F2] text-white shadow-md shadow-[#8E94F2]/20 group-hover:bg-[#7D84E8] transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                Unseal Letter
              </span>
            </div>
          ) : (
            /* Opened Letter on luxury parchment styling in Natural Tones */
            <div className="relative paper-texture-natural rounded-[36px] p-6 sm:p-12 md:p-16 border border-[#F5F1E9] shadow-sm text-[#6D597A] transition-all">
              {/* Postage Stamp & Wax Seal Visuals */}
              <div className="absolute top-6 right-6 hidden sm:flex flex-col items-end gap-2 pointer-events-none select-none">
                {/* Stamp */}
                <div className="w-16 h-20 border-2 border-dashed border-[#8E94F2]/40 bg-[#FAF9FF] rounded-sm p-1.5 flex flex-col justify-between items-center rotate-3 shadow-2xs">
                  <div className="text-[9px] font-bold text-[#8E94F2] tracking-wider uppercase">Air Mail</div>
                  <Heart className="w-5 h-5 text-[#FF85A1] fill-[#FF85A1]" />
                  <div className="text-[8px] text-[#9A8C98] font-mono">AUG 2026</div>
                </div>

                {/* Wax Seal Badge */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF85A1] to-[#E56B85] text-white flex items-center justify-center text-xs font-serif font-bold shadow-md -mt-4 -mr-2 border-2 border-white/80">
                  <span className="font-display">AG</span>
                </div>
              </div>

              {isEditing ? (
                /* Edit Mode */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4A4E69] mb-1">Salutation</label>
                    <input
                      type="text"
                      value={salutation}
                      onChange={(e) => setSalutation(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#EBE8FF] rounded-xl text-sm font-handwriting text-2xl text-[#22223B] focus:outline-none focus:ring-2 focus:ring-[#8E94F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A4E69] mb-1">
                      Letter Paragraphs (separate paragraphs with blank line)
                    </label>
                    <textarea
                      rows={8}
                      value={bodyText}
                      onChange={(e) => setBodyText(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#EBE8FF] rounded-xl font-handwriting text-2xl leading-relaxed text-[#6D597A] focus:outline-none focus:ring-2 focus:ring-[#8E94F2]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#4A4E69] mb-1">Sign-off Phrase</label>
                      <input
                        type="text"
                        value={signOff}
                        onChange={(e) => setSignOff(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#EBE8FF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8E94F2]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4A4E69] mb-1">Sender Signature</label>
                      <input
                        type="text"
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#EBE8FF] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8E94F2]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-[#F5F1E9]">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-xl text-xs font-medium text-[#4A4E69] hover:bg-stone-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-6 py-2 rounded-xl text-xs font-semibold bg-[#8E94F2] hover:bg-[#7D84E8] text-white shadow-xs"
                    >
                      Save Letter Changes
                    </button>
                  </div>
                </div>
              ) : (
                /* Read View (Handwritten Aesthetic in Natural Tones) */
                <div className="space-y-6 max-w-2xl">
                  {/* Date line */}
                  <div className="text-xs sm:text-sm font-serif italic text-[#9A8C98] tracking-wide">
                    {letter.date}
                  </div>

                  {/* Salutation */}
                  <h3 className="font-handwriting text-3xl sm:text-4xl text-[#22223B] font-bold tracking-wide">
                    {letter.salutation}
                  </h3>

                  {/* Letter Body in handwritten styling */}
                  <div className="space-y-4 text-[#6D597A] font-handwriting text-2xl sm:text-3xl leading-[1.7] sm:leading-[1.8] tracking-wide">
                    {letter.paragraphs.map((p, idx) => (
                      <p key={idx} className="transition-all">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Sign off and signature */}
                  <div className="pt-6 border-t border-[#F5F1E9] font-handwriting">
                    <p className="text-2xl text-[#6D597A]">{letter.signOff}</p>
                    <p className="text-3xl sm:text-4xl text-[#8E94F2] font-bold mt-1">
                      {letter.sender}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
