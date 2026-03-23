/**
 * PatternView.jsx
 *
 * Displays the full learning content for a single DSA pattern.
 * Three tabs:
 *   - Theory     : plain-text explanation with paragraph support
 *   - Code       : JavaScript example inside a CodeBlock
 *   - Questions  : 12 LeetCode problems filterable by difficulty
 *
 * Props:
 *   pattern     {Object}   - Pattern data from dsaData.js
 *   isCompleted {boolean}  - Whether this pattern is marked done
 *   onComplete  {fn}       - Toggle completion status
 */

import React, { useState } from "react";
import CodeBlock from "./CodeBlock";
import QuestionCard from "./QuestionCard";
import "./PatternView.css";

/** Tab identifiers */
const TABS = ["theory", "code", "questions"];

/** Difficulty filter options */
const DIFF_FILTERS = ["all", "easy", "medium", "hard"];

export default function PatternView({ pattern, isCompleted, onComplete }) {
  const [activeTab, setActiveTab] = useState("theory");
  const [diffFilter, setDiffFilter] = useState("all");

  // Flatten all questions into one array with diff label attached
  const allQuestions = [
    ...pattern.questions.easy.map((q) => ({ ...q, diff: "easy" })),
    ...pattern.questions.medium.map((q) => ({ ...q, diff: "medium" })),
    ...pattern.questions.hard.map((q) => ({ ...q, diff: "hard" })),
  ];

  // Apply difficulty filter
  const visibleQuestions =
    diffFilter === "all"
      ? allQuestions
      : allQuestions.filter((q) => q.diff === diffFilter);

  return (
    <div className="pattern-view">
      {/* ── Header: title + Mark Complete ── */}
      <div className="pattern-view__header">
        <h2 className="pattern-view__title">{pattern.name}</h2>

        <button
          className={`pattern-view__complete-btn ${isCompleted ? "pattern-view__complete-btn--done" : ""}`}
          onClick={onComplete}
        >
          {isCompleted ? "✓ Completed" : "Mark Complete"}
        </button>
      </div>

      {/* ── Tab navigation ── */}
      <div className="pattern-view__tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`pattern-view__tab ${activeTab === tab ? "pattern-view__tab--active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {/* Capitalise first letter for display */}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ── Tab content area ── */}
      <div className="pattern-view__content">
        {/* THEORY TAB — theory string contains \n for paragraph breaks */}
        {activeTab === "theory" && (
          <div className="pattern-view__theory">
            {pattern.theory.split("\n").map((line, i) => (
              <p
                key={i}
                className={`pattern-view__para ${line.startsWith("•") ? "pattern-view__para--bullet" : ""}`}
              >
                {line}
              </p>
            ))}
          </div>
        )}

        {/* CODE TAB */}
        {activeTab === "code" && <CodeBlock code={pattern.example} />}

        {/* QUESTIONS TAB */}
        {activeTab === "questions" && (
          <div>
            {/* Difficulty filter pills */}
            <div className="pattern-view__filters">
              {DIFF_FILTERS.map((diff) => (
                <button
                  key={diff}
                  className={`pattern-view__filter-btn ${diffFilter === diff ? "pattern-view__filter-btn--active" : ""}`}
                  data-diff={diff} /* Used by CSS for colour theming */
                  onClick={() => setDiffFilter(diff)}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </button>
              ))}
            </div>

            {/* Question cards list */}
            <div className="pattern-view__questions">
              {visibleQuestions.map((q) => (
                <QuestionCard key={q.id} question={q} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
