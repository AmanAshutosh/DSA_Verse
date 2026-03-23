/**
 * hooks/useWindows.js
 *
 * Manages the list of open topic windows on the desktop.
 * Handles opening, closing, and focusing (z-index management).
 *
 * Each window object looks like:
 *   { id, topicId, x, y, w, h }
 */

import { useState } from "react";
import { WINDOW_SIZES, WINDOW_START_POSITIONS, MENUBAR_HEIGHT } from "../constants";

export function useWindows() {
  // Array of window descriptor objects currently on screen
  const [windows, setWindows] = useState([]);

  // ID of the window that is currently focused (on top)
  const [activeWindowId, setActiveWindowId] = useState(null);

  /**
   * Open a topic window, or focus it if already open.
   *
   * @param {string} topicId - e.g. "arrays"
   */
  const openWindow = (topicId) => {
    // If a window for this topic already exists, just bring it to front
    const existing = windows.find((w) => w.topicId === topicId);
    if (existing) {
      setActiveWindowId(existing.id);
      return;
    }

    // Pick a size and starting position based on how many windows are open
    const idx          = windows.length % 4;
    const [w, h]       = WINDOW_SIZES[idx];
    const [baseX, baseY] = WINDOW_START_POSITIONS[idx];
    // Cascade windows slightly so they don't stack perfectly
    const cascadeOffset = windows.length * 20;

    const newWindow = {
      id:      `${topicId}-${Date.now()}`,
      topicId,
      x:       baseX + cascadeOffset,
      y:       baseY + cascadeOffset + MENUBAR_HEIGHT, // Clear the menu bar
      w,
      h,
    };

    setWindows((prev) => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
  };

  /**
   * Remove a window from the desktop.
   *
   * @param {string} id - Window ID to close
   */
  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    // If we just closed the active window, deselect
    if (activeWindowId === id) setActiveWindowId(null);
  };

  /**
   * Bring a window to the front by setting it as active.
   *
   * @param {string} id - Window ID to focus
   */
  const focusWindow = (id) => setActiveWindowId(id);

  return { windows, activeWindowId, openWindow, closeWindow, focusWindow };
}
