import Link from "next/link";

function Sprig({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="44"
      height="90"
      viewBox="0 0 44 90"
      fill="none"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path
        d="M22 86 C20 68 24 50 22 6"
        stroke="#7A5C42"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M22 28 C14 20 4 16 6 10 C8 4 20 18 22 28Z"
        stroke="#7A9472"
        strokeWidth="1.1"
        fill="none"
      />
      <path
        d="M22 44 C30 36 40 32 38 26 C36 20 24 34 22 44Z"
        stroke="#7A9472"
        strokeWidth="1.1"
        fill="none"
      />
      <path
        d="M22 62 C14 53 4 50 6 43 C8 36 20 51 22 62Z"
        stroke="#7A9472"
        strokeWidth="1.1"
        fill="none"
      />
    </svg>
  );
}

function WavyLine() {
  return (
    <svg width="140" height="14" viewBox="0 0 140 14" fill="none" aria-hidden="true">
      <path
        d="M4 7 C20 3 32 11 50 7 C68 3 82 11 100 7 C118 3 128 11 136 7"
        stroke="#C4A882"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SmallFlower() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="1.8" stroke="#C4837A" strokeWidth="1" />
      <path d="M8 1.5 C7.2 3.5 7.2 5.5 8 7" stroke="#C4837A" strokeWidth="1" strokeLinecap="round" />
      <path d="M8 9 C7.2 10.5 7.2 12.5 8 14.5" stroke="#C4837A" strokeWidth="1" strokeLinecap="round" />
      <path d="M1.5 8 C3.5 7.2 5.5 7.2 7 8" stroke="#C4837A" strokeWidth="1" strokeLinecap="round" />
      <path d="M9 8 C10.5 7.2 12.5 7.2 14.5 8" stroke="#C4837A" strokeWidth="1" strokeLinecap="round" />
      <path d="M3.2 3.2 C4.5 4.8 5.5 5.8 6.5 6.5" stroke="#C4837A" strokeWidth="1" strokeLinecap="round" />
      <path d="M9.5 9.5 C10.5 10.5 11.5 11.5 12.8 12.8" stroke="#C4837A" strokeWidth="1" strokeLinecap="round" />
      <path d="M12.8 3.2 C11.5 4.5 10.5 5.5 9.5 6.5" stroke="#C4837A" strokeWidth="1" strokeLinecap="round" />
      <path d="M6.5 9.5 C5.5 10.5 4.5 11.5 3.2 12.8" stroke="#C4837A" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-6">
        <div className="flex items-center gap-3 mb-8">
          <SmallFlower />
          <p className="text-xl text-ink-mid">together with their families</p>
          <SmallFlower />
        </div>

        <div className="flex items-center gap-6 md:gap-12">
          <div className="hidden sm:block">
            <Sprig />
          </div>
          <div>
            <h1 className="text-7xl md:text-[7rem] font-bold text-ink leading-none">
              Brittaney
            </h1>
            <p className="text-4xl text-ink-light my-3">&amp;</p>
            <h1 className="text-7xl md:text-[7rem] font-bold text-ink leading-none">
              Eric
            </h1>
          </div>
          <div className="hidden sm:block">
            <Sprig flip />
          </div>
        </div>

        <div className="my-8">
          <WavyLine />
        </div>

        <p className="text-2xl text-ink-mid mb-1">September 19, 2026</p>
        <p className="text-xl text-ink-light mb-12">Venue Name · City, State</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/rsvp"
            className="sketchy px-10 py-3 bg-ink text-parchment text-2xl font-semibold hover:bg-ink-mid transition-colors"
          >
            rsvp
          </Link>
          <Link
            href="/registry"
            className="sketchy-alt px-10 py-3 border-2 border-warm-border text-ink-mid text-2xl font-semibold hover:border-ink-mid hover:text-ink transition-colors"
          >
            registry
          </Link>
        </div>
      </section>

      {/* Details */}
      <section className="bg-parchment-dark py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-14 flex-wrap">
            <WavyLine />
            <p className="text-2xl text-ink-mid">wedding details</p>
            <WavyLine />
          </div>
          <div className="grid md:grid-cols-2 gap-12 text-center">
            <div>
              <p className="text-xl text-ink-light mb-2">ceremony</p>
              <p className="text-4xl font-bold text-ink mb-2">5:00 pm</p>
              <p className="text-2xl text-ink-mid">Venue Name</p>
              <p className="text-xl text-ink-light">Address, City, State</p>
            </div>
            <div>
              <p className="text-xl text-ink-light mb-2">reception</p>
              <p className="text-4xl font-bold text-ink mb-2">6:30 pm</p>
              <p className="text-2xl text-ink-mid">Venue Name</p>
              <p className="text-xl text-ink-light">Address, City, State</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
