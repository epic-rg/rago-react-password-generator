export const haptic = () => {
  if (typeof window !== "undefined" && window.navigator?.vibrate) {
    window.navigator.vibrate(10);
  }
};
