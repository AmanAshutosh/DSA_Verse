/**
 * App.jsx — Root Component
 *
 * Wires together all custom hooks and top-level components.
 * This file intentionally contains NO business logic — it only:
 *   1. Calls hooks to get state and actions
 *   2. Passes them down as props
 *   3. Renders the component tree
 *
 * Component tree:
 *   App
 *   ├── Wallpaper          (fixed dark background)
 *   ├── MenuBar            (top system bar)
 *   ├── AppGrid            (icon grid on desktop)
 *   ├── DraggableWindow[]  (one per open topic)
 *   ├── Dock               (bottom quick-launch bar)
 *   └── HintBanner         (welcome hint when no windows are open)
 */

import React from "react";
import { DSA_DATA } from "./data/dsaData";
import { DOCK_MAX_ITEMS } from "./constants";
import { useClock } from "./hooks/useClock";
import { useProgress } from "./hooks/useProgress";
import { useWindows } from "./hooks/useWindows";
import { useRecentTopics } from "./hooks/useRecentTopics";

import Wallpaper from "./components/Wallpaper/Wallpaper";
import MenuBar from "./components/MenuBar/MenuBar";
import AppGrid from "./components/AppGrid/AppGrid";
import Dock from "./components/Dock/Dock";
import DraggableWindow from "./components/Window/DraggableWindow";

import "./App.css";

export default function App() {
  /* ── Hooks ──────────────────────────────────────────────── */

  /** Live clock for the menu bar */
  const time = useClock();

  /** Pattern completion state + toggle action */
  const { progress, markComplete } = useProgress();

  /** Open/close/focus window management */
  const { windows, activeWindowId, openWindow, closeWindow, focusWindow } =
    useWindows();

  /** Recently-opened topic IDs for the Dock */
  const { recentIds, addRecent } = useRecentTopics();

  const isMobile = window.innerWidth <= 768;

  /* ── Derived values ─────────────────────────────────────── */

  /** Topic IDs that currently have an open window */
  const openTopicIds = windows.map((w) => w.topicId);

  /**
   * Topics to display in the Dock.
   * Use recent history if available, otherwise fall back to first 4 topics.
   */
  const dockTopics = recentIds.length
    ? recentIds
        .map((id) => DSA_DATA.find((t) => t.id === id))
        .filter(Boolean) // Remove any stale IDs
        .slice(0, DOCK_MAX_ITEMS)
    : DSA_DATA.slice(0, DOCK_MAX_ITEMS);

  /* ── Actions ────────────────────────────────────────────── */

  /**
   * Open a topic window AND record it as recently opened.
   * Called by both AppGrid icons and Dock icons.
   */
  const handleOpenTopic = (topicId) => {
    openWindow(topicId);
    addRecent(topicId);
  };

  /* ── Render ─────────────────────────────────────────────── */

  return (
    <div className="app">
      {/* Fixed desktop background */}
      <Wallpaper />

      {/* System menu bar at the very top */}
      <MenuBar time={time} />

      {/* Icon grid centred on the desktop */}
      <AppGrid
        topics={DSA_DATA}
        openIds={openTopicIds}
        progress={progress}
        onOpen={handleOpenTopic}
      />

      {/* Render one DraggableWindow for each open topic */}
      {windows.map((win) => {
        const topic = DSA_DATA.find((t) => t.id === win.topicId);
        // Guard: skip if topic data somehow missing (shouldn't happen)
        if (!topic) return null;

        return (
          <DraggableWindow
            key={win.id}
            win={win}
            topic={topic}
            isActive={win.id === activeWindowId}
            onClose={() => closeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
            progress={progress}
            onComplete={markComplete}
            isMobile={isMobile}
          />
        );
      })}

      {/* Dock at the bottom */}
      <Dock
        dockTopics={dockTopics}
        openIds={openTopicIds}
        onOpen={handleOpenTopic}
      />

      {/* Hint shown only when the desktop is empty */}
      {windows.length === 0 && (
        <p className="app__hint">
          Click any topic to open · Drag windows to rearrange · Mark patterns
          complete to track progress
        </p>
      )}
    </div>
  );
}
