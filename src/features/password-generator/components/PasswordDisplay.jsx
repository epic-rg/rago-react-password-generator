import { RippleButton } from "./RippleButton";

export const PasswordDisplay = ({
  theme,
  password,
  passRef,
  copied,
  copyPassword,
  generatePassword,
  clipboardCountdown,
  validationMessage,
  isStrong,
}) => {
  return (
    <div
      className="mb-5 rounded-xl border p-4 transition-all duration-500"
      style={{
        borderColor: theme.border || theme.secondary,
        backgroundColor: `${theme.primary}B3`,
        boxShadow: isStrong ? `0 0 25px ${theme.tertiary}59` : undefined,
      }}
    >
      <label htmlFor="password" className="mb-2 block text-xs" style={{ color: theme.tertiary }}>Generated password</label>
      <input
        id="password"
        ref={passRef}
        readOnly
        value={password}
        className="w-full rounded-lg border px-4 py-3 font-mono text-lg outline-none transition focus:ring-2"
        style={{
          borderColor: theme.border || theme.secondary,
          backgroundColor: theme.primary,
          color: theme.text,
          caretColor: theme.tertiary,
          boxShadow: `0 0 0 0 ${theme.tertiary}`,
        }}
      />

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <RippleButton
          rippleColor={`${theme.primary}4D`}
          onClick={() => copyPassword(password)}
          className="rounded-lg px-4 py-3 text-sm font-semibold transition"
          style={{ backgroundColor: theme.secondary, color: theme.copyText || theme.text }}
        >
          {copied ? "Copied!" : "Copy"}
        </RippleButton>
        <RippleButton
          rippleColor={`${theme.text}4D`}
          onClick={generatePassword}
          className="rounded-lg border px-4 py-3 text-sm font-semibold transition"
          style={{ borderColor: theme.border || theme.secondary, backgroundColor: theme.primary, color: theme.text }}
        >
          Regenerate
        </RippleButton>
        <div
          className="flex items-center justify-center rounded-lg border px-3 text-xs"
          style={{ borderColor: theme.border || theme.secondary, backgroundColor: theme.primary, color: theme.tertiary }}
        >
          Clipboard: {clipboardCountdown > 0 ? `${clipboardCountdown}s` : "idle"}
        </div>
      </div>

      {validationMessage && <p className="mt-2 text-xs" style={{ color: theme.tertiary }}>{validationMessage}</p>}
    </div>
  );
};
