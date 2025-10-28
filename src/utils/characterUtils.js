import { DEFAULTS, ABILITIES, SKILLS, PROFICIENCY_LEVELS, SKILL_ABILITIES } from '../constants';

/**
 * Calculate ability score modifier
 * @param {number} score - The ability score (3-20+)
 * @returns {string} Formatted modifier string (e.g., "+3", "-1")
 */
export const calculateModifier = (score) => {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
};

/**
 * Get raw modifier value (number)
 * @param {number} score - The ability score
 * @returns {number} Raw modifier value
 */
export const getModifierValue = (score) => {
  return Math.floor((score - 10) / 2);
};

/**
 * Calculate skill modifier
 * @param {Object} character - Character object
 * @param {string} skill - Skill name
 * @returns {number} Skill modifier
 */
export const calculateSkillModifier = (character, skill) => {
  const ability = SKILL_ABILITIES[skill];
  const abilityMod = getModifierValue(character.stats[ability]);
  const proficiency = character.skills[skill];
  
  let bonus = abilityMod;
  
  if (proficiency === PROFICIENCY_LEVELS.PROFICIENT) {
    bonus += character.proficiencyBonus;
  } else if (proficiency === PROFICIENCY_LEVELS.EXPERTISE) {
    bonus += character.proficiencyBonus * 2;
  }
  
  return bonus;
};

/**
 * Get effective ability scores (with feature modifiers)
 * @param {Object} character - Character object
 * @returns {Object} Effective ability scores
 */
export const getEffectiveStats = (character) => {
  const effectiveStats = { ...character.stats };
  
  // Apply modifiers from features
  character.features?.forEach(feature => {
    if (feature.abilityModifiers) {
      Object.entries(feature.abilityModifiers).forEach(([ability, modifier]) => {
        effectiveStats[ability] = (effectiveStats[ability] || 0) + modifier;
      });
    }
  });
  
  return effectiveStats;
};

/**
 * Create a new blank character
 * @param {boolean} isHxH - Whether to create a Hunter x Hunter character
 * @returns {Object} New character object
 */
export const createBlankCharacter = (isHxH = false) => ({
  id: Date.now(),
  name: 'new character',
  level: DEFAULTS.STARTING_LEVEL,
  race: '',
  class: '',
  background: '',
  stats: Object.values(ABILITIES).reduce((acc, ability) => {
    acc[ability] = DEFAULTS.ABILITY_SCORE;
    return acc;
  }, {}),
  hp: { current: DEFAULTS.STARTING_HP, max: DEFAULTS.STARTING_HP, temp: 0 },
  ac: DEFAULTS.STARTING_AC,
  proficiencyBonus: DEFAULTS.PROFICIENCY_BONUS,
  skills: Object.values(SKILLS).reduce((acc, skill) => {
    acc[skill] = PROFICIENCY_LEVELS.NONE;
    return acc;
  }, {}),
  savingThrows: {},
  actions: [],
  inventory: [],
  features: [],
  notes: '',
  // Hunter x Hunter specific
  isHxH: isHxH,
  nenType: isHxH ? '' : undefined,
  hatsuSlots: isHxH ? {
    1: { max: 2, current: 2 },
    2: { max: 0, current: 0 },
    3: { max: 0, current: 0 },
    4: { max: 0, current: 0 },
    5: { max: 0, current: 0 },
    6: { max: 0, current: 0 },
    7: { max: 0, current: 0 },
    8: { max: 0, current: 0 },
    9: { max: 0, current: 0 }
  } : undefined
});

/**
 * Export character to JSON file
 * @param {Object} character - Character object to export
 */
export const exportCharacterToFile = (character) => {
  const dataStr = JSON.stringify(character, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${character.name.replace(/\s+/g, '_')}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Export all campaign data to JSON file
 * @param {Array} characters - Array of character objects
 */
export const exportAllData = (characters) => {
  const allData = {
    characters,
    exportDate: new Date().toISOString()
  };
  const dataStr = JSON.stringify(allData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'campaign_data.json';
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Import character from file
 * @param {File} file - File object to import
 * @param {Function} onSuccess - Callback on successful import
 * @param {Function} onError - Callback on error
 */
export const importCharacterFromFile = (file, onSuccess, onError) => {
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      imported.id = Date.now(); // Assign new ID to avoid conflicts
      onSuccess(imported);
    } catch (error) {
      onError(error);
    }
  };
  reader.readAsText(file);
};
