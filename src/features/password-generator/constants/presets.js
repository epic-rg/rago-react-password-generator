export const PRESETS = {
  Banking: {
    length: 16,
    maxLength: 32,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    includeAmbiguous: false,
    excludeChars: "",
  },
  Enterprise: {
    length: 20,
    maxLength: 48,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    includeAmbiguous: false,
    excludeChars: "",
  },
  Gaming: {
    length: 14,
    maxLength: 32,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    includeAmbiguous: true,
    excludeChars: "",
  },
  "Legacy system": {
    length: 12,
    maxLength: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    includeAmbiguous: false,
    excludeChars: "",
  },
};

export const MIN_LENGTH = 6;
export const DEFAULT_MAX_LENGTH = 48;
export const HISTORY_LIMIT = 8;
export const CLIPBOARD_TIMEOUT_SECONDS = 20;
