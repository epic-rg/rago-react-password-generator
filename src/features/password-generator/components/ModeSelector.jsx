import { RippleButton } from "./RippleButton";

export const ModeSelector = ({ mode, setMode, theme }) => {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {[
        ["random", "Random"],
        ["diceware", "Diceware"],
        ["pronounceable", "Pronounceable"],
      ].map(([value, label]) => (
        <RippleButton
          key={value}
          rippleColor={`${theme.text}4D`}
          onClick={() => setMode(value)}
          className="rounded-lg border px-3 py-2 text-sm font-medium transition"
          style={{
            borderColor: mode === value ? theme.tertiary : theme.border || theme.secondary,
            backgroundColor: mode === value ? `${theme.tertiary}33` : theme.primary,
            color: theme.text,
          }}
        >
          {label}
        </RippleButton>
      ))}
    </div>
  );
};
