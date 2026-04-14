function WavyLine() {
  return (
    <svg width="100" height="12" viewBox="0 0 100 12" fill="none" aria-hidden="true">
      <path
        d="M4 6 C16 2 28 10 40 6 C52 2 64 10 76 6 C88 2 94 10 96 6"
        stroke="#C4A882"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="sketchy-card border-2 border-warm-border p-8 bg-parchment-dark/40">
      <h2 className="text-3xl font-bold text-ink mb-5">{title}</h2>
      <div className="space-y-3 text-xl text-ink-mid leading-relaxed">{children}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-3">
      <span className="text-ink-light min-w-[8rem]">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

export default function Details() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-6xl font-bold text-ink mb-4">the details</h1>
          <WavyLine />
          <p className="text-xl text-ink-mid mt-4">
            everything you need to know for September 19, 2026
          </p>
        </div>

        <div className="space-y-6">
          {/* Timeline */}
          <Section title="schedule">
            <Detail label="doors open" value="4:30 pm" />
            <Detail label="ceremony" value="5:00 pm" />
            <Detail label="cocktail hour" value="5:45 pm" />
            <Detail label="reception" value="6:30 pm" />
            <Detail label="last dance" value="10:30 pm" />
          </Section>

          {/* Ceremony */}
          <Section title="ceremony">
            <Detail label="venue" value="Venue Name" />
            <Detail label="address" value="123 Street Name, City, State ZIP" />
            <Detail label="time" value="5:00 pm — please arrive by 4:45" />
          </Section>

          {/* Reception */}
          <Section title="reception">
            <Detail label="venue" value="Venue Name" />
            <Detail label="address" value="123 Street Name, City, State ZIP" />
            <Detail label="dinner" value="6:30 pm" />
            <Detail label="dancing" value="after dinner until 10:30 pm" />
          </Section>

          {/* Getting there */}
          <Section title="getting there">
            <Detail label="parking" value="Free parking available on site" />
            <Detail label="rideshare" value="Drop-off at main entrance on Street Name" />
            <p className="text-ink-light text-lg pt-1">
              we recommend rideshare so everyone can celebrate freely!
            </p>
          </Section>

          {/* Accommodations */}
          <Section title="accommodations">
            <p>
              we've reserved a room block at the hotel below — book by{" "}
              <span className="text-ink font-semibold">August 1, 2026</span> to get
              the group rate.
            </p>
            <div className="pt-2 space-y-3">
              <Detail label="hotel" value="Hotel Name" />
              <Detail label="address" value="Hotel Address, City, State" />
              <Detail label="group code" value="KIMWEDDING" />
              <Detail label="rate" value="$XXX / night" />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
