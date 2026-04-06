import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-10">
          Together with their families
        </p>
        <h1 className="text-6xl md:text-8xl font-light text-neutral-900 tracking-tight">
          Brittaney
        </h1>
        <p className="text-2xl text-stone-300 font-light my-4">&</p>
        <h1 className="text-6xl md:text-8xl font-light text-neutral-900 tracking-tight">
          Eric
        </h1>
        <div className="w-px h-16 bg-stone-200 my-10" />
        <p className="text-sm tracking-[0.3em] uppercase text-stone-500 mb-2">
          September 19, 2026
        </p>
        <p className="text-stone-400 text-sm mb-12">
          Venue Name &middot; City, State
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/rsvp"
            className="px-10 py-3 bg-neutral-900 text-white text-xs tracking-[0.2em] uppercase hover:bg-neutral-700 transition-colors"
          >
            RSVP
          </Link>
          <Link
            href="/registry"
            className="px-10 py-3 border border-stone-200 text-stone-500 text-xs tracking-[0.2em] uppercase hover:border-stone-400 hover:text-stone-700 transition-colors"
          >
            Registry
          </Link>
        </div>
      </section>

      {/* Wedding Details */}
      <section className="bg-stone-50 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 text-center mb-16">
            Wedding Details
          </p>
          <div className="grid md:grid-cols-2 gap-12 text-center">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4">
                Ceremony
              </p>
              <p className="text-xl font-light text-neutral-800 mb-2">5:00 PM</p>
              <p className="text-stone-500 text-sm">Venue Name</p>
              <p className="text-stone-400 text-sm">Address, City, State</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4">
                Reception
              </p>
              <p className="text-xl font-light text-neutral-800 mb-2">6:30 PM</p>
              <p className="text-stone-500 text-sm">Venue Name</p>
              <p className="text-stone-400 text-sm">Address, City, State</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
