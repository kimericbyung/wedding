import Image from "next/image";

const milestones = [
  {
    date: "month year",
    body: "Share the story of how you two first crossed paths — where you were, what happened, and what you remember most about that moment.",
  },
  {
    date: "month year",
    body: "Tell us about your first date — where you went, what you talked about, and when you knew there was something worth pursuing.",
  },
  {
    date: "month year",
    body: "Describe the moment you two decided to become a couple and what that felt like.",
  },
  {
    date: "month year",
    body: "A favorite memory, trip, or chapter in your relationship that defined who you are as a couple.",
  },
  {
    date: "month year",
    body: "Tell the proposal story — all the details, the nerves, the surprise (or not!), and the moment everything changed.",
  },
  {
    date: "september 19, 2026",
    body: "And now we begin the next chapter.",
  },
];

export default function OurStory() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src="/animated-our-story-2.gif"
            alt="our story"
            width={1536}
            height={1024}
            unoptimized
            priority
            className="w-80 md:w-96 h-auto"
          />
        </div>

        <div>
          {milestones.map((m, i) => {
            // i === 0: centered
            // i odd:  block starts at center → left edge at 50% (right half), text-left
            // i even (>0): block ends at center → right edge at 50% (left half), text-right
            const alignment =
              i === 0
                ? "text-center"
                : i % 2 === 1
                ? "ml-[50%] text-center"
                : "mr-[50%] text-center";

            return (
              <div key={m.date}>
                <div className={alignment}>
                  <p className="text-xs tracking-[0.35em] uppercase text-accent font-semibold mb-3">
                    {m.date}
                  </p>
                  <p className="text-sm text-ink-mid font-light leading-relaxed">
                    {m.body}
                  </p>
                </div>
                {i < milestones.length - 1 && (
                  <div className="w-px h-16 bg-warm-border mx-auto my-10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
