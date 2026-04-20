function AccentRule() {
  return <div className="w-10 h-px bg-accent mx-auto" />;
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-11 h-11 border border-warm-border"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-ink-light font-light">{label}</span>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-warm-border p-8">
      <h2 className="text-xs tracking-[0.3em] lowercase text-accent font-semibold mb-5">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function Attire() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
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

        <div className="space-y-4">
          <Card title="for her">
            <ul className="space-y-2 text-sm text-ink font-light">
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
            </ul>
          </Card>

          <Card title="for him">
            <ul className="space-y-2 text-sm text-ink font-light">
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
            </ul>
          </Card>

          <Card title="colors we love">
            <p className="text-xs text-ink-light font-light mb-6">
              earthy tones, dusty florals, sage, cream, terracotta
            </p>
            <div className="flex flex-wrap gap-6">
              <Swatch color="#D4B896" label="champagne" />
              <Swatch color="#7A9472" label="sage" />
              <Swatch color="#C4837A" label="dusty rose" />
              <Swatch color="#C4704F" label="terracotta" />
              <Swatch color="#B8B0A0" label="stone" />
            </div>
          </Card>

          <Card title="kindly avoid">
            <ul className="space-y-2 text-sm text-ink font-light">
              <li className="flex gap-3">
                <span className="text-accent shrink-0">—</span>
                white, ivory, or champagne white (that's the bride!)
              </li>
              <li className="flex gap-3">
                <span className="text-accent shrink-0">—</span>
                black tie formal — we want it fun, not stiff
              </li>
              <li className="flex gap-3">
                <span className="text-accent shrink-0">—</span>
                stilettos or thin heels — the ceremony is on grass
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
