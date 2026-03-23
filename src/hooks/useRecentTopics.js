/**
 * hooks/useRecentTopics.js
 *
 * Tracks the last N topics the user has opened so the Dock
 * can surface them for quick access.
 * Persists to storage across page reloads.
 */

import { useState, useEffect } from "react";
import { loadFromStorage, saveToStorage, StorageKeys } from "../utils/storage";
import { DOCK_MAX_ITEMS } from "../constants";

export function useRecentTopics() {
  // Ordered list of topic IDs, most-recent first
  const [recentIds, setRecentIds] = useState([]);

  // On mount: restore saved recent list
  useEffect(() => {
    (async () => {
      const saved = await loadFromStorage(StorageKeys.RECENT);
      if (Array.isArray(saved)) setRecentIds(saved);
    })();
  }, []);

  /**
   * Record that a topic was just opened.
   * Moves it to the front and trims to DOCK_MAX_ITEMS.
   *
   * @param {string} topicId - e.g. "arrays"
   */
  const addRecent = (topicId) => {
    setRecentIds((prev) => {
      // Remove existing occurrence, prepend, cap at limit
      const updated = [
        topicId,
        ...prev.filter((id) => id !== topicId),
      ].slice(0, DOCK_MAX_ITEMS);

      saveToStorage(StorageKeys.RECENT, updated);
      return updated;
    });
  };

  return { recentIds, addRecent };
}
