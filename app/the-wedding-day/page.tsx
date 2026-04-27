import Image from "next/image";

type Detail = { label: string; value: string };
type Section = {
  label: string;
  heading: string;
  details: Detail[];
  image?: string;
};

const sections: Section[] = [
  {
    label: "september 19, 2026",
    heading: "schedule",
    details: [
      { label: "doors open", value: "4:00 pm" },
      { label: "ceremony", value: "4:30 pm" },
      { label: "cocktail hour", value: "5:00 pm" },
      { label: "reception", value: "6:00 pm" },
      { label: "last dance", value: "10:00 pm" },
    ],
  },
  {
    label: "4:30 pm",
    heading: "ceremony",
    details: [
      { label: "venue", value: "jardin del sol" },
      { label: "address", value: "10522 52nd street se, snohomish, wa 98290" },
      { label: "note", value: "please arrive by 4:00 pm" },
    ],
    image: "/ceremony.png",
  },
  {
    label: "5:00 pm",
    heading: "cocktail hour",
    details: [
      { label: "photobooth", value: "until 6:00 pm" },
      { label: "drinks", value: "until 10:00 pm" },
    ],
    image: "/cocktail-hour.png",
  },
  {
    label: "6:00 pm",
    heading: "reception",
    details: [
      { label: "dinner", value: "6:30 pm" },
      { label: "dancing", value: "after dinner until 10:00 pm" },
    ],
    image: "/reception.png"
  },
];

function SectionDetails({ s }: { s: Section }) {
  return (
    <div className="text-center">
      <p className="text-xs tracking-[0.35em] uppercase text-accent font-semibold mb-3">
        {s.label}
      </p>
      <h2 className="text-[14pt] font-semibold text-ink mb-4">{s.heading}</h2>
      <div className="space-y-1">
        {s.details.map((d) => (
          <p key={d.label} className="text-sm text-ink-mid font-light leading-relaxed">
            <span className="text-ink-light">{d.label}</span>
            {" — "}
            {d.value}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function TheWeddingDay() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <Image
            src="/wedding-band-3.gif"
            alt="the wedding day"
            width={1536}
            height={1024}
            unoptimized
            priority
            className="w-80 md:w-96 h-auto"
          />
        </div>

        <div>
          {sections.map((s, i) => {
            const isOdd = i % 2 === 1;
            const mt = i > 0 ? "mt-14" : "";

            if (s.image) {
              // Two-column: odd → image left, details right; even → details left, image right
              return (
                <div key={s.heading} className={`flex flex-col md:flex-row gap-10 items-center ${mt}`}>
                  {isOdd ? (
                    <>
                      <div className="w-full md:w-1/2">
                        <Image src={s.image} alt={s.heading} width={800} height={600} className="w-full h-auto" />
                      </div>
                      <div className="w-full md:w-1/2">
                        <SectionDetails s={s} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full md:w-1/2">
                        <SectionDetails s={s} />
                      </div>
                      <div className="w-full md:w-1/2">
                        <Image src={s.image} alt={s.heading} width={800} height={600} className="w-full h-auto" />
                      </div>
                    </>
                  )}
                </div>
              );
            }

            // No image — alternating half-width layout
            const alignment =
              i === 0
                ? "text-center" : i === 3 ? "text-center"
                : isOdd
                ? "ml-[50%] text-center"
                : "mr-[50%] text-center";

            return (
              <div key={s.heading} className={mt}>
                <div className={alignment}>
                  <SectionDetails s={s} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
