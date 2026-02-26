import { haptic } from "../utils/haptics";
import { THEME_MODES } from "../constants/themes";
import { RippleButton } from "./RippleButton";

export const ThemeSection = ({ theme, themeMode, setThemeMode, themeOpen, setThemeOpen }) => {
  return (
    <div className="mb-5 rounded-xl border" style={{ borderColor: theme.border || theme.secondary, backgroundColor: `${theme.primary}99` }}>
      <button
        type="button"
        onClick={() => {
          haptic();
          setThemeOpen((prev) => !prev);
        }}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-semibold" style={{ color: theme.text }}>Theme settings</span>
        <span className={`text-xs transition-transform ${themeOpen ? "rotate-180" : ""}`} style={{ color: theme.tertiary }}>▼</span>
      </button>

      <div className={`grid gap-2 overflow-hidden px-4 transition-all duration-500 sm:grid-cols-3 ${themeOpen ? "max-h-300 pb-4" : "max-h-0"}`}>
        {Object.entries(THEME_MODES).map(([value, config]) => (
          <RippleButton
            key={value}
            rippleColor={`${theme.text}4D`}
            onClick={() => setThemeMode(value)}
            className="rounded-lg border px-3 py-2 text-sm font-medium transition"
            style={{
              borderColor: themeMode === value ? theme.tertiary : theme.border || theme.secondary,
              backgroundColor: themeMode === value ? `${theme.tertiary}33` : theme.primary,
              color: theme.text,
            }}
          >
            {config.label}
          </RippleButton>
        ))}
      </div>
    </div>
  );
};
