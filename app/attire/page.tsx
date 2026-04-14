function SmallLeaf({ rotate = 0 }: { rotate?: number }) {
  return (
    <svg
      width="22"
      height="28"
      viewBox="0 0 22 28"
      fill="none"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M11 26 C9 20 10 12 11 2"
        stroke="#7A5C42"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M11 14 C5 8 0 6 1 2 C2 -1 9 6 11 14Z"
        stroke="#7A9472"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M11 14 C17 8 22 6 21 2 C20 -1 13 6 11 14Z"
        stroke="#7A9472"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-12 h-12 sketchy border-2 border-warm-border"
        style={{ backgroundColor: color }}
      />
      <span className="text-lg text-ink-mid">{label}</span>
    </div>
  );
}

export default function Attire() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <SmallLeaf rotate={-20} />
            <h1 className="text-6xl font-bold text-ink">what to wear</h1>
            <SmallLeaf rotate={20} />
          </div>
          <p className="text-3xl font-semibold text-rose mt-2">garden formal</p>
          <p className="text-xl text-ink-mid mt-3 max-w-md mx-auto">
            think elegant but comfortable — we're celebrating outside and want
            everyone to feel their best!
          </p>
        </div>

        <div className="space-y-6">
          {/* For them */}
          <div className="sketchy-card border-2 border-warm-border p-8 bg-parchment-dark/40">
            <h2 className="text-3xl font-bold text-ink mb-4">for her</h2>
            <ul className="space-y-2 text-xl text-ink-mid">
              <li>— floor-length or midi dress or dressy jumpsuit</li>
              <li>— wedges or block heels work best on grass</li>
              <li>— a wrap or light jacket for the evening breeze</li>
            </ul>
          </div>

          <div className="sketchy-card border-2 border-warm-border p-8 bg-parchment-dark/40">
            <h2 className="text-3xl font-bold text-ink mb-4">for him</h2>
            <ul className="space-y-2 text-xl text-ink-mid">
              <li>— suit or blazer with dress pants</li>
              <li>— tie optional, pocket square encouraged</li>
              <li>— loafers or dress shoes</li>
            </ul>
          </div>

          {/* Color palette */}
          <div className="sketchy-card border-2 border-warm-border p-8 bg-parchment-dark/40">
            <h2 className="text-3xl font-bold text-ink mb-2">colors we love</h2>
            <p className="text-lg text-ink-light mb-6">
              earthy tones, dusty florals, sage, cream, terracotta
            </p>
            <div className="flex flex-wrap gap-6">
              <Swatch color="#D4B896" label="champagne" />
              <Swatch color="#7A9472" label="sage" />
              <Swatch color="#C4837A" label="dusty rose" />
              <Swatch color="#C4704F" label="terracotta" />
              <Swatch color="#B8B0A0" label="stone" />
            </div>
          </div>

          {/* Please avoid */}
          <div className="sketchy-card border-2 border-warm-border p-8 bg-parchment-dark/40">
            <h2 className="text-3xl font-bold text-ink mb-4">kindly avoid</h2>
            <ul className="space-y-2 text-xl text-ink-mid">
              <li>— white, ivory, or champagne white (that's the bride!)</li>
              <li>— black tie formal (we want it fun, not stiff)</li>
              <li>— stilettos or thin heels — the ceremony is on grass</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
