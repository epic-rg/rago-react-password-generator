# Password Generator (React + Vite + Tailwind)

A production-style password generator built with React and refactored into a
feature-based architecture for scalability and maintainability.

This app supports multiple password generation modes, entropy and strength
analysis, secure clipboard timeout handling, haptic feedback, session-only
history, and multi-theme UI presets with persisted theme selection.

---

## Features

### Password generation modes

- **Random**
  - Character pool controls: uppercase, lowercase, numbers, symbols
  - Ambiguous character toggle
  - Excluded character input
  - Presets (Banking, Enterprise, Gaming, Legacy system)
- **Diceware**
  - Word-count based passphrase generation
  - Custom separator
  - Optional word capitalization
  - Exclusion-aware generation
- **Pronounceable**
  - Consonant/vowel pattern based generation
  - Optional number/symbol insertion
  - Exclusion-aware output filtering

### Security and UX

- Strength scoring with:
  - Entropy calculation
  - Crack time estimation
  - Weakness reasons and tooltip guidance
- Clipboard copy with:
  - Auto-clear timeout
  - Live countdown indicator
  - Copy success feedback
- Optional haptic feedback (where supported)
- Session-only password history with one-click reuse/copy

### Theming

- Multiple theme presets (Ocean, Classic, Coral, Periwinkle, Forest Ink,
  Slate Mist, Violet Ice, Pop Art, Amber Night)
- Dedicated **Theme settings** section
- Last selected theme is persisted in browser `localStorage`
- Default theme fallback: **Classic**

---

## Architecture

The project is organized using a **feature-based structure**:

```text
src/
  App.jsx
  features/
    password-generator/
      components/
      hooks/
      utils/
      constants/
      index.js
```

### Layer responsibilities

- `constants/` — static data only (charsets, presets, words, themes, limits)
- `utils/` — pure helper logic (no React imports)
- `hooks/` — stateful business orchestration (generation state, strength model, clipboard timeout)
- `components/` — UI composition and presentation via props

---

## 📁 Key files

### Constants

- `constants/charsets.js` — base character pools and ambiguous list
- `constants/presets.js` — generation presets and numeric limits
- `constants/diceware.js` — Diceware word list
- `constants/pronounceable.js` — pronounceable syllable parts
- `constants/themes.js` — theme mode definitions

### Utilities

- `utils/helpers.js` — `clamp`, `randomItem`, `hexToRgba`
- `utils/formatters.js` — crack-time formatter
- `utils/haptics.js` — vibration utility
- `utils/generators.js` — pure generation functions for all modes

### Hooks

- `hooks/usePasswordGenerator.js` — generation state + flow orchestration + theme persistence
- `hooks/usePasswordStrength.js` — entropy/strength/crack-time model
- `hooks/useClipboardTimeout.js` — copy workflow + secure timeout cleanup

### Components

- `components/PasswordGenerator.jsx` — feature container/composition root
- `components/PasswordDisplay.jsx` — output, copy, regenerate, validation
- `components/StrengthMeter.jsx` — strength UI + length slider
- `components/ThemeSection.jsx` — dedicated theme selector section
- `components/AdvancedSettings.jsx` — advanced controls section
- `components/ModeSelector.jsx`
- `components/PresetSelector.jsx`
- `components/HistoryPanel.jsx`
- `components/Toggle.jsx`
- `components/RippleButton.jsx`

---

## Getting started

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Theme persistence behavior

- Storage key: `passwordGeneratorThemeMode`
- On app load:
  - If a valid saved theme exists, it is restored
  - Otherwise falls back to `classic`
- When a user selects another theme, the value is updated immediately in
  `localStorage`

---

## Tech stack

- React 19
- Vite 7
- Tailwind CSS 4
- ESLint 9

---

## Notes

- Password history is intentionally session-only (in-memory state).
- Clipboard clearing depends on browser clipboard permissions.
- Haptic vibration is only available on supported devices/browsers.

---

## License

This project is for learning and development use.
