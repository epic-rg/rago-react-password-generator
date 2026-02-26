import { useCallback, useEffect, useMemo, useState } from "react";
import { AMBIGUOUS, CHARSETS } from "../constants/charsets";
import { THEME_MODES } from "../constants/themes";
import {
  DEFAULT_MAX_LENGTH,
  HISTORY_LIMIT,
  MIN_LENGTH,
  PRESETS,
} from "../constants/presets";
import {
  generateDicewarePassword,
  generatePronounceablePassword,
  generateRandomPassword,
} from "../utils/generators";
import { clamp } from "../utils/helpers";

export const usePasswordGenerator = ({ onBeforeGenerate } = {}) => {
  const initial = PRESETS.Enterprise;

  const [mode, setMode] = useState("random");
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window === "undefined") return "classic";
    const savedTheme = window.localStorage.getItem("passwordGeneratorThemeMode");
    return savedTheme && THEME_MODES[savedTheme] ? savedTheme : "classic";
  });
  const [activePreset, setActivePreset] = useState("Enterprise");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [length, setLength] = useState(initial.length);
  const [maxLength, setMaxLength] = useState(initial.maxLength);
  const [allowUppercase, setAllowUppercase] = useState(initial.uppercase);
  const [allowLowercase, setAllowLowercase] = useState(initial.lowercase);
  const [allowNumbers, setAllowNumbers] = useState(initial.numbers);
  const [allowSymbols, setAllowSymbols] = useState(initial.symbols);
  const [includeAmbiguous, setIncludeAmbiguous] = useState(initial.includeAmbiguous);
  const [excludeChars, setExcludeChars] = useState(initial.excludeChars);

  const [dicewareWordCount, setDicewareWordCount] = useState(4);
  const [separator, setSeparator] = useState("-");
  const [capitalizeWords, setCapitalizeWords] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordHistory, setPasswordHistory] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");

  const exclusionSet = useMemo(() => new Set(excludeChars.split("")), [excludeChars]);

  const filteredPools = useMemo(() => {
    const pools = [];
    if (allowUppercase) pools.push(CHARSETS.uppercase);
    if (allowLowercase) pools.push(CHARSETS.lowercase);
    if (allowNumbers) pools.push(CHARSETS.numbers);
    if (allowSymbols) pools.push(CHARSETS.symbols);

    return pools
      .map((pool) => {
        let out = pool;
        if (!includeAmbiguous) out = out.split("").filter((c) => !AMBIGUOUS.includes(c)).join("");
        if (excludeChars) out = out.split("").filter((c) => !exclusionSet.has(c)).join("");
        return out;
      })
      .filter(Boolean);
  }, [allowUppercase, allowLowercase, allowNumbers, allowSymbols, includeAmbiguous, excludeChars, exclusionSet]);

  const combinedPool = useMemo(() => filteredPools.join(""), [filteredPools]);

  const pushToHistory = useCallback((value) => {
    if (!value) return;
    setPassword(value);
    setPasswordHistory((prev) => [value, ...prev.filter((item) => item !== value)].slice(0, HISTORY_LIMIT));
  }, []);

  const applyPreset = useCallback((name) => {
    const preset = PRESETS[name];
    if (!preset) return;
    setActivePreset(name);
    setMaxLength(preset.maxLength ?? DEFAULT_MAX_LENGTH);
    setLength(clamp(preset.length, MIN_LENGTH, preset.maxLength ?? DEFAULT_MAX_LENGTH));
    setAllowUppercase(preset.uppercase);
    setAllowLowercase(preset.lowercase);
    setAllowNumbers(preset.numbers);
    setAllowSymbols(preset.symbols);
    setIncludeAmbiguous(preset.includeAmbiguous);
    setExcludeChars(preset.excludeChars);
  }, []);

  const generatePassword = useCallback((options = {}) => {
    const { addToHistory = true } = options;
    onBeforeGenerate?.();

    if (mode === "diceware") {
      const result = generateDicewarePassword({
        excludeChars,
        includeAmbiguous,
        dicewareWordCount,
        capitalizeWords,
        separator,
      });

      if (result.error) {
        setValidationMessage(result.error);
        setPassword("");
        return;
      }

      setValidationMessage("");
      if (addToHistory) pushToHistory(result.password);
      else setPassword(result.password);
      return;
    }

    if (mode === "pronounceable") {
      const result = generatePronounceablePassword({
        length,
        allowUppercase,
        allowLowercase,
        allowNumbers,
        allowSymbols,
        includeAmbiguous,
        exclusionSet,
        excludeChars,
      });

      if (result.error) {
        setValidationMessage(result.error);
        setPassword("");
        return;
      }

      setValidationMessage("");
      if (addToHistory) pushToHistory(result.password);
      else setPassword(result.password);
      return;
    }

    const result = generateRandomPassword({ filteredPools, combinedPool, length });

    if (result.error) {
      setValidationMessage(result.error);
      setPassword("");
      return;
    }

    setValidationMessage("");
    if (addToHistory) pushToHistory(result.password);
    else setPassword(result.password);
  }, [
    mode,
    excludeChars,
    includeAmbiguous,
    dicewareWordCount,
    capitalizeWords,
    separator,
    length,
    allowUppercase,
    allowLowercase,
    allowNumbers,
    allowSymbols,
    exclusionSet,
    filteredPools,
    combinedPool,
    pushToHistory,
    setPassword,
    onBeforeGenerate,
  ]);

  useEffect(() => {
    generatePassword({ addToHistory: false });
  }, [generatePassword]);

  useEffect(() => {
    if (length > maxLength) setLength(maxLength);
  }, [length, maxLength]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("passwordGeneratorThemeMode", themeMode);
  }, [themeMode]);

  return {
    mode,
    setMode,
    themeMode,
    setThemeMode,
    activePreset,
    setActivePreset,
    advancedOpen,
    setAdvancedOpen,
    length,
    setLength,
    maxLength,
    setMaxLength,
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
    pushToHistory,
  };
};
