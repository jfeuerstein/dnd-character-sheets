/**
 * Application constants
 */

// Dice types
export const DICE_TYPES = {
  D4: 4,
  D6: 6,
  D8: 8,
  D10: 10,
  D12: 12,
  D20: 20,
  D100: 100
};

// Ability scores
export const ABILITIES = {
  STR: 'str',
  DEX: 'dex',
  CON: 'con',
  INT: 'int',
  WIS: 'wis',
  CHA: 'cha'
};

export const ABILITY_NAMES = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  int: 'Intelligence',
  wis: 'Wisdom',
  cha: 'Charisma'
};

// Default values
export const DEFAULTS = {
  ABILITY_SCORE: 10,
  STARTING_HP: 10,
  STARTING_AC: 10,
  STARTING_LEVEL: 1,
  PROFICIENCY_BONUS: 2
};

// Roll display duration (ms)
export const ROLL_DISPLAY_DURATION = 3000;

// localStorage keys
export const STORAGE_KEYS = {
  CHARACTERS: 'dnd_characters',
  SETTINGS: 'dnd_settings'
};

// View modes
export const VIEWS = {
  LIST: 'list',
  VIEW: 'view',
  EDIT: 'edit'
};

// Action categories
export const ACTION_CATEGORIES = {
  ACTION: 'action',
  BONUS_ACTION: 'bonus action',
  REACTION: 'reaction',
  OTHER: 'other'
};

// Action types
export const ACTION_TYPES = {
  ATTACK: 'attack',
  SPELL: 'spell',
  FEATURE: 'feature',
  OTHER: 'other'
};

// Action category labels
export const ACTION_CATEGORY_LABELS = {
  [ACTION_CATEGORIES.ACTION]: 'Action',
  [ACTION_CATEGORIES.BONUS_ACTION]: 'Bonus Action',
  [ACTION_CATEGORIES.REACTION]: 'Reaction',
  [ACTION_CATEGORIES.OTHER]: 'Other'
};

// Dice options for rolls
export const DICE_OPTIONS = [
  { value: 4, label: 'd4' },
  { value: 6, label: 'd6' },
  { value: 8, label: 'd8' },
  { value: 10, label: 'd10' },
  { value: 12, label: 'd12' },
  { value: 20, label: 'd20' },
  { value: 100, label: 'd100' }
];
