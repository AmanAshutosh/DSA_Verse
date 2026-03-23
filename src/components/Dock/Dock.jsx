/**
 * Dock.jsx
 *
 * macOS-style Dock at the bottom of the screen.
 * Shows the 4 most-recently-opened topics.
 * Icons magnify as the cursor approaches (physics-based scaling).
 *
 * Props:
 *   dockTopics {Array}    - Up to 4 topic objects to display
 *   openIds    {string[]} - Topics with open windows (show dot indicator)
 *   onOpen     {fn}       - Called with topicId on icon click
 */

import React, { useState, useRef } from "react";
import "./Dock.css";

/** Visual width of each dock icon (px) */
const ICON_SIZE = 56;
/** Gap between icons (px) */
const ICON_GAP = 10;

export default function Dock({ dockTopics, openIds, onOpen }) {
  // Track mouse X position relative to the left edge of the dock bar
  const [mouseX, setMouseX] = useState(null);
  const dockBarRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = dockBarRef.current?.getBoundingClientRect();
    if (rect) setMouseX(e.clientX - rect.left);
  };

  const handleMouseLeave = () => setMouseX(null);

  return (
    <div className="dock">
      <div
        className="dock__bar"
        ref={dockBarRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {dockTopics.map((topic, index) => {
          // Centre X of this icon within the bar
          const iconCentreX = index * (ICON_SIZE + ICON_GAP) + ICON_SIZE / 2;

          // Distance from cursor to icon centre (large value when cursor is away)
          const distance =
            mouseX !== null ? Math.abs(mouseX - iconCentreX) : 999;

          // Scale: 1 at rest, up to 1.5 directly under cursor
          const scale = mouseX !== null ? Math.max(1, 1.5 - distance / 100) : 1;

          // Icons lift as they grow — multiply scale factor by a lift coefficient
          const lift = mouseX !== null ? Math.max(0, (scale - 1) * 30) : 0;

          const isOpen = openIds.includes(topic.id);

          return (
            <div
              key={topic.id}
              className="dock__item"
              style={{
                transform: `scale(${scale}) translateY(-${lift}px)`,
                transformOrigin: "bottom center",
              }}
              onClick={() => onOpen(topic.id)}
            >
              {/* Coloured icon box */}
              <div
                className="dock__icon"
                style={{
                  background: `linear-gradient(145deg, ${topic.color}dd, ${topic.color}88)`,
                  boxShadow: `0 4px 16px ${topic.color}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
                }}
              >
                <span className="dock__emoji">{topic.emoji}</span>
              </div>

              {/* Running-indicator dot below icon */}
              {isOpen && <div className="dock__dot" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
