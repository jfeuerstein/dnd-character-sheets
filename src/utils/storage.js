const STORAGE_KEY = 'dnd_characters';

/**
 * Load characters from localStorage
 * @returns {Array} Array of character objects
 */
export const loadCharacters = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading characters:', error);
    return [];
  }
};

/**
 * Save characters to localStorage
 * @param {Array} characters - Array of character objects
 */
export const saveCharacters = (characters) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
  } catch (error) {
    console.error('Error saving characters:', error);
  }
};

/**
 * Clear all characters from localStorage
 */
export const clearCharacters = () => {
  localStorage.removeItem(STORAGE_KEY);
};
