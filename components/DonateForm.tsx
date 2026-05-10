"use client";

import { useState } from "react";

const PRESETS = [10, 25, 50, 100];

export default function DonateForm() {
  const [selected, setSelected] = useState<number | "custom">(25);
  const [custom, setCustom] = useState("");

  const amount = selected === "custom" ? Number(custom) || 0 : selected;
  const valid = amount > 0;

  return (
    <div className="w-full max-w-md rounded-2xl border border-cream-dark bg-white p-6 shadow-lg sm:p-8">
      <fieldset className="mb-4">
        <legend className="sr-only">Donation amount</legend>
        <div className="grid grid-cols-4 gap-2">
          {PRESETS.map((value) => {
            const active = selected === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setSelected(value)}
                aria-pressed={active}
                className={`min-h-[56px] rounded-lg border-2 py-3 text-xl font-bold transition-colors ${
                  active
                    ? "border-charcoal bg-charcoal text-white"
                    : "border-gray-400 bg-white text-charcoal hover:border-charcoal"
                }`}
              >
                ${value}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="mb-6 block">
        <span className="mb-2 block text-base font-semibold text-gray-800">
          Or enter another amount
        </span>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-gray-600">
            $
          </span>
          <input
            type="number"
            inputMode="decimal"
            min="1"
            step="1"
            placeholder="Custom amount"
            value={custom}
            onFocus={() => setSelected("custom")}
            onChange={(e) => {
              setSelected("custom");
              setCustom(e.target.value);
            }}
            className={`min-h-[56px] w-full rounded-lg border-2 py-3 pl-9 pr-4 text-xl transition-colors focus:outline-none ${
              selected === "custom"
                ? "border-charcoal"
                : "border-gray-400 focus:border-charcoal"
            }`}
          />
        </div>
      </label>

      <button
        type="button"
        disabled
        aria-disabled="true"
        className="min-h-[64px] w-full cursor-not-allowed rounded-lg bg-primary py-4 text-2xl font-extrabold text-charcoal opacity-70"
      >
        Donate{valid ? ` $${amount}` : ""}
      </button>
      <p className="mt-4 text-center text-base text-gray-700">
        Donations coming soon &mdash; payment vendor in setup.
      </p>
    </div>
  );
}
