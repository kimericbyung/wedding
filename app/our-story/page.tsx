import Image from "next/image";
import AudioPlayer from "../components/AudioPlayer";

const milestones = [
  {
    date: "some time ago",
    body: "brittaney and eric met at a party. brittaney came with her brother derek, eric thought they were dating.  turns out they were siblings.",
  },
  {
    date: "after a few more chapters",
    body: "they met again, this time at a night market.  denying the sparks in the air would be like denying the earth is round.  nonesense.",
  },
  {
    date: "and so it began",
    body: "living 5 minutes apart, the two began their surreptitious relationship.",
  },
  {
    date: "what started as a casual courtship",
    body: "blossomed into a full on relationship.  brittaney and eric made it official on july 3rd, 2023, so they could always enjoy the next day together."
  },
  {
    date: "after truly getting to know each other",
    body: "eric proposed to brittaney on aug 15th, 2025",
  },
  {
    date: "september 19, 2026",
    body: "and now we begin the next chapter.",
  },
];

export default function OurStory() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src="/our-story-ramen.gif"
            alt="our story"
            width={1536}
            height={1024}
            unoptimized
            priority
            className="w-80 md:w-96 h-auto"
          />
          <AudioPlayer src="https://res.cloudinary.com/dqrjnwkpu/video/upload/v1777260384/Out_Getting_Ribs_obmopm.mp3" title="out getting ribs - king krule" />
        </div>

        <div className="mt-16">
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
              <div key={m.date} className={i > 0 ? "mt-14" : ""}>
                <div className={alignment}>
                  <p className="text-xs tracking-[0.35em] uppercase text-accent font-semibold mb-3">
                    {m.date}
                  </p>
                  <p className="text-sm text-ink-mid font-light leading-relaxed">
                    {m.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
