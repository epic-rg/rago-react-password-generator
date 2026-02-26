export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const randomItem = (arrOrString) => arrOrString[Math.floor(Math.random() * arrOrString.length)];

export const hexToRgba = (hex, alpha) => {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized
        .split("")
        .map((c) => `${c}${c}`)
        .join("")
    : normalized;

  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
