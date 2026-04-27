import Image from "next/image";

function AccentRule() {
  return <div className="w-10 h-px bg-accent mx-auto" />;
}

function Divider() {
  return <div className="w-full h-px bg-warm-border my-16" />;
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-[14pt] font-semibold tracking-[0.2em] text-accent">
        {title}
      </h2>
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <li className="flex gap-3 justify-center">
      <span className="text-accent shrink-0">—</span>
      <span>{text}</span>
    </li>
  );
}

export default function WhatToWear() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <Image
            src="/what-to-wear.png"
            alt="what to wear"
            width={1536}
            height={1024}
            unoptimized
            priority
            className="w-80 md:w-96 h-auto"
          />
        </div>

        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-[14pt] font-semibold tracking-[0.2em] text-accent mb-4">
            what to wear
          </h1>
          <AccentRule />
          <p className="text-sm font-semibold tracking-[0.2em] lowercase text-accent mt-5">
            garden formal
          </p>
          <p className="text-sm text-ink-mid font-light mt-3 max-w-md mx-auto leading-relaxed">
            the entire evening is outdoors — ceremony in the open air, reception under a covered space. dress elegantly, dress comfortably, and plan for the elements.
          </p>
        </div>

        {/* Section 1: Colors */}
        <section className="text-center">
          <SectionHeader title="come in any colors!" />
          <p className="text-sm text-ink-mid font-light leading-relaxed max-w-md mx-auto">
            wear whatever colors make you feel great — the more the merrier. the only exception: please skip white and ivory, that's the bride's moment to shine.
          </p>
        </section>

        <Divider />

        {/* Section 2: Ladies */}
        <section className="text-center">
          <SectionHeader title="ladies" />
          <p className="text-sm text-ink-mid font-light leading-relaxed max-w-md mx-auto mb-8">
            the entire evening is outdoors — the ceremony is open air and the reception is covered but still outside. dress for fresh air and bring a layer for when the sun goes down.
          </p>
          <ul className="space-y-3 text-sm text-ink font-light max-w-sm mx-auto">
            <Bullet text="skip stilettos or thin heels — the ceremony is on grass" />
            <Bullet text="bring a wrap or light layer for the evening breeze" />
            <Bullet text="no white, ivory, or anything that could be mistaken for bridal" />
          </ul>
        </section>

        <Divider />

        {/* Section 3: Gentlemen */}
        <section className="text-center">
          <SectionHeader title="gentlemen" />
          <p className="text-sm text-ink-mid font-light leading-relaxed max-w-md mx-auto mb-8">
            the whole evening is outside — ceremony in the open air, reception under cover. a jacket or layer will go a long way as the night cools down.
          </p>
          <ul className="space-y-3 text-sm text-ink font-light max-w-sm mx-auto">
            <Bullet text="leave the sneakers at home" />
            <Bullet text="a jacket or blazer doubles as style and warmth for the evening" />
            <Bullet text="no need to go black tie — keep it fun and comfortable" />
          </ul>
        </section>

      </div>
    </div>
  );
}
