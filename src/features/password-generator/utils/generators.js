import { AMBIGUOUS, CHARSETS } from "../constants/charsets";
import { DICEWARE_WORDS } from "../constants/diceware";
import { PRONOUNCEABLE_CONSONANTS, PRONOUNCEABLE_VOWELS } from "../constants/pronounceable";
import { randomItem } from "./helpers";

export const generateRandomPassword = ({ filteredPools, combinedPool, length }) => {
  if (!filteredPools.length) {
    return { error: "Enable at least one character type." };
  }

  if (length < filteredPools.length || !combinedPool.length) {
    return { error: "Adjust length/rules. Current setup is too restrictive." };
  }

  const chars = filteredPools.map((pool) => randomItem(pool));
  for (let i = chars.length; i < length; i++) chars.push(randomItem(combinedPool));

  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return { password: chars.join("") };
};

export const generateDicewarePassword = ({ excludeChars, includeAmbiguous, dicewareWordCount, capitalizeWords, separator }) => {
  const blocked = new Set(excludeChars.split(""));
  if (!includeAmbiguous) AMBIGUOUS.split("").forEach((c) => blocked.add(c));

  const words = [];
  let attempts = 0;
  while (words.length < dicewareWordCount && attempts < 300) {
    attempts += 1;
    const word = randomItem(DICEWARE_WORDS);

    // Keep diceware words intact: skip words containing blocked chars
    // instead of deleting letters and producing malformed tokens.
    if (word.split("").some((c) => blocked.has(c))) continue;

    words.push(capitalizeWords ? `${word[0].toUpperCase()}${word.slice(1)}` : word);
  }

  if (words.length < dicewareWordCount) {
    return { error: "Too many exclusions for Diceware mode." };
  }

  return { password: words.join(separator || "-") };
};

export const generatePronounceablePassword = ({
  length,
  allowUppercase,
  allowLowercase,
  allowNumbers,
  allowSymbols,
  includeAmbiguous,
  exclusionSet,
  excludeChars,
}) => {
  const coreLen = Math.max(4, length - Number(allowNumbers) - Number(allowSymbols));
  let base = "";
  while (base.length < coreLen) {
    base += `${randomItem(PRONOUNCEABLE_CONSONANTS)}${randomItem(PRONOUNCEABLE_VOWELS)}`;
  }
  base = base.slice(0, coreLen).toLowerCase();
  if (allowUppercase) base = `${base[0].toUpperCase()}${base.slice(1)}`;
  if (!allowLowercase) base = base.toUpperCase();

  let pass = base;
  if (allowNumbers) {
    const idx = Math.floor(Math.random() * (pass.length + 1));
    pass = `${pass.slice(0, idx)}${randomItem(CHARSETS.numbers)}${pass.slice(idx)}`;
  }
  if (allowSymbols) {
    const idx = Math.floor(Math.random() * (pass.length + 1));
    pass = `${pass.slice(0, idx)}${randomItem(CHARSETS.symbols)}${pass.slice(idx)}`;
  }
  if (!includeAmbiguous) pass = pass.split("").filter((c) => !AMBIGUOUS.includes(c)).join("");
  if (excludeChars) pass = pass.split("").filter((c) => !exclusionSet.has(c)).join("");

  if (!pass) {
    return { error: "Result empty after exclusions." };
  }

  return { password: pass };
};
