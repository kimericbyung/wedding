"use client";

import { useState } from "react";

const faqs = [
  {
    q: "when should I arrive?",
    a: "please arrive by 4:45 pm — the ceremony begins at 5:00 pm sharp and we don't want you to miss a thing!",
  },
  {
    q: "is there parking at the venue?",
    a: "yes! free parking is available on site. we do encourage rideshare so everyone can celebrate without worrying about driving.",
  },
  {
    q: "are children welcome?",
    a: "we love your little ones, but we've designed this as an adults-only evening so everyone can relax and enjoy. we hope you can make it a night out!",
  },
  {
    q: "can I bring a plus one?",
    a: "due to venue capacity, we're only able to accommodate guests who are listed on the invitation. if you have questions, please reach out to us directly.",
  },
  {
    q: "I have dietary restrictions — will there be options for me?",
    a: "absolutely. when you rsvp, please note any dietary restrictions in the notes field and we'll make sure you're taken care of.",
  },
  {
    q: "will the ceremony be indoors or outdoors?",
    a: "the ceremony will be held outdoors. the reception will move inside. we recommend wearing layers and choosing shoes that work on grass!",
  },
  {
    q: "is there a shuttle between the hotel and venue?",
    a: "we're working on arranging a shuttle — details will be shared closer to the date. in the meantime, rideshare is easy from the hotel block.",
  },
  {
    q: "can I take photos during the ceremony?",
    a: "we're having an unplugged ceremony — please put phones and cameras away so you can be fully present with us. our photographer will capture everything! you're welcome to snap away at the reception.",
  },
  {
    q: "what if I need to change my rsvp?",
    a: "life happens! please reach out to us directly if you need to update your response, ideally before August 1, 2026.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b-2 border-warm-border/60 last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
      >
        <span className="text-2xl font-semibold text-ink group-hover:text-ink-mid transition-colors">
          {q}
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={`shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
          aria-hidden="true"
        >
          {/* hand-drawn plus/x */}
          <path
            d="M12 4 C11.5 8 11.5 10 12 20"
            stroke="#7A5C42"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M4 12 C8 11.5 10 11.5 20 12"
            stroke="#7A5C42"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && (
        <p className="text-xl text-ink-mid leading-relaxed pb-5 pr-8">{a}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-6xl font-bold text-ink mb-4">faq</h1>
          <p className="text-xl text-ink-mid">
            got questions? we've got answers. if yours isn't here, just reach out!
          </p>
        </div>

        <div className="sketchy-card border-2 border-warm-border p-8 bg-parchment-dark/40">
          {faqs.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </div>
  );
}
