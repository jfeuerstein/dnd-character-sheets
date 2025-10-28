import { ACTION_CATEGORIES, ACTION_TYPES } from '../constants';

/**
 * Migrate old spell format to new actions format
 * @param {Object} character - Character with old spell format
 * @returns {Object} Character with new actions format
 */
export const migrateSpellsToActions = (character) => {
  // If character already has actions, don't migrate
  if (character.actions) {
    return character;
  }

  // Initialize actions array
  const actions = [];

  // Migrate spells if they exist
  if (character.spells && character.spells.known) {
    character.spells.known.forEach(spell => {
      actions.push({
        id: Date.now() + Math.random(), // Unique ID
        name: spell.name || '',
        type: ACTION_TYPES.SPELL,
        category: ACTION_CATEGORIES.ACTION,
        level: spell.level || 0,
        effect: '',
        roll: {
          enabled: false,
          count: 1,
          die: 6,
          modifier: 0
        },
        description: spell.description || ''
      });
    });
  }

  // Return migrated character
  return {
    ...character,
    actions,
    // Keep old spells data for backwards compatibility
    spells: character.spells || { slots: {}, known: [], prepared: [] }
  };
};

/**
 * Migrate all characters in an array
 * @param {Array} characters - Array of characters
 * @returns {Array} Migrated characters
 */
export const migrateAllCharacters = (characters) => {
  return characters.map(migrateSpellsToActions);
};

/**
 * Check if character needs migration
 * @param {Object} character - Character to check
 * @returns {boolean} True if migration needed
 */
export const needsMigration = (character) => {
  return !character.actions && character.spells && character.spells.known && character.spells.known.length > 0;
};
