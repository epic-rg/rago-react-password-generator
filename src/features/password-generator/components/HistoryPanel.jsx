export const HistoryPanel = ({ theme, passwordHistory, setPasswordHistory, setPassword, copyPassword }) => {
  return (
    <div className="mt-5 rounded-xl border p-4" style={{ borderColor: theme.secondary, backgroundColor: `${theme.primary}80` }}>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium" style={{ color: theme.text }}>Recent passwords</p>
        <button
          type="button"
          onClick={() => setPasswordHistory([])}
          className="rounded-md border px-2.5 py-1 text-xs"
          style={{ borderColor: theme.secondary, color: theme.tertiary }}
        >
          Clear
        </button>
      </div>
      {passwordHistory.length === 0 ? (
        <p className="text-xs" style={{ color: theme.tertiary }}>Session-only history appears here.</p>
      ) : (
        <ul className="space-y-2">
          {passwordHistory.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 rounded-lg border px-3 py-2"
              style={{ borderColor: theme.secondary, backgroundColor: `${theme.primary}99` }}
            >
              <button
                type="button"
                onClick={() => setPassword(item)}
                className="min-w-0 flex-1 truncate text-left font-mono text-xs"
                style={{ color: theme.text }}
              >
                {item}
              </button>
              <button
                type="button"
                onClick={() => copyPassword(item)}
                className="rounded-md border px-2 py-1 text-[11px]"
                style={{ borderColor: theme.secondary, color: theme.tertiary }}
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
