/**
 * Disco Elysium Web Audio API Soundtrack Synthesizer
 * Generates a moody ambient / synthwave track reminiscent of Revachol / Whirling-in-Rags theme.
 */

class DiscoAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.analyser = null;
    this.masterGain = null;
    this.intervalId = null;
    this.step = 0;
    this.startTime = 0;

    // Disco Elysium / Whirling-in-Rags chord progression (Am - F - C - G / Dm)
    this.chords = [
      [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
      [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
      [130.81, 164.81, 196.00, 246.94], // Cmaj7 (C3, E3, G3, B3)
      [146.83, 174.61, 220.00, 261.63]  // Dm7 (D3, F3, A3, C4)
    ];

    this.bassNotes = [110.00, 87.31, 65.41, 73.42]; // A2, F2, C2, D2
    this.melodyNotes = [
      440.00, 523.25, 659.25, 587.33,
      440.00, 392.00, 329.63, 392.00,
      523.25, 659.25, 783.99, 659.25,
      587.33, 523.25, 440.00, 392.00
    ];
  }

  init() {
    if (this.audioCtx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioCtx();

    // Master Gain & Analyser
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.value = 0.35;

    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 64;

    // Delay Node for atmospheric soundscape
    this.delayNode = this.audioCtx.createDelay();
    this.delayNode.delayTime.value = 0.375; // 3/8 delay tempo

    this.delayFeedback = this.audioCtx.createGain();
    this.delayFeedback.gain.value = 0.4;

    this.delayFilter = this.audioCtx.createBiquadFilter();
    this.delayFilter.type = 'lowpass';
    this.delayFilter.frequency.value = 1200;

    // Delay Loop Routing
    this.delayNode.connect(this.delayFilter);
    this.delayFilter.connect(this.delayFeedback);
    this.delayFeedback.connect(this.delayNode);
    this.delayNode.connect(this.masterGain);

    // Filter Node
    this.filterNode = this.audioCtx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.value = 800;

    this.filterNode.connect(this.masterGain);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
  }

  start() {
    this.init();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.isPlaying = true;
    this.startTime = Date.now();
    this.step = 0;

    // Schedule loop
    this.playStep();
    this.intervalId = setInterval(() => this.playStep(), 1500); // 1.5 seconds per bar beat
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  playStep() {
    if (!this.isPlaying || !this.audioCtx) return;

    const chordIndex = Math.floor(this.step / 2) % this.chords.length;
    const chord = this.chords[chordIndex];
    const bass = this.bassNotes[chordIndex];
    const now = this.audioCtx.currentTime;

    // 1. Warm Analog Synth Pad (Chord)
    chord.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() * 0.8 - 0.4), now); // slight detune

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

      osc.connect(gain);
      gain.connect(this.filterNode);
      gain.connect(this.delayNode);

      osc.start(now);
      osc.stop(now + 3.0);
    });

    // 2. Sub-bass Drone
    const bassOsc = this.audioCtx.createOscillator();
    const bassGain = this.audioCtx.createGain();
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(bass, now);

    bassGain.gain.setValueAtTime(0, now);
    bassGain.gain.linearRampToValueAtTime(0.18, now + 0.2);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 2.9);

    bassOsc.connect(bassGain);
    bassGain.connect(this.masterGain);

    bassOsc.start(now);
    bassOsc.stop(now + 3.0);

    // 3. Melodic Horn / Synth Lead (Disco Elysium Whirling Horn feel)
    if (this.step % 2 === 0 || Math.random() > 0.3) {
      const melNote = this.melodyNotes[this.step % this.melodyNotes.length];
      const leadOsc = this.audioCtx.createOscillator();
      const leadGain = this.audioCtx.createGain();
      const leadFilter = this.audioCtx.createBiquadFilter();

      leadOsc.type = 'sawtooth';
      leadOsc.frequency.setValueAtTime(melNote, now);

      leadFilter.type = 'lowpass';
      leadFilter.frequency.setValueAtTime(600, now);
      leadFilter.frequency.exponentialRampToValueAtTime(1600, now + 0.4);
      leadFilter.frequency.exponentialRampToValueAtTime(500, now + 1.4);

      leadGain.gain.setValueAtTime(0, now);
      leadGain.gain.linearRampToValueAtTime(0.08, now + 0.2);
      leadGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      leadOsc.connect(leadFilter);
      leadFilter.connect(leadGain);
      leadGain.connect(this.masterGain);
      leadGain.connect(this.delayNode);

      leadOsc.start(now);
      leadOsc.stop(now + 1.6);
    }

    // 4. Soft Vinyl Crackle / Rain noise
    this.playVinylCrackle(now);

    this.step++;
  }

  playVinylCrackle(now) {
    const bufferSize = this.audioCtx.sampleRate * 0.1;
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() < 0.015 ? (Math.random() * 2 - 1) * 0.15 : (Math.random() * 2 - 1) * 0.01;
    }

    const noise = this.audioCtx.createBufferSource();
    noise.buffer = buffer;

    const noiseGain = this.audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.015, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    noise.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(now);
  }

  getElapsedTime() {
    if (!this.isPlaying) return '00:00';
    const elapsedSec = Math.floor((Date.now() - this.startTime) / 1000);
    const mins = Math.floor(elapsedSec / 60).toString().padStart(2, '0');
    const secs = (elapsedSec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
}

export const audioEngine = new DiscoAudioEngine();
