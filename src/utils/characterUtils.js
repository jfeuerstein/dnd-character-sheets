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
  savingThrows: Object.values(ABILITIES).reduce((acc, ability) => {
    acc[ability] = false;
    return acc;
  }, {}),
  hitDice: {
    current: DEFAULTS.STARTING_LEVEL,
    max: DEFAULTS.STARTING_LEVEL,
    size: 8 // d8 default, should be customized per class
  },
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

/**
 * Calculate saving throw modifier
 * @param {Object} character - Character object
 * @param {string} ability - Ability score key (str, dex, etc.)
 * @returns {number} Saving throw modifier
 */
export const calculateSavingThrow = (character, ability) => {
  const effectiveStats = getEffectiveStats(character);
  const abilityMod = getModifierValue(effectiveStats[ability]);
  const isProficient = character.savingThrows?.[ability] || false;
  
  return abilityMod + (isProficient ? character.proficiencyBonus : 0);
};

/**
 * Perform a short rest
 * @param {Object} character - Character object
 * @param {number} hitDiceUsed - Number of hit dice to spend
 * @returns {Object} Updated character and rest results
 */
export const performShortRest = (character, hitDiceUsed = 0) => {
  const updated = { ...character };
  const results = {
    hpRestored: 0,
    hitDiceSpent: 0,
    actionsRestored: [],
    hatsuSlotsRestored: []
  };

  // Initialize hit dice if not present
  if (!updated.hitDice) {
    updated.hitDice = {
      current: updated.level,
      max: updated.level,
      size: 8 // default d8, should be based on class
    };
  }

  // Spend hit dice to restore HP
  if (hitDiceUsed > 0 && updated.hitDice.current >= hitDiceUsed) {
    const conMod = getModifierValue(updated.stats.con);
    for (let i = 0; i < hitDiceUsed; i++) {
      // Roll hit die + CON modifier (minimum 1)
      const roll = Math.floor(Math.random() * updated.hitDice.size) + 1;
      const healing = Math.max(1, roll + conMod);
      updated.hp.current = Math.min(updated.hp.max, updated.hp.current + healing);
      results.hpRestored += healing;
      updated.hitDice.current -= 1;
      results.hitDiceSpent += 1;
    }
  }

  // Restore actions with "short" rest reset
  if (updated.actions) {
    updated.actions = updated.actions.map(action => {
      if (action.uses?.enabled && action.uses.resetOn === 'short') {
        results.actionsRestored.push(action.name);
        return { ...action, uses: { ...action.uses, current: action.uses.max } };
      }
      return action;
    });
  }

  return { character: updated, results };
};

/**
 * Perform a long rest
 * @param {Object} character - Character object
 * @returns {Object} Updated character and rest results
 */
export const performLongRest = (character) => {
  const updated = { ...character };
  const results = {
    hpRestored: 0,
    hitDiceRestored: 0,
    actionsRestored: [],
    hatsuSlotsRestored: []
  };

  // Restore HP to max
  const hpHealed = updated.hp.max - updated.hp.current;
  updated.hp.current = updated.hp.max;
  results.hpRestored = hpHealed;

  // Initialize hit dice if not present
  if (!updated.hitDice) {
    updated.hitDice = {
      current: updated.level,
      max: updated.level,
      size: 8
    };
  }

  // Restore hit dice (at least 1, up to half of max)
  const hitDiceToRestore = Math.max(1, Math.floor(updated.hitDice.max / 2));
  const restored = Math.min(hitDiceToRestore, updated.hitDice.max - updated.hitDice.current);
  updated.hitDice.current += restored;
  results.hitDiceRestored = restored;

  // Restore actions with "short" or "long" rest reset
  if (updated.actions) {
    updated.actions = updated.actions.map(action => {
      if (action.uses?.enabled && (action.uses.resetOn === 'short' || action.uses.resetOn === 'long')) {
        results.actionsRestored.push(action.name);
        return { ...action, uses: { ...action.uses, current: action.uses.max } };
      }
      return action;
    });
  }

  // Restore Hatsu slots for HxH characters
  if (updated.isHxH && updated.hatsuSlots) {
    Object.keys(updated.hatsuSlots).forEach(level => {
      if (updated.hatsuSlots[level].max > 0) {
        const restored = updated.hatsuSlots[level].max - updated.hatsuSlots[level].current;
        if (restored > 0) {
          updated.hatsuSlots[level].current = updated.hatsuSlots[level].max;
          results.hatsuSlotsRestored.push(`Level ${level}`);
        }
      }
    });
  }

  return { character: updated, results };
};
