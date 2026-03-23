/**
 * TopicIcon.jsx
 *
 * A single app icon displayed in the desktop grid.
 * Shows:
 *   - Coloured icon with topic emoji
 *   - SVG ring that fills as patterns are completed
 *   - Small dot indicator when topic window is open
 *   - Topic name and "X/Y done" label below
 *
 * Props:
 *   topic    {Object}  - Topic data object from dsaData.js
 *   isOpen   {boolean} - Whether this topic has an open window
 *   onClick  {fn}      - Called when icon is clicked
 *   progress {Object}  - { completed, total } for this topic
 */

import React, { useState } from "react";
import "./TopicIcon.css";

export default function TopicIcon({ topic, isOpen, onClick, progress }) {
  const [hovered, setHovered] = useState(false);

  const { completed, total } = progress;

  // SVG ring parameters
  const RADIUS = 32;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const fillPercent = total > 0 ? completed / total : 0;
  // How much of the ring stroke to hide (creates the "arc" effect)
  const strokeOffset = CIRCUMFERENCE * (1 - fillPercent);

  return (
    <div
      className={`topic-icon ${hovered ? "topic-icon--hovered" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      aria-label={`Open ${topic.name}`}
    >
      {/* ── Icon wrapper (ring + coloured box) ── */}
      <div className="topic-icon__wrapper">
        {/* Progress ring drawn with SVG so we can animate the arc */}
        <svg
          className="topic-icon__ring"
          width={76}
          height={76}
          viewBox="0 0 76 76"
        >
          {/* Grey background track */}
          <circle
            cx={38}
            cy={38}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={3}
          />
          {/* Coloured progress arc (hidden when 0%) */}
          {fillPercent > 0 && (
            <circle
              cx={38}
              cy={38}
              r={RADIUS}
              fill="none"
              stroke={topic.color}
              strokeWidth={3}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Coloured icon box */}
        <div
          className="topic-icon__box"
          style={{
            background: `linear-gradient(145deg, ${topic.color}cc, ${topic.color}66)`,
            boxShadow: `0 4px 20px ${topic.color}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
          }}
        >
          <span className="topic-icon__emoji">{topic.emoji}</span>
        </div>

        {/* Open-window indicator dot */}
        {isOpen && <div className="topic-icon__dot" />}
      </div>

      {/* ── Label below icon ── */}
      <div className="topic-icon__label">
        <span className="topic-icon__name">{topic.name}</span>
        {total > 0 && (
          <span className="topic-icon__progress">
            {completed}/{total} done
          </span>
        )}
      </div>
    </div>
  );
}
