const registries = [
  {
    name: "Honeyfund",
    description:
      "Help us celebrate our honeymoon with an experience or adventure.",
    url: "#", // TODO: replace with your Honeyfund URL
    cta: "Visit Honeyfund",
  },
  {
    name: "Amazon",
    description: "Browse our curated wishlist for the home.",
    url: "#", // TODO: replace with your Amazon wishlist URL
    cta: "View Wishlist",
  },
];

export default function Registry() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">
            Gifts
          </p>
          <h1 className="text-4xl font-light text-neutral-900 mb-6">
            Registry
          </h1>
          <p className="text-stone-400 text-sm leading-relaxed max-w-sm mx-auto">
            Your presence at our wedding is the greatest gift of all. If you
            wish to honor us, we've registered at the following:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {registries.map((r) => (
            <div
              key={r.name}
              className="border border-stone-200 p-10 text-center flex flex-col items-center"
            >
              <h2 className="text-xl font-light text-neutral-900 mb-3">
                {r.name}
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed mb-8 flex-1">
                {r.description}
              </p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 border border-neutral-900 text-neutral-900 text-xs tracking-[0.15em] uppercase hover:bg-neutral-900 hover:text-white transition-colors"
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
