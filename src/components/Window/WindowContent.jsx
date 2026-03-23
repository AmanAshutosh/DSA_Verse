/**
 * WindowContent.jsx
 *
 * The inner body of a topic window.
 * Splits into two columns:
 *   LEFT  (200 px) — WindowSidebar (pattern list + search)
 *   RIGHT (flex)   — PatternView (theory / code / questions)
 *
 * Owns the "which pattern is selected" and "search text" state
 * because these are purely UI concerns local to one window.
 *
 * Props:
 *   topic      {Object} - Topic data object
 *   progress   {Object} - Full progress state
 *   onComplete {fn}     - (topicId, patternId) → toggle completion
 */

import React, { useState } from "react";
import WindowSidebar from "./WindowSidebar";
import PatternView   from "../PatternView/PatternView";
import { getTopicProgress } from "../../utils/progress";
import "./WindowContent.css";

export default function WindowContent({ topic, progress, onComplete }) {
  // Which pattern the right panel should display
  const [activePatternId, setActivePatternId] = useState(
    topic.patterns[0]?.id ?? null
  );

  // Search text typed into the sidebar search input
  const [search, setSearch] = useState("");

  // Lookup the active pattern object (guard against null)
  const activePattern = topic.patterns.find((p) => p.id === activePatternId)
    ?? topic.patterns[0]
    ?? null;

  // Computed progress stats for this topic
  const { completed, total, percentage } = getTopicProgress(progress, topic.id);

  return (
    <div className="window-content">
      {/* ── Left: pattern list sidebar ── */}
      <WindowSidebar
        topic={topic}
        activeId={activePatternId}
        onSelect={setActivePatternId}
        progress={progress}
        search={search}
        onSearch={setSearch}
        completed={completed}
        total={total}
        percentage={percentage}
      />

      {/* ── Right: pattern learning content ── */}
      <div className="window-content__main">
        {activePattern ? (
          <PatternView
            /* key forces a full re-mount when switching patterns,
               resetting the active tab back to "theory" */
            key={activePattern.id}
            pattern={activePattern}
            isCompleted={Boolean(progress[topic.id]?.[activePattern.id])}
            onComplete={() => onComplete(topic.id, activePattern.id)}
          />
        ) : (
          <div className="window-content__empty">
            No patterns match your search
          </div>
        )}
      </div>
    </div>
  );
}
