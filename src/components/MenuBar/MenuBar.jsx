/**
 * MenuBar.jsx
 *
 * Mimics the macOS system menu bar:
 *   LEFT  — Apple logo + application menu items
 *   RIGHT — Date and current time (live clock)
 *
 * Props:
 *   time {Date} — current Date object passed from the useClock hook
 */

import React from "react";
import "./MenuBar.css";

/** Items that appear in the left-side application menu */
const MENU_ITEMS = ["DSA Studio", "File", "Edit", "View", "Window", "Help"];

export default function MenuBar({ time }) {
  // Format time as "09:41" (12-hour)
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Format date as "Fri, Mar 20"
  const formattedDate = time.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="menubar">
      {/* ── Left: Apple icon + app menu ── */}
      <nav className="menubar__left">
        {/* Apple / Command icon */}
        <span className="menubar__apple">⌘</span>

        {MENU_ITEMS.map((item) => (
          <span
            key={item}
            className={`menubar__item ${item === "DSA Studio" ? "menubar__item--bold" : ""}`}
          >
            {item}
          </span>
        ))}
      </nav>

      {/* ── Right: Date and time ── */}
      <div className="menubar__right">
        <span className="menubar__date">{formattedDate}</span>
        <span className="menubar__time">{formattedTime}</span>
      </div>
    </header>
  );
}
