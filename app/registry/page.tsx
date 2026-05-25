export default function Registry() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-sm mx-auto text-center">
        <h1 className="text-[14pt] font-semibold tracking-[0.2em] text-accent mb-4">registry</h1>
        <div className="w-10 h-px bg-accent mx-auto" />
        <p className="text-sm text-ink-mid font-light leading-relaxed mt-5 mb-14">
          your presence at our wedding is the greatest gift of all. if you
          wish to honor us, we've registered on honeyfund.
        </p>

        <div className="border border-warm-border p-10 flex flex-col items-center">
          <h2 className="text-[14pt] font-semibold text-accent mb-3">honeyfund</h2>
          <p className="text-sm text-ink-light font-light leading-relaxed mb-8">
            help us celebrate our honeymoon and new home.
          </p>
          <a
            href="https://www.honeyfund.com/site/kim-hong-09-19-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-ink text-ink text-xs tracking-[0.2em] lowercase font-normal hover:bg-ink hover:text-parchment transition-colors"
          >
            visit honeyfund
          </a>
        </div>

        <p className="text-xs text-ink-light font-light mt-8 leading-relaxed">
          cash gifts are also warmly welcomed at the wedding.
        </p>
      </div>
    </div>
  );
}
