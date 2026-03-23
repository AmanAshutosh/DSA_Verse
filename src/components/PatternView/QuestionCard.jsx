/**
 * QuestionCard.jsx
 *
 * Renders one LeetCode problem as a clickable card.
 * Clicking opens the problem on LeetCode in a new tab.
 *
 * Props:
 *   question {Object} - { id, title, lc, desc, diff }
 *                       diff is one of "easy" | "medium" | "hard"
 */

import React from "react";
import { DIFF_COLORS, DIFF_BG } from "../../constants";
import { buildLeetCodeUrl } from "../../utils/progress";
import "./QuestionCard.css";

export default function QuestionCard({ question }) {
  const { title, lc, desc, diff } = question;

  return (
    <a
      href={buildLeetCodeUrl(title)}
      target="_blank"
      rel="noopener noreferrer"
      className="question-card"
    >
      {/* ── Top row: difficulty badge + LC number + arrow ── */}
      <div className="question-card__meta">
        {/* Difficulty badge — colour controlled via inline style (data-driven) */}
        <span
          className="question-card__badge"
          style={{
            color: DIFF_COLORS[diff],
            background: DIFF_BG[diff],
          }}
        >
          {diff.toUpperCase()}
        </span>

        <span className="question-card__lc">LC #{lc}</span>

        {/* External-link indicator */}
        <span className="question-card__arrow">↗</span>
      </div>

      {/* ── Problem title ── */}
      <div className="question-card__title">{title}</div>

      {/* ── Short description ── */}
      <div className="question-card__desc">{desc}</div>
    </a>
  );
}
