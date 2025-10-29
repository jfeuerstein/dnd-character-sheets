import { getDemoCharacters } from './demoCharacters';

const STORAGE_KEY = 'dnd_characters';
const DEMO_LOADED_KEY = 'dnd_demo_loaded';

/**
 * Load characters from localStorage
 * @returns {Array} Array of character objects
 */
export const loadCharacters = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const demoLoaded = localStorage.getItem(DEMO_LOADED_KEY);
    
    console.log('Loading characters...', { saved: !!saved, demoLoaded });
    
    let parsed = [];
    if (saved) {
      try {
        parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) {
          console.warn('Saved characters is not an array, resetting');
          parsed = [];
        }
      } catch (e) {
        console.warn('Failed to parse saved characters, resetting');
        parsed = [];
      }
    }
    
    // If no characters exist and demo hasn't been loaded, load demo characters
    if (parsed.length === 0 && !demoLoaded) {
      console.log('Loading demo characters...');
      const demoChars = getDemoCharacters();
      console.log('Demo characters loaded (detailed):', {
        count: demoChars.length,
        characters: demoChars
      });
      
      // Save demo characters and return them
      saveCharacters(demoChars);
      localStorage.setItem(DEMO_LOADED_KEY, 'true');
      return demoChars;
    }
    
    return parsed;
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
