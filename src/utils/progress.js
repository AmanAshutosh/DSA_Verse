/**
 * utils/progress.js
 *
 * Pure functions for computing progress statistics.
 * These have no side-effects and are easy to unit-test.
 */

import { DSA_DATA } from "../data/dsaData";

/**
 * Calculate how many patterns a user has completed for a given topic.
 *
 * @param {Object} progress - Full progress object from state
 * @param {string} topicId  - e.g. "arrays"
 * @returns {{ completed: number, total: number, percentage: number }}
 */
export function getTopicProgress(progress, topicId) {
  // Find the topic definition so we know how many patterns it has
  const topic = DSA_DATA.find((t) => t.id === topicId);

  // Guard: topic not found (shouldn't happen but avoids crashes)
  if (!topic) return { completed: 0, total: 0, percentage: 0 };

  const topicProgress = progress[topicId] || {};
  const total     = topic.patterns.length;
  const completed = Object.keys(topicProgress).filter((k) => topicProgress[k]).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
}

/**
 * Return a new progress object with a pattern's completion status toggled.
 * Does NOT mutate the original object.
 *
 * @param {Object} progress  - Current progress state
 * @param {string} topicId   - e.g. "arrays"
 * @param {string} patternId - e.g. "sliding-window"
 * @returns {Object} New progress object with toggle applied
 */
export function togglePatternComplete(progress, topicId, patternId) {
  const topicProgress  = progress[topicId] || {};
  const currentValue   = Boolean(topicProgress[patternId]);

  return {
    ...progress,
    [topicId]: {
      ...topicProgress,
      [patternId]: !currentValue,
    },
  };
}

/**
 * Build a LeetCode problem URL from a question title.
 * LeetCode slugs are lowercase with hyphens replacing non-alphanumerics.
 *
 * @param {string} title - e.g. "Two Sum II - Sorted Array"
 * @returns {string} Full LeetCode URL
 */
export function buildLeetCodeUrl(title) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace anything non-alphanumeric with hyphen
    .replace(/^-|-$/g, "");       // Strip leading/trailing hyphens
  return `https://leetcode.com/problems/${slug}/`;
}
