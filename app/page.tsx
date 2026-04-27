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
          jardin del sol &middot; snohomish, wa
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/rsvp" className="opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="/rsvp-button.png"
              alt="rsvp"
              width={400}
              height={120}
              className="h-12 w-auto"
            />
          </Link>
          <Link href="/registry" className="opacity-90 hover:opacity-100 transition-opacity">
            <Image
              src="/registry-button.png"
              alt="registry"
              width={400}
              height={120}
              className="h-12 w-auto"
            />
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
              <p className="text-2xl font-light text-ink mb-2">4:30 pm</p>
              <p className="text-sm text-ink-mid font-light">jardin del sol</p>
              <p className="text-sm text-ink-light font-light">10522 52nd street se snohomish, wa 98290</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] lowercase text-ink-light font-normal mb-4">
                rsvp deadline
              </p>
              <p className="text-2xl font-light text-ink mb-2">july 15th, 2026</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
