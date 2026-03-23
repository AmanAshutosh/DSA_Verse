/**
 * AppGrid.jsx
 *
 * Renders all topic icons in a responsive 4-column grid, centred
 * on the desktop between the MenuBar (top) and Dock (bottom).
 *
 * Props:
 *   topics   {Array}    - Full DSA_DATA array
 *   openIds  {string[]} - IDs of topics that currently have open windows
 *   progress {Object}   - Full progress state from useProgress
 *   onOpen   {fn}       - Called with topicId when an icon is clicked
 */

import React from "react";
import TopicIcon from "../TopicIcon/TopicIcon";
import { getTopicProgress } from "../../utils/progress";
import "./AppGrid.css";

export default function AppGrid({ topics, openIds, progress, onOpen }) {
  return (
    /* Outer wrapper: full-screen overlay that centres the grid
       pointer-events:none on wrapper, restored on the grid itself */
    <div className="app-grid__overlay">
      <div className="app-grid">
        {topics.map((topic) => (
          <TopicIcon
            key={topic.id}
            topic={topic}
            isOpen={openIds.includes(topic.id)}
            onClick={() => onOpen(topic.id)}
            progress={getTopicProgress(progress, topic.id)}
          />
        ))}
      </div>
    </div>
  );
}
