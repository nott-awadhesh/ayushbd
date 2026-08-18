// Web Audio API generator for soft, pleasant sound effects & gentle melody

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playPopSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // Ignore audio failures if browser restricts audio
  }
};

export const playCandleBlowSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // Wind / whoosh sound with noise & filter
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start();
    
    // Play sweet chime harmony right after
    setTimeout(() => {
      playChime();
    }, 250);
  } catch {
    // Ignore audio error
  }
};

export const playChime = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 0.6);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + index * 0.08);
      osc.stop(ctx.currentTime + index * 0.08 + 0.65);
    });
  } catch {
    // Ignore
  }
};

// Gentle acoustic music loop synthesizer
class GentleMusicPlayer {
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private step: number = 0;

  // Gentle pentatonic music sequence
  private melody = [
    { note: 261.63, dur: 0.4 }, // C4
    { note: 261.63, dur: 0.4 }, // C4
    { note: 293.66, dur: 0.8 }, // D4
    { note: 261.63, dur: 0.8 }, // C4
    { note: 349.23, dur: 0.8 }, // F4
    { note: 329.63, dur: 1.2 }, // E4
    { note: 261.63, dur: 0.4 }, // C4
    { note: 261.63, dur: 0.4 }, // C4
    { note: 293.66, dur: 0.8 }, // D4
    { note: 261.63, dur: 0.8 }, // C4
    { note: 392.00, dur: 0.8 }, // G4
    { note: 349.23, dur: 1.2 }, // F4
  ];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    const ctx = getAudioContext();
    if (!ctx) return;
    this.isPlaying = true;
    this.step = 0;
    this.playNextNote();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private playNextNote() {
    if (!this.isPlaying) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const current = this.melody[this.step % this.melody.length];
    
    // Play warm music box tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(current.note, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + current.dur * 0.9);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + current.dur);
    
    this.step++;
    this.timerId = window.setTimeout(() => {
      this.playNextNote();
    }, current.dur * 850);
  }
}

export const musicPlayer = new GentleMusicPlayer();
