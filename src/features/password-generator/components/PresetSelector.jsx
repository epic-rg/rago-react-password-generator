import { PRESETS } from "../constants/presets";
import { RippleButton } from "./RippleButton";

export const PresetSelector = ({ activePreset, applyPreset, theme }) => {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {Object.keys(PRESETS).map((name) => (
        <RippleButton
          key={name}
          rippleColor={`${theme.text}4D`}
          onClick={() => applyPreset(name)}
          className="rounded-lg border px-3 py-2 text-sm font-medium transition"
          style={{
            borderColor: activePreset === name ? theme.tertiary : theme.border || theme.secondary,
            backgroundColor: activePreset === name ? `${theme.tertiary}33` : theme.primary,
            color: theme.text,
          }}
        >
          {name}
        </RippleButton>
      ))}
    </div>
  );
};
