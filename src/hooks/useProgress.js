/**
 * hooks/useProgress.js
 *
 * Manages the completion state for all DSA patterns.
 * Automatically persists to storage whenever it changes.
 *
 * Shape of `progress`:
 *   {
 *     "arrays": { "sliding-window": true, "two-pointer": false },
 *     "graphs": { "bfs": true },
 *     ...
 *   }
 */

import { useState, useEffect } from "react";
import { loadFromStorage, saveToStorage, StorageKeys } from "../utils/storage";
import { togglePatternComplete } from "../utils/progress";

export function useProgress() {
  // Full progress map — starts empty, hydrated from storage in the effect below
  const [progress, setProgress] = useState({});

  // On mount: load previously saved progress from storage
  useEffect(() => {
    (async () => {
      const saved = await loadFromStorage(StorageKeys.PROGRESS);
      if (saved) setProgress(saved);
    })();
  }, []); // Empty dep array → runs once on mount

  /**
   * Toggle a pattern's completed status, then persist the new state.
   *
   * @param {string} topicId   - e.g. "arrays"
   * @param {string} patternId - e.g. "sliding-window"
   */
  const markComplete = (topicId, patternId) => {
    setProgress((prev) => {
      const updated = togglePatternComplete(prev, topicId, patternId);
      // Fire-and-forget save — errors are caught inside saveToStorage
      saveToStorage(StorageKeys.PROGRESS, updated);
      return updated;
    });
  };

  return { progress, markComplete };
}
