/**
 * constants/index.js
 *
 * Single source of truth for magic numbers and repeated values.
 * Change something here → it updates everywhere automatically.
 */

/** Colour applied to the difficulty badge text */
export const DIFF_COLORS = {
  easy:   "#30D158",
  medium: "#FF9F0A",
  hard:   "#FF453A",
};

/** Translucent background behind each difficulty badge */
export const DIFF_BG = {
  easy:   "rgba(48,  209, 88,  0.12)",
  medium: "rgba(255, 159, 10,  0.12)",
  hard:   "rgba(255, 67,  58,  0.12)",
};

/**
 * Four window size presets cycled through when opening new windows.
 * Format: [width, height] in pixels.
 */
export const WINDOW_SIZES = [
  [900, 600],
  [800, 560],
  [850, 580],
  [780, 550],
];

/**
 * Matching starting positions for each window preset.
 * Format: [x, y] offset from top-left of viewport (before menu-bar offset is added).
 */
export const WINDOW_START_POSITIONS = [
  [60,  50],
  [100, 60],
  [80,  70],
  [120, 55],
];

/** How many topics the Dock shows at once */
export const DOCK_MAX_ITEMS = 4;

/** Height of the macOS-style menu bar (px) — used to offset window y position */
export const MENUBAR_HEIGHT = 28;
