import { useCallback, useRef, useState } from "react";
import { AdvancedSettings } from "./AdvancedSettings";
import { HistoryPanel } from "./HistoryPanel";
import { PasswordDisplay } from "./PasswordDisplay";
import { StrengthMeter } from "./StrengthMeter";
import { ThemeSection } from "./ThemeSection";
import { THEME_MODES } from "../constants/themes";
import { useClipboardTimeout } from "../hooks/useClipboardTimeout";
import { usePasswordGenerator } from "../hooks/usePasswordGenerator";
import { usePasswordStrength } from "../hooks/usePasswordStrength";
import { hexToRgba } from "../utils/helpers";

export const PasswordGenerator = () => {
  const passRef = useRef(null);
  const [themeOpen, setThemeOpen] = useState(false);

  const { copied, setCopied, clipboardCountdown, copyPassword } = useClipboardTimeout();

  const handleBeforeGenerate = useCallback(() => {
    setCopied(false);
  }, [setCopied]);

  const {
    mode,
    setMode,
    themeMode,
    setThemeMode,
    activePreset,
    advancedOpen,
    setAdvancedOpen,
    length,
    setLength,
    maxLength,
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
    dicewareWordCount,
    setDicewareWordCount,
    separator,
    setSeparator,
    capitalizeWords,
    setCapitalizeWords,
    password,
    setPassword,
    passwordHistory,
    setPasswordHistory,
    validationMessage,
    combinedPool,
    generatePassword,
    applyPreset,
  } = usePasswordGenerator({ onBeforeGenerate: handleBeforeGenerate });

  const handleGeneratePassword = () => {
    generatePassword({ addToHistory: true });
  };

  const handleCopyPassword = async (value) => {
    await copyPassword({ value, passRef });
  };

  const strength = usePasswordStrength({
    mode,
    password,
    combinedPoolLength: combinedPool.length,
    dicewareWordCount,
    allowNumbers,
    allowSymbols,
  });

  const isStrong = strength.label === "Strong";
  const theme = THEME_MODES[themeMode] ?? THEME_MODES.ocean;

  return (
    <main
      className="min-h-screen px-4 py-8 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${theme.primary}, ${theme.secondary}, ${theme.tertiary})`,
        color: theme.text,
      }}
    >
      <section
        className="mx-auto mt-6 w-full max-w-3xl rounded-2xl p-5 shadow-2xl shadow-black/40 backdrop-blur md:p-7"
        style={{ border: `1px solid ${hexToRgba(theme.secondary, 0.6)}`, backgroundColor: hexToRgba(theme.primary, 0.7) }}
      >
        <header className="mb-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: theme.tertiary }}>Security tool</p>
          <h1 className="text-2xl font-bold sm:text-3xl" style={{ color: theme.text }}>Password Generator</h1>
        </header>

        <PasswordDisplay
          theme={theme}
          password={password}
          passRef={passRef}
          copied={copied}
          copyPassword={handleCopyPassword}
          generatePassword={handleGeneratePassword}
          clipboardCountdown={clipboardCountdown}
          validationMessage={validationMessage}
          isStrong={isStrong}
        />

        <StrengthMeter
          theme={theme}
          strength={strength}
          length={length}
          maxLength={maxLength}
          mode={mode}
          setLength={setLength}
          dicewareWordCount={dicewareWordCount}
          setDicewareWordCount={setDicewareWordCount}
          separator={separator}
          setSeparator={setSeparator}
          capitalizeWords={capitalizeWords}
          setCapitalizeWords={setCapitalizeWords}
        />

        <ThemeSection
          theme={theme}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          themeOpen={themeOpen}
          setThemeOpen={setThemeOpen}
        />

        <AdvancedSettings
          theme={theme}
          advancedOpen={advancedOpen}
          setAdvancedOpen={setAdvancedOpen}
          mode={mode}
          setMode={setMode}
          activePreset={activePreset}
          applyPreset={applyPreset}
          allowUppercase={allowUppercase}
          setAllowUppercase={setAllowUppercase}
          allowLowercase={allowLowercase}
          setAllowLowercase={setAllowLowercase}
          allowNumbers={allowNumbers}
          setAllowNumbers={setAllowNumbers}
          allowSymbols={allowSymbols}
          setAllowSymbols={setAllowSymbols}
          includeAmbiguous={includeAmbiguous}
          setIncludeAmbiguous={setIncludeAmbiguous}
          excludeChars={excludeChars}
          setExcludeChars={setExcludeChars}
        />

        <HistoryPanel
          theme={theme}
          passwordHistory={passwordHistory}
          setPasswordHistory={setPasswordHistory}
          setPassword={setPassword}
          copyPassword={handleCopyPassword}
        />
      </section>
    </main>
  );
};
