function AccentRule() {
  return <div className="w-10 h-px bg-accent mx-auto" />;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-warm-border p-8">
      <h2 className="text-xs tracking-[0.3em] lowercase text-accent font-semibold mb-5">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <span className="text-xs tracking-wide lowercase text-ink-light font-normal min-w-[9rem]">
        {label}
      </span>
      <span className="text-sm text-ink font-light">{value}</span>
    </div>
  );
}

export default function Details() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-[14pt] font-semibold tracking-[0.2em] text-accent mb-4">
            the details
          </h1>
          <AccentRule />
          <p className="text-sm text-ink-light font-light mt-5">
            everything you need to know for september 19, 2026
          </p>
        </div>

        <div className="space-y-4">
          <Section title="schedule">
            <Detail label="doors open" value="4:30 pm" />
            <Detail label="ceremony" value="5:00 pm" />
            <Detail label="cocktail hour" value="5:45 pm" />
            <Detail label="reception" value="6:30 pm" />
            <Detail label="last dance" value="10:30 pm" />
          </Section>

          <Section title="ceremony">
            <Detail label="venue" value="venue name" />
            <Detail label="address" value="123 street name, city, state zip" />
            <Detail label="time" value="5:00 pm — please arrive by 4:45" />
          </Section>

          <Section title="reception">
            <Detail label="venue" value="venue name" />
            <Detail label="address" value="123 street name, city, state zip" />
            <Detail label="dinner" value="6:30 pm" />
            <Detail label="dancing" value="after dinner until 10:30 pm" />
          </Section>

          <Section title="getting there">
            <Detail label="parking" value="free parking available on site" />
            <Detail label="rideshare" value="drop-off at main entrance on street name" />
            <p className="text-sm text-ink-light font-light pt-1">
              we recommend rideshare so everyone can celebrate freely!
            </p>
          </Section>

          <Section title="accommodations">
            <p className="text-sm text-ink font-light mb-4">
              we've reserved a room block at the hotel below — book by{" "}
              <span className="text-ink font-normal">august 1, 2026</span> to
              get the group rate.
            </p>
            <Detail label="hotel" value="hotel name" />
            <Detail label="address" value="hotel address, city, state" />
            <Detail label="group code" value="KIMWEDDING" />
            <Detail label="rate" value="$xxx / night" />
          </Section>
        </div>
      </div>
    </div>
  );
}
