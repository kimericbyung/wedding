const registries = [
  {
    name: "Honeyfund",
    description: "help us celebrate our honeymoon with an experience or adventure.",
    url: "#", // TODO: replace with your Honeyfund URL
    cta: "visit honeyfund",
  },
  {
    name: "Amazon",
    description: "browse our curated wishlist for our home together.",
    url: "#", // TODO: replace with your Amazon wishlist URL
    cta: "view wishlist",
  },
];

export default function Registry() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-[14pt] font-semibold tracking-[0.2em] text-accent mb-4">registry</h1>
          <div className="w-10 h-px bg-accent mx-auto" />
          <p className="text-sm text-ink-mid font-light leading-relaxed max-w-sm mx-auto mt-5">
            your presence at our wedding is the greatest gift of all. if you
            wish to honor us, we've registered at the following:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {registries.map((r) => (
            <div
              key={r.name}
              className="border border-warm-border p-10 text-center flex flex-col items-center"
            >
              <h2 className="text-[14pt] font-semibold text-accent mb-3">{r.name}</h2>
              <p className="text-sm text-ink-light font-light leading-relaxed mb-8 flex-1">
                {r.description}
              </p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-ink text-ink text-xs tracking-[0.2em] lowercase font-normal hover:bg-ink hover:text-parchment transition-colors"
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
