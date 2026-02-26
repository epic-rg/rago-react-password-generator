export const formatCrackTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds <= 0) return "Instant";
  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const year = 365 * day;
  if (seconds < minute) return "< 1 minute";
  if (seconds < hour) return `${Math.round(seconds / minute)} min`;
  if (seconds < day) return `${Math.round(seconds / hour)} hr`;
  if (seconds < year) return `${Math.round(seconds / day)} days`;
  if (seconds < 1_000_000 * year) return `${Math.round(seconds / year)} years`;
  return `${(seconds / (1_000_000 * year)).toFixed(1)}M years`;
};
