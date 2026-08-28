"use client";

import { useState, useEffect } from "react";

type Phase = "idle" | "countdown" | "capturing" | "done" | "error";

export default function PhotoboothClient() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [countdown, setCountdown] = useState(3);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown === 0) {
      void triggerCapture();
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  function startCountdown() {
    setPhase("countdown");
    setCountdown(3);
    setPhotoUrl(null);
    setErrorMsg("");
  }

  async function triggerCapture() {
    setPhase("capturing");
    try {
      const res = await fetch("/api/photobooth/request", { method: "POST" });
      const { id, error } = await res.json();
      if (!res.ok) throw new Error(error ?? "Failed to request photo");
      await pollUntilDone(id);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
      setPhase("error");
    }
  }

  async function pollUntilDone(id: string) {
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 1000));
      const res = await fetch(`/api/photobooth/status?id=${id}`);
      const data = await res.json();
      if (data.status === "done" && data.image_url) {
        setPhotoUrl(data.image_url);
        setPhase("done");
        return;
      }
      if (data.status === "error") throw new Error("Camera error. Please try again.");
    }
    throw new Error("Camera timed out. Please try again.");
  }

  async function savePhoto() {
    if (!photoUrl) return;
    try {
      const blob = await fetch(photoUrl).then((r) => r.blob());
      const file = new File([blob], "photobooth.jpg", { type: "image/jpeg" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "Brittaney & Eric Photobooth" });
      } else {
        // Fallback: regular download
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "photobooth.jpg";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      // User cancelled the share sheet — no action needed
    }
  }

  if (phase === "done" && photoUrl) {
    return (
      <div className="w-full">
        <img
          src={photoUrl}
          alt="your photo"
          className="w-full border border-warm-border mb-8"
        />
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={savePhoto}
            className="text-xs tracking-[0.2em] text-accent font-semibold border border-accent px-8 py-4 hover:bg-accent/5 transition-colors"
          >
            save photo
          </button>
          <button
            onClick={startCountdown}
            className="text-xs tracking-[0.2em] text-ink-light border border-warm-border px-8 py-4 hover:border-ink hover:text-ink transition-colors"
          >
            take another
          </button>
        </div>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="text-center">
        <p className="text-sm text-rose mb-8 font-light">{errorMsg}</p>
        <button
          onClick={startCountdown}
          className="text-xs tracking-[0.2em] text-ink-light border border-warm-border px-8 py-4 hover:border-ink hover:text-ink transition-colors"
        >
          try again
        </button>
      </div>
    );
  }

  if (phase === "countdown") {
    return (
      <div className="text-center">
        <p className="text-[120px] font-light text-accent leading-none tabular-nums">
          {countdown}
        </p>
        <p className="text-xs tracking-[0.4em] text-ink-light font-light mt-6 animate-pulse">
          smile!
        </p>
      </div>
    );
  }

  if (phase === "capturing") {
    return (
      <div className="text-center">
        <p className="text-6xl mb-6">📸</p>
        <p className="text-xs tracking-[0.3em] text-ink-light font-light animate-pulse">
          capturing…
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={startCountdown}
      className="w-full border border-warm-border py-10 text-sm tracking-[0.3em] text-ink font-light hover:border-ink transition-colors active:bg-parchment-dark"
    >
      take photo
    </button>
  );
}
