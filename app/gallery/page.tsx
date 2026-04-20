function AccentRule() {
  return <div className="w-10 h-px bg-accent mx-auto" />;
}

export default function Gallery() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-[14pt] font-semibold tracking-[0.2em] text-accent mb-4">
            gallery
          </h1>
          <AccentRule />
          <p className="text-sm text-ink-light font-light mt-5">
            moments from our journey together
          </p>
        </div>

        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid border border-warm-border bg-parchment-dark aspect-square flex items-center justify-center"
            >
              <span className="text-xs text-ink-light font-light tracking-wide">
                photo {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
