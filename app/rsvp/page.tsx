"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import { searchParties, type PartySearchResult } from "./actions";

export default function RSVPLanding() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PartySearchResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        startTransition(async () => {
          const data = await searchParties(val);
          setResults(data);
          setSearched(true);
        });
      }, 200),
    []
  );

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length >= 2) {
      debouncedSearch(val);
    } else {
      debouncedSearch.cancel();
      setResults([]);
      setSearched(false);
    }
  };

  return (
    <div className="py-20 px-6">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[14pt] font-semibold tracking-[0.2em] text-accent mb-4">
            find your invitation
          </h1>
          <div className="w-10 h-px bg-accent mx-auto mb-5" />
          <p className="text-sm text-ink-light font-light">
            type your name to find your party
          </p>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="your name…"
            className="w-full border-b border-warm-border py-3 text-base text-ink outline-none focus:border-ink transition-colors bg-transparent font-light placeholder:text-ink-light/50"
          />
          {isPending && (
            <span className="absolute right-0 bottom-3 text-xs text-ink-light tracking-wide animate-pulse">
              searching…
            </span>
          )}
        </div>

        {searched && !isPending && results.length === 0 && (
          <p className="text-sm text-ink-light font-light text-center">
            no results found — try a different spelling or reach out to us directly.
          </p>
        )}

        {results.length > 0 && (
          <ul className="space-y-3">
            {results.map((party) => (
              <li key={party.id}>
                <button
                  onClick={() => router.push(`/rsvp/${party.code}`)}
                  className="w-full text-left border border-warm-border p-5 hover:border-ink transition-colors group"
                >
                  <p className="text-sm font-normal text-ink group-hover:text-accent transition-colors">
                    {party.display_name}
                  </p>
                  <p className="text-xs text-ink-light font-light mt-1">
                    {party.guest_names.join(" · ")}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
