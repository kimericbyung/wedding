import Link from "next/link";
import Image from "next/image";

function AccentRule() {
  return <div className="w-10 h-px bg-accent mx-auto" />;
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs tracking-[0.4em] lowercase text-ink-light font-normal mb-10">
          together with their families
        </p>

        <Image
          src="/animated-logo.gif"
          alt="Brittaney & Eric"
          width={1536}
          height={1024}
          unoptimized
          priority
          className="w-80 md:w-96 h-auto"
        />

        <div className="my-8">
          <AccentRule />
        </div>

        <p className="text-xs tracking-[0.4em] lowercase text-ink-mid font-normal mb-2">
          september 19, 2026
        </p>
        <p className="text-sm text-ink-light font-light mb-12">
          venue name &middot; city, state
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/rsvp"
            className="px-8 py-3 bg-accent text-white text-xs tracking-[0.25em] lowercase font-normal hover:bg-accent/85 transition-colors"
          >
            rsvp
          </Link>
          <Link
            href="/registry"
            className="px-8 py-3 border border-ink text-ink text-xs tracking-[0.25em] lowercase font-normal hover:bg-ink hover:text-parchment transition-colors"
          >
            registry
          </Link>
        </div>
      </section>

      {/* Wedding Details */}
      <section className="bg-parchment-dark py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <AccentRule />
            <p className="text-[14pt] font-semibold text-accent mt-6">
              wedding details
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 text-center">
            <div>
              <p className="text-xs tracking-[0.3em] lowercase text-ink-light font-normal mb-4">
                ceremony
              </p>
              <p className="text-2xl font-light text-ink mb-2">5:00 pm</p>
              <p className="text-sm text-ink-mid font-light">venue name</p>
              <p className="text-sm text-ink-light font-light">address, city, state</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] lowercase text-ink-light font-normal mb-4">
                reception
              </p>
              <p className="text-2xl font-light text-ink mb-2">6:30 pm</p>
              <p className="text-sm text-ink-mid font-light">venue name</p>
              <p className="text-sm text-ink-light font-light">address, city, state</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
