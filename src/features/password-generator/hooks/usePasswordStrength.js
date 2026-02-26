import { useMemo } from "react";
import { DICEWARE_WORDS } from "../constants/diceware";
import { formatCrackTime } from "../utils/formatters";
import { clamp } from "../utils/helpers";

export const usePasswordStrength = ({
  mode,
  password,
  combinedPoolLength,
  dicewareWordCount,
  allowNumbers,
  allowSymbols,
}) => {
  return useMemo(() => {
    let entropy = 0;
    if (mode === "diceware") entropy = dicewareWordCount * Math.log2(DICEWARE_WORDS.length);
    else if (mode === "pronounceable") entropy = Math.max(20, password.length * 3.6 + Number(allowNumbers) * 8 + Number(allowSymbols) * 10);
    else entropy = combinedPoolLength ? password.length * Math.log2(combinedPoolLength) : 0;

    const crackTimeSeconds = entropy > 0 ? Math.pow(2, Math.max(entropy - 1, 0)) / 10_000_000_000 : 0;
    const reasons = [];
    if (password.length < 12) reasons.push("Too short");
    if (mode !== "diceware" && !allowSymbols) reasons.push("Missing symbols");
    if (mode !== "diceware" && !allowNumbers) reasons.push("Missing numbers");
    if (/(.)\1{2,}/.test(password) || /(123|abc|qwerty|password)/i.test(password)) {
      reasons.push("Common pattern");
    }

    const label = entropy >= 80 ? "Strong" : entropy >= 60 ? "Medium" : "Weak";
    const progress = clamp(Math.round(entropy), 5, 100);

    return {
      label,
      entropy,
      crackTime: formatCrackTime(crackTimeSeconds),
      progress,
      reasons,
      tooltip: reasons.length ? `Why weak: ${reasons.join(" • ")}` : "Strong profile. Keep it unique per account.",
    };
  }, [mode, password, combinedPoolLength, dicewareWordCount, allowNumbers, allowSymbols]);
};
