"use client";

import { useRef, useState } from "react";

interface Props {
  src: string;
  title?: string;
}

export default function AudioPlayer({ src, title = "our song" }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    playing ? a.pause() : a.play();
    setPlaying(!playing);
  }

  function onTimeUpdate() {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    setCurrentTime(a.currentTime);
    setProgress(a.currentTime / a.duration);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const a = audioRef.current;
    const bar = barRef.current;
    if (!a || !bar || !a.duration) return;
    const { left, width } = bar.getBoundingClientRect();
    a.currentTime = Math.max(0, Math.min(1, (e.clientX - left) / width)) * a.duration;
  }

  function fmt(t: number) {
    const m = Math.floor(t / 60);
    const s = String(Math.floor(t % 60)).padStart(2, "0");
    return `${m}:${s}`;
  }

  const pct = `${progress * 100}%`;

  return (
    <div className="w-full max-w-sm mx-auto mt-6 mb-2">
      {/* Hidden SVG filter definition */}
      <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
        <defs>
          <filter id="sketchy-player" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence type="turbulence" baseFrequency="0.038" numOctaves="3" seed="9" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }}
      />

      {/* Player shell — filter makes everything look hand-drawn */}
      <div
        style={{ filter: "url(#sketchy-player)" }}
        className="border-2 border-ink/60 rounded-[2rem] px-5 py-4 bg-parchment flex items-center gap-4"
      >

        {/* Play / Pause button */}
        <button
          onClick={toggle}
          aria-label={playing ? "pause" : "play"}
          className="shrink-0 text-accent hover:text-accent/70 transition-colors"
        >
          <svg viewBox="0 0 44 44" width="42" height="42" fill="none">
            {/* Hand-drawn circle */}
            <path
              d="M 22,4 C 32,4 40,12 40,22 C 40,32 32,40 22,40 C 12,40 4,32 4,22 C 4,12 12,4 22,4 Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {playing ? (
              /* Pause — two slightly uneven bars */
              <>
                <rect x="14" y="14" width="5" height="16" rx="1.5" fill="currentColor" />
                <rect x="25" y="14" width="5" height="16" rx="1.5" fill="currentColor" />
              </>
            ) : (
              /* Play — slightly off-center triangle */
              <path d="M 17,13 L 17,31 L 32,22 Z" fill="currentColor" />
            )}
          </svg>
        </button>

        {/* Middle: title + scrubber + waveform */}
        <div className="flex-1 min-w-0">
          {/* Title + waveform decoration */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs tracking-[0.12em] text-ink-light font-light truncate pr-2">
              {title}
            </p>
            {/* Mini waveform doodle */}
            <svg viewBox="0 0 30 14" width="30" height="14" className="shrink-0 text-accent/50">
              <line x1="2"  y1="10" x2="2"  y2="5"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="6"  y1="11" x2="6"  y2="3"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="10" y1="9"  x2="10" y2="2"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="14" y1="11" x2="14" y2="4"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="18" y1="10" x2="18" y2="6"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="22" y1="12" x2="22" y2="3"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="26" y1="9"  x2="26" y2="5"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Progress bar */}
          <div
            ref={barRef}
            onClick={seek}
            className="relative h-5 flex items-center cursor-pointer"
          >
            {/* Track */}
            <div className="w-full h-[1.5px] bg-warm-border rounded-full" />
            {/* Filled */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-accent rounded-full"
              style={{ width: pct }}
            />
            {/* Scrubber dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent"
              style={{ left: `calc(${pct} - 6px)` }}
            />
          </div>
        </div>

        {/* Time */}
        <p className="shrink-0 text-xs text-ink-light font-light tabular-nums w-8 text-right">
          {duration > 0 ? fmt(currentTime) : "—"}
        </p>
      </div>
    </div>
  );
}
