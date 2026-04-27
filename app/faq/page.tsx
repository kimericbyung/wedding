"use client";

import { useState } from "react";

const faqs = [
  {
    q: "when should i arrive?",
    a: "please arrive by 4:00 pm",
  },
  {
    q: "is there parking at the venue?",
    a: "yes! free parking is available on site. we do encourage rideshare so everyone can celebrate without worrying about driving.",
  },
  {
    q: "are uninvited children welcome?",
    a: "no",
  },
  {
    q: "can i bring a plus one?",
    a: "probably no",
  },
  {
    q: "i have dietary restrictions — will there be options for me?",
    a: "absolutely. when you rsvp, please note any dietary restrictions in the notes field and we'll make sure you're taken care of.",
  },
  {
    q: "will the ceremony be indoors or outdoors?",
    a: "the ceremony will be held outdoors. the reception will be covered outdoors. we recommend wearing layers and choosing shoes that work on grass!",
  },
  {
    q: "can i take photos during the ceremony?",
    a: "please put phones and cameras away so you can be fully present with us. our photographer will capture everything! you're welcome to snap away at the reception.",
  },
  {
    q: "what if i need to change my rsvp?",
    a: "life happens! please reach out to us directly if you need to update your response, ideally before august 1, 2026.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-warm-border last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
      >
        <span className="text-[14pt] font-semibold text-accent group-hover:text-accent/80 transition-colors">
          {q}
        </span>
        <span
          className={`shrink-0 text-accent text-lg leading-none mt-0.5 transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <p className="text-sm text-ink-mid font-light leading-relaxed pb-5 pr-8">
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-[14pt] font-semibold tracking-[0.2em] text-accent mb-4">faq</h1>
          <div className="w-10 h-px bg-accent mx-auto" />
          <p className="text-sm text-ink-light font-light mt-5">
            got questions? we've got answers. if yours isn't here, just reach out!
          </p>
        </div>

        <div className="border border-warm-border px-8">
          {faqs.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </div>
  );
}
