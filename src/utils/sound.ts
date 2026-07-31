// Web Audio API Macbook Magic Keyboard Sound Synthesizer

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playMacbookClickSound(key?: string) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const isSpace = key === " " || key === "Space";
    const isBackspace = key === "Backspace" || key === "delete";
    const isEnter = key === "Enter";

    // 1. High transient click noise burst (snappy keycap tactile click)
    const bufferSize = Math.floor(ctx.sampleRate * 0.015); // 15ms burst
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = isSpace
      ? 1800
      : isBackspace || isEnter
      ? 2400
      : 3400 + Math.random() * 300;
    filter.Q.value = 3.5;

    const noiseGain = ctx.createGain();
    const noiseVol = isSpace ? 0.3 : 0.22;
    noiseGain.gain.setValueAtTime(noiseVol, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.015);

    // 2. Low tactile body thump (MacBook aluminum chassis thud)
    const osc = ctx.createOscillator();
    osc.type = "sine";
    const startFreq = isSpace
      ? 130
      : isBackspace || isEnter
      ? 170
      : 210 + Math.random() * 15;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.02);

    const oscGain = ctx.createGain();
    const oscVol = isSpace ? 0.35 : 0.2;
    oscGain.gain.setValueAtTime(oscVol, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.022);
  } catch {
    // Gracefully handle browser audio restrictions
  }
}
