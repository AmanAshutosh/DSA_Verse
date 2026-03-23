/**
 * WindowSidebar.jsx
 *
 * Left panel inside each topic window:
 *   - Topic mini-header (icon + name + pattern count)
 *   - Progress bar
 *   - Search input
 *   - Clickable pattern list with completion checkmarks
 *
 * Props:
 *   topic       {Object}   - Topic data (id, name, emoji, color, patterns)
 *   activeId    {string}   - Currently selected pattern id
 *   onSelect    {fn}       - Called with patternId when a pattern is clicked
 *   progress    {Object}   - Full progress state
 *   search      {string}   - Current search query string
 *   onSearch    {fn}       - Called with new search string on input change
 *   completed   {number}   - Number of completed patterns
 *   total       {number}   - Total patterns for this topic
 *   percentage  {number}   - 0-100 completion percentage
 */

import React from "react";
import "./WindowSidebar.css";

export default function WindowSidebar({
  topic,
  activeId,
  onSelect,
  progress,
  search,
  onSearch,
  completed,
  total,
  percentage,
}) {
  // Patterns filtered by the search query
  const filteredPatterns = topic.patterns.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="sidebar">
      {/* ── Topic mini-header ── */}
      <div className="sidebar__header">
        <div className="sidebar__topic-info">
          {/* Coloured icon matching the desktop grid icon */}
          <div
            className="sidebar__icon"
            style={{
              background: `linear-gradient(135deg, ${topic.color}cc, ${topic.color}66)`,
            }}
          >
            {topic.emoji}
          </div>

          <div>
            <div className="sidebar__topic-name">{topic.name}</div>
            <div className="sidebar__pattern-count">
              {completed}/{total} patterns
            </div>
          </div>
        </div>

        {/* Thin progress bar */}
        <div className="sidebar__progress-track">
          <div
            className="sidebar__progress-fill"
            style={{
              width:      `${percentage}%`,
              background: topic.color,
            }}
          />
        </div>

        {/* Pattern search input */}
        <input
          type="text"
          className="sidebar__search"
          placeholder="Search patterns…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* ── Pattern list ── */}
      <ul className="sidebar__list">
        {filteredPatterns.map((pattern) => {
          const isActive = pattern.id === activeId;
          const isDone   = Boolean(progress[topic.id]?.[pattern.id]);

          return (
            <li
              key={pattern.id}
              className={`sidebar__item ${isActive ? "sidebar__item--active" : ""}`}
              style={
                isActive
                  ? { background: `${topic.color}22`, borderColor: `${topic.color}44` }
                  : {}
              }
              onClick={() => onSelect(pattern.id)}
            >
              {/* Completion circle (empty ring → filled checkmark) */}
              <span
                className={`sidebar__check ${isDone ? "sidebar__check--done" : ""}`}
                style={
                  isDone
                    ? { background: topic.color, borderColor: topic.color }
                    : { borderColor: "rgba(255,255,255,0.15)" }
                }
              >
                {isDone && "✓"}
              </span>

              <span className={`sidebar__pattern-name ${isActive ? "sidebar__pattern-name--active" : ""}`}>
                {pattern.name}
              </span>
            </li>
          );
        })}

        {/* Empty state when search returns nothing */}
        {filteredPatterns.length === 0 && (
          <li className="sidebar__empty">No patterns found</li>
        )}
      </ul>
    </aside>
  );
}
