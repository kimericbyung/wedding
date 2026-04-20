import Image from "next/image";

const colors = [
  {
    label: "sage green",
    hex: "rgba(186, 194, 172, 255)"
  },
  {
    label: "mustard yellow",
    hex: "rgba(207, 173, 99, 255)"
  },  {
    label: "olive green",
    hex: "rgba(140, 142, 116, 255)"
  },  {
    label: "dusty rose",
    hex: "rgba(216, 178, 177, 255)"
  },  {
    label: "mist blue",
    hex: "rgba(162, 183, 191, 255)"
  },  {
    label: "warm stone",
    hex: "rgba(178, 161, 146, 255)"
  },
];

function parseRgb(rgba: string): [number, number, number] {
  const m = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return m ? [+m[1], +m[2], +m[3]] : [0, 0, 0];
}

function toCss(rgba: string) {
  const [r, g, b] = parseRgb(rgba);
  return `rgb(${r},${g},${b})`;
}

function blend(a: string, b: string) {
  const [r1, g1, b1] = parseRgb(a);
  const [r2, g2, b2] = parseRgb(b);
  return `rgb(${Math.round((r1 + r2) / 2)},${Math.round((g1 + g2) / 2)},${Math.round((b1 + b2) / 2)})`;
}

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

function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="w-full h-full min-h-64 border border-warm-border bg-parchment-dark flex items-center justify-center">
      <span className="text-xs text-ink-light font-light tracking-wide">{label}</span>
    </div>
  );
}

export default function WhatToWear() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
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
            think elegant but comfortable — we're celebrating outside and want
            everyone to feel their best.
          </p>
        </div>

        {/* Section 1: Colors */}
        <section>
          <SectionHeader title="come in these colors" />
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              src="/color-palette-2.png"
              alt="color palette"
              width={1200}
              height={800}
              className="w-80 md:w-96 h-auto block"
            />
          </div>
          <div className="flex flex-wrap justify-center items-center mt-5 gap-y-1">
            {colors.map((c, i) => (
              <span key={c.label} className="flex items-center">
                <span className="text-xs font-light" style={{ color: toCss(c.hex) }}>
                  {c.label}
                </span>
                {i < colors.length - 1 && (
                  <span
                    className="mx-2 text-sm"
                    style={{ color: blend(c.hex, colors[i + 1].hex) }}
                  >
                    &middot;
                  </span>
                )}
              </span>
            ))}
          </div>
        </section>

        <Divider />

        {/* Section 2: Ladies — image left, description right */}
        <section>
          <SectionHeader title="ladies" />
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-1/2">
              <Image
                src="/womensware.png"
                alt="ladies attire"
                width={1536}
                height={1024}
                unoptimized
                priority
                className="w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-sm text-ink-mid font-light leading-relaxed mb-5">
                think elegant and comfortable — we're celebrating outside and want you to feel your best all night long.
              </p>
              <ul className="space-y-3 text-sm text-ink font-light">
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">—</span>
                  floor-length or midi dress, or a dressy jumpsuit
                </li>
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">—</span>
                  wedges or block heels work best on grass
                </li>
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">—</span>
                  a wrap or light jacket for the evening breeze
                </li>
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">—</span>
                  avoid white, ivory, or champagne — that's the bride!
                </li>
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">—</span>
                  skip stilettos or thin heels — the ceremony is on grass
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Divider />

        {/* Section 3: Gentlemen — description left, image right */}
        <section>
          <SectionHeader title="gentlemen" />
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-1/2 md:order-1">
              <p className="text-sm text-ink-mid font-light leading-relaxed mb-5">
                classic and polished — you'll be celebrating indoors and out, so dress for a great night.
              </p>
              <ul className="space-y-3 text-sm text-ink font-light">
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">—</span>
                  suit or blazer with dress pants
                </li>
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">—</span>
                  tie optional, pocket square encouraged
                </li>
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">—</span>
                  loafers or dress shoes
                </li>
                <li className="flex gap-3">
                  <span className="text-accent shrink-0">—</span>
                  leave the sneakers at home
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 md:order-2">
              <Image
                src="/mensware.png"
                alt="gentlemen attire"
                width={1536}
                height={1024}
                unoptimized
                priority
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
