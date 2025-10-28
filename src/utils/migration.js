import { ACTION_CATEGORIES, ACTION_TYPES, SKILLS, PROFICIENCY_LEVELS } from '../constants';

/**
 * Migrate old spell format to new actions format
 * @param {Object} character - Character with old spell format
 * @returns {Object} Character with new actions format
 */
export const migrateSpellsToActions = (character) => {
  // If character already has actions, check for other migrations
  let migrated = { ...character };
  
  // Migrate spells to actions if needed
  if (!character.actions && character.spells && character.spells.known) {
    const actions = [];
    character.spells.known.forEach(spell => {
      actions.push({
        id: Date.now() + Math.random(),
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
    migrated.actions = actions;
  }

  // Migrate old aura to hatsu slots for HxH characters
  if (migrated.isHxH && migrated.aura && !migrated.hatsuSlots) {
    migrated.hatsuSlots = {
      1: { max: 2, current: 2 },
      2: { max: 0, current: 0 },
      3: { max: 0, current: 0 },
      4: { max: 0, current: 0 },
      5: { max: 0, current: 0 },
      6: { max: 0, current: 0 },
      7: { max: 0, current: 0 },
      8: { max: 0, current: 0 },
      9: { max: 0, current: 0 }
    };
    delete migrated.aura;
  }

  // Keep old spells data for backwards compatibility
  if (!migrated.spells) {
    migrated.spells = { slots: {}, known: [], prepared: [] };
  }

  // Initialize skills for old characters
  if (!migrated.skills || typeof migrated.skills !== 'object' || Object.keys(migrated.skills).length === 0) {
    migrated.skills = Object.values(SKILLS).reduce((acc, skill) => {
      acc[skill] = PROFICIENCY_LEVELS.NONE;
      return acc;
    }, {});
  }

  // Remove old nenTechniques if it exists (replaced by automatic progression)
  if (migrated.isHxH && migrated.nenTechniques) {
    delete migrated.nenTechniques;
  }

  return migrated;
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
