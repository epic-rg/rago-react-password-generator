import { useCallback, useEffect, useRef, useState } from "react";
import { CLIPBOARD_TIMEOUT_SECONDS } from "../constants/presets";

export const useClipboardTimeout = () => {
  const [copied, setCopied] = useState(false);
  const [clipboardCountdown, setClipboardCountdown] = useState(0);

  const clearClipboardTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const clearClipboardTimers = useCallback(() => {
    if (clearClipboardTimeoutRef.current) {
      clearTimeout(clearClipboardTimeoutRef.current);
      clearClipboardTimeoutRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  const startSecureClipboardTimeout = useCallback(async () => {
    clearClipboardTimers();
    setClipboardCountdown(CLIPBOARD_TIMEOUT_SECONDS);
    countdownIntervalRef.current = setInterval(() => {
      setClipboardCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    clearClipboardTimeoutRef.current = setTimeout(async () => {
      try {
        await window.navigator.clipboard.writeText("");
      } catch {
        // ignored
      }
      setClipboardCountdown(0);
      clearClipboardTimers();
    }, CLIPBOARD_TIMEOUT_SECONDS * 1000);
  }, [clearClipboardTimers]);

  const copyPassword = useCallback(
    async ({ value, passRef }) => {
      if (!value) return;
      passRef?.current?.select();
      passRef?.current?.setSelectionRange(0, value.length);
      try {
        await window.navigator.clipboard.writeText(value);
        setCopied(true);
        await startSecureClipboardTimeout();
      } catch {
        setCopied(false);
      }
    },
    [startSecureClipboardTimeout],
  );

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => () => clearClipboardTimers(), [clearClipboardTimers]);

  return {
    copied,
    setCopied,
    clipboardCountdown,
    copyPassword,
  };
};
