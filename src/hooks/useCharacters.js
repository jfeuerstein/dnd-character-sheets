import { useState, useEffect } from 'react';
import { loadCharacters, saveCharacters } from '../utils/storage';
import { migrateAllCharacters } from '../utils/migration';

/**
 * Custom hook for managing characters with localStorage persistence
 * @returns {Object} Character state and management functions
 */
export const useCharacters = () => {
  const [characters, setCharacters] = useState([]);

  // Load characters on mount
  useEffect(() => {
    const loaded = loadCharacters();
    // Migrate old spell format to new actions format
    const migrated = migrateAllCharacters(loaded);
    setCharacters(migrated);
  }, []);

  // Save characters whenever they change
  useEffect(() => {
    saveCharacters(characters);
  }, [characters]);

  /**
   * Add a new character
   * @param {Object} character - Character object to add
   */
  const addCharacter = (character) => {
    setCharacters([...characters, character]);
  };

  /**
   * Update an existing character
   * @param {Object} updatedCharacter - Updated character object
   */
  const updateCharacter = (updatedCharacter) => {
    setCharacters(
      characters.map(char => 
        char.id === updatedCharacter.id ? updatedCharacter : char
      )
    );
  };

  /**
   * Delete a character by ID
   * @param {number} id - Character ID to delete
   */
  const deleteCharacter = (id) => {
    setCharacters(characters.filter(char => char.id !== id));
  };

  /**
   * Get a character by ID
   * @param {number} id - Character ID
   * @returns {Object|undefined} Character object or undefined
   */
  const getCharacter = (id) => {
    return characters.find(char => char.id === id);
  };

  return {
    characters,
    setCharacters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacter
  };
};
