/**
 * utils/storage.js
 *
 * Thin wrapper around the `window.storage` API (provided by Claude artifacts).
 * All reads and writes go through here so:
 *   1. Error handling is centralised — one try/catch instead of many.
 *   2. JSON serialisation/deserialisation is handled in one place.
 *   3. If you ever swap to localStorage, you only change this file.
 */

/** Keys used to store data — change a key name here if you need to reset stored data */
export const StorageKeys = {
  PROGRESS: "dsa_progress",   // {topicId: {patternId: boolean}}
  RECENT:   "dsa_recent",     // string[] of recently-opened topic IDs
};

/**
 * Load a value from storage and parse it as JSON.
 *
 * @param {string} key - One of the StorageKeys values
 * @returns {Promise<any|null>} Parsed value, or null if missing / on error
 */
export async function loadFromStorage(key) {
  try {
    const result = await window.storage.get(key);
    if (result?.value) {
      return JSON.parse(result.value);
    }
    return null;
  } catch (error) {
    // Non-fatal: app continues with default state
    console.warn(`[storage] Failed to load "${key}":`, error);
    return null;
  }
}

/**
 * Serialise a value as JSON and save it to storage.
 *
 * @param {string} key   - One of the StorageKeys values
 * @param {any}    value - Any JSON-serialisable value
 * @returns {Promise<boolean>} true on success, false on failure
 */
export async function saveToStorage(key, value) {
  try {
    await window.storage.set(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`[storage] Failed to save "${key}":`, error);
    return false;
  }
}
