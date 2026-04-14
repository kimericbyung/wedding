function LeafDivider() {
  return (
    <svg width="120" height="24" viewBox="0 0 120 24" fill="none" aria-hidden="true">
      <path
        d="M10 12 C30 7 50 17 60 12 C70 7 90 17 110 12"
        stroke="#C4A882"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 12 C6 8 3 9 4 13 C5 17 9 14 10 12Z"
        stroke="#7A9472"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M110 12 C114 8 117 9 116 13 C115 17 111 14 110 12Z"
        stroke="#7A9472"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

const registries = [
  {
    name: "honeyfund",
    description: "help us celebrate our honeymoon with an experience or adventure.",
    url: "#", // TODO: replace with your Honeyfund URL
    cta: "visit honeyfund",
  },
  {
    name: "amazon",
    description: "browse our curated wishlist for our home together.",
    url: "#", // TODO: replace with your Amazon wishlist URL
    cta: "view wishlist",
  },
];

export default function Registry() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-ink mb-5">registry</h1>
          <LeafDivider />
          <p className="text-2xl text-ink-mid leading-relaxed max-w-sm mx-auto mt-5">
            your presence is the greatest gift of all — but if you'd like to give a little something extra, here's where to find us:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {registries.map((r) => (
            <div
              key={r.name}
              className="sketchy-card border-2 border-warm-border p-10 text-center flex flex-col items-center bg-parchment-dark/50"
            >
              <h2 className="text-4xl font-bold text-ink mb-3">{r.name}</h2>
              <p className="text-xl text-ink-mid leading-relaxed mb-8 flex-1">
                {r.description}
              </p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sketchy inline-block px-8 py-3 border-2 border-ink text-ink text-xl font-semibold hover:bg-ink hover:text-parchment transition-colors"
              >
                {r.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
