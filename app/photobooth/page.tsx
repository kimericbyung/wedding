import PhotoboothClient from "./PhotoboothClient";

export default function PhotoboothPage() {
  return (
    <div className="min-h-screen py-20 px-6 flex flex-col items-center justify-center">
      <div className="max-w-sm w-full mx-auto text-center">
        <h1 className="text-[14pt] font-semibold tracking-[0.2em] text-accent mb-3">
          photobooth
        </h1>
        <p className="text-xs tracking-[0.15em] text-ink-light font-light mb-8">
          brittaney & eric · 09.19.2026
        </p>
        <div className="w-10 h-px bg-accent mx-auto mb-12" />
        <PhotoboothClient />
      </div>
    </div>
  );
}
