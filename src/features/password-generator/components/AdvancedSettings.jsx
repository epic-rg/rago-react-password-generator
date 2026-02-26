import { haptic } from "../utils/haptics";
import { ModeSelector } from "./ModeSelector";
import { PresetSelector } from "./PresetSelector";
import { Toggle } from "./Toggle";

export const AdvancedSettings = ({
  theme,
  advancedOpen,
  setAdvancedOpen,
  mode,
  setMode,
  activePreset,
  applyPreset,
  allowUppercase,
  setAllowUppercase,
  allowLowercase,
  setAllowLowercase,
  allowNumbers,
  setAllowNumbers,
  allowSymbols,
  setAllowSymbols,
  includeAmbiguous,
  setIncludeAmbiguous,
  excludeChars,
  setExcludeChars,
}) => {
  return (
    <div className="rounded-xl border bg-[#355872]/60" style={{ borderColor: theme.border || theme.secondary, backgroundColor: `${theme.primary}99` }}>
      <button
        type="button"
        onClick={() => {
          haptic();
          setAdvancedOpen((prev) => !prev);
        }}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-semibold" style={{ color: theme.text }}>Advanced settings</span>
        <span className={`text-xs transition-transform ${advancedOpen ? "rotate-180" : ""}`} style={{ color: theme.tertiary }}>▼</span>
      </button>

      <div className={`grid gap-4 overflow-hidden px-4 transition-all duration-500 ${advancedOpen ? "max-h-300 pb-4" : "max-h-0"}`}>
        <ModeSelector mode={mode} setMode={setMode} theme={theme} />

        {mode === "random" && <PresetSelector activePreset={activePreset} applyPreset={applyPreset} theme={theme} />}

        <div className="grid gap-2 sm:grid-cols-2">
          <Toggle label="Uppercase" checked={allowUppercase} onChange={setAllowUppercase} theme={theme} />
          <Toggle label="Lowercase" checked={allowLowercase} onChange={setAllowLowercase} theme={theme} />
          <Toggle label="Numbers" checked={allowNumbers} onChange={setAllowNumbers} theme={theme} />
          <Toggle label="Symbols" checked={allowSymbols} onChange={setAllowSymbols} theme={theme} />
          <div className="sm:col-span-2">
            <Toggle
              label="Allow ambiguous (I, l, 1, O, 0)"
              checked={includeAmbiguous}
              onChange={setIncludeAmbiguous}
              theme={theme}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs" style={{ color: theme.tertiary }}>Exclude specific chars</label>
          <input
            value={excludeChars}
            onChange={(e) => setExcludeChars(e.target.value)}
            placeholder="e.g. O0Il[]{}"
            className="w-full rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: theme.border || theme.secondary, backgroundColor: theme.primary, color: theme.text }}
          />
        </div>
      </div>
    </div>
  );
};
