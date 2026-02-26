import { MIN_LENGTH } from "../constants/presets";
import { clamp } from "../utils/helpers";
import { Toggle } from "./Toggle";

export const StrengthMeter = ({
  theme,
  strength,
  length,
  maxLength,
  mode,
  setLength,
  dicewareWordCount,
  setDicewareWordCount,
  separator,
  setSeparator,
  capitalizeWords,
  setCapitalizeWords,
}) => {
  return (
    <div className="mb-5 rounded-xl border p-4 sm:p-5" style={{ borderColor: theme.secondary, backgroundColor: `${theme.primary}99` }}>
      <div className="mb-2 flex items-center justify-between text-xs" style={{ color: theme.tertiary }}>
        <span className="inline-flex items-center gap-1">
          Strength
          <span
            title={strength.tooltip}
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border text-[10px]"
            style={{ borderColor: theme.secondary }}
          >
            i
          </span>
        </span>
        <span className="font-semibold" style={{ color: theme.text }}>{strength.label}</span>
      </div>

      <div className="mb-2 grid grid-cols-2 gap-2 text-[11px]" style={{ color: theme.tertiary }}>
        <span>Entropy: <strong style={{ color: theme.text }}>{strength.entropy.toFixed(1)} bits</strong></span>
        <span className="text-right">Crack time: <strong style={{ color: theme.text }}>{strength.crackTime}</strong></span>
      </div>

      <div className="h-2 overflow-hidden rounded-full" style={{ backgroundColor: theme.primary }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary}, ${theme.tertiary})`,
            width: `${strength.progress}%`,
          }}
        />
      </div>

      {strength.label === "Weak" && strength.reasons.length > 0 && (
        <p className="mt-2 text-[11px]" style={{ color: theme.tertiary }}>{strength.reasons.join(" • ")}</p>
      )}

      {mode === "diceware" ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs" style={{ color: theme.tertiary }}>Word count</label>
            <input
              type="number"
              min={3}
              max={8}
              value={dicewareWordCount}
              onChange={(e) => setDicewareWordCount(clamp(Number(e.target.value), 3, 8))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: theme.secondary, backgroundColor: theme.primary, color: theme.text }}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs" style={{ color: theme.tertiary }}>Separator</label>
            <input
              value={separator}
              maxLength={3}
              onChange={(e) => setSeparator(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: theme.secondary, backgroundColor: theme.primary, color: theme.text }}
            />
          </div>
          <Toggle label="Capitalize words" checked={capitalizeWords} onChange={setCapitalizeWords} theme={theme} />
        </div>
      ) : (
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <label htmlFor="length" className="font-medium" style={{ color: theme.text }}>Length</label>
            <span
              className="rounded-full px-2.5 py-1 text-xs"
              style={{ backgroundColor: `${theme.secondary}33`, color: theme.text }}
            >
              {length}
            </span>
          </div>
          <input
            id="length"
            type="range"
            min={MIN_LENGTH}
            max={maxLength}
            step={1}
            value={length}
            onChange={(e) => setLength(clamp(Number(e.target.value), MIN_LENGTH, maxLength))}
            className="h-2 w-full cursor-pointer rounded-lg disabled:opacity-50"
            style={{ backgroundColor: theme.primary, accentColor: theme.tertiary }}
          />
        </div>
      )}
    </div>
  );
};
