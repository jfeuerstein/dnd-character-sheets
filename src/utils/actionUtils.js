import { ACTION_CATEGORIES, ACTION_TYPES } from '../constants';

/**
 * Create a new blank attack action
 * @returns {Object} New attack action object
 */
export const createBlankAttack = () => ({
  id: Date.now(),
  name: '',
  type: ACTION_TYPES.ATTACK,
  category: ACTION_CATEGORIES.ACTION,
  abilityScore: 'str',
  isProficient: false,
  damageRoll: {
    count: 1,
    die: 6,
    modifier: 0
  },
  description: '',
  uses: {
    enabled: false,
    current: 0,
    max: 0,
    resetOn: 'long' // short, long, full
  }
});

/**
 * Create a new blank spell action
 * @returns {Object} New spell action object
 */
export const createBlankSpell = () => ({
  id: Date.now(),
  name: '',
  type: ACTION_TYPES.SPELL,
  category: ACTION_CATEGORIES.ACTION,
  level: 0,
  effect: '',
  roll: {
    enabled: false,
    count: 1,
    die: 6,
    modifier: 0
  },
  description: '',
  uses: {
    enabled: false,
    current: 0,
    max: 0,
    resetOn: 'long'
  }
});

/**
 * Create a new blank feature action
 * @returns {Object} New feature action object
 */
export const createBlankFeature = () => ({
  id: Date.now(),
  name: '',
  type: ACTION_TYPES.FEATURE,
  category: ACTION_CATEGORIES.ACTION,
  description: '',
  uses: {
    enabled: false,
    current: 0,
    max: 0,
    resetOn: 'long'
  }
});

/**
 * Create a new blank Hatsu action (Hunter x Hunter)
 * @returns {Object} New Hatsu action object
 */
export const createBlankHatsu = () => ({
  id: Date.now(),
  name: '',
  type: ACTION_TYPES.HATSU,
  category: ACTION_CATEGORIES.ACTION,
  auraCost: 0,
  effect: '',
  roll: {
    enabled: false,
    count: 1,
    die: 6,
    modifier: 0
  },
  description: '',
  conditions: '',
  limitations: '',
  uses: {
    enabled: false,
    current: 0,
    max: 0,
    resetOn: 'long'
  }
});

/**
 * Calculate attack hit roll bonus
 * @param {Object} attack - Attack action object
 * @param {Object} stats - Character stats object
 * @param {number} proficiencyBonus - Character proficiency bonus
 * @returns {number} Hit roll bonus
 */
export const calculateAttackBonus = (attack, stats, proficiencyBonus) => {
  const abilityMod = Math.floor((stats[attack.abilityScore] - 10) / 2);
  const profBonus = attack.isProficient ? proficiencyBonus : 0;
  return abilityMod + profBonus;
};

/**
 * Calculate attack damage modifier
 * @param {Object} attack - Attack action object
 * @param {Object} stats - Character stats object
 * @returns {number} Damage modifier
 */
export const calculateDamageModifier = (attack, stats) => {
  const abilityMod = Math.floor((stats[attack.abilityScore] - 10) / 2);
  return abilityMod + (attack.damageRoll.modifier || 0);
};

/**
 * Format dice roll notation
 * @param {number} count - Number of dice
 * @param {number} die - Die type
 * @param {number} modifier - Modifier to add
 * @returns {string} Formatted dice notation (e.g., "2d6+3")
 */
export const formatDiceNotation = (count, die, modifier = 0) => {
  const base = `${count}d${die}`;
  if (modifier === 0) return base;
  const sign = modifier > 0 ? '+' : '';
  return `${base}${sign}${modifier}`;
};

/**
 * Group actions by category
 * @param {Array} actions - Array of action objects
 * @returns {Object} Actions grouped by category
 */
export const groupActionsByCategory = (actions) => {
  return actions.reduce((acc, action) => {
    const category = action.category || ACTION_CATEGORIES.ACTION;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(action);
    return acc;
  }, {});
};
