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
  HATSU: 'hatsu',
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

// Hunter x Hunter specific constants
export const NEN_TYPES = {
  ENHANCER: 'enhancer',
  TRANSMUTER: 'transmuter',
  EMITTER: 'emitter',
  CONJURER: 'conjurer',
  MANIPULATOR: 'manipulator',
  SPECIALIST: 'specialist'
};

export const NEN_TYPE_LABELS = {
  [NEN_TYPES.ENHANCER]: 'Enhancer',
  [NEN_TYPES.TRANSMUTER]: 'Transmuter',
  [NEN_TYPES.EMITTER]: 'Emitter',
  [NEN_TYPES.CONJURER]: 'Conjurer',
  [NEN_TYPES.MANIPULATOR]: 'Manipulator',
  [NEN_TYPES.SPECIALIST]: 'Specialist'
};

// HxH Color Schemes (based on the anime's arc aesthetics)
export const NEN_TYPE_COLORS = {
  [NEN_TYPES.ENHANCER]: {
    primary: '#FF6B6B', // Red
    secondary: '#4ECDC4', // Teal
    bg: '#2C2C2C',
    bgLight: '#3A3A3A',
    text: '#FFFFFF',
    accent: '#FFE66D'
  },
  [NEN_TYPES.TRANSMUTER]: {
    primary: '#A8DADC', // Light Blue
    secondary: '#F1FAEE', // Off White
    bg: '#1D3557',
    bgLight: '#2D4567',
    text: '#F1FAEE',
    accent: '#E63946'
  },
  [NEN_TYPES.EMITTER]: {
    primary: '#06FFA5', // Bright Green
    secondary: '#FFFB46', // Yellow
    bg: '#0D1B2A',
    bgLight: '#1B263B',
    text: '#E0E1DD',
    accent: '#06FFA5'
  },
  [NEN_TYPES.CONJURER]: {
    primary: '#B298DC', // Purple
    secondary: '#FFB5E8', // Pink
    bg: '#2B2D42',
    bgLight: '#3B3D52',
    text: '#EDF2F4',
    accent: '#FF006E'
  },
  [NEN_TYPES.MANIPULATOR]: {
    primary: '#FFBA08', // Gold
    secondary: '#D00000', // Dark Red
    bg: '#03071E',
    bgLight: '#1A1A2E',
    text: '#FAA307',
    accent: '#FFBA08'
  },
  [NEN_TYPES.SPECIALIST]: {
    primary: '#7209B7', // Purple
    secondary: '#F72585', // Pink
    bg: '#10002B',
    bgLight: '#240046',
    text: '#E0AAFF',
    accent: '#C77DFF'
  }
};

export const NEN_TECHNIQUES = {
  TEN: 'ten',
  REN: 'ren',
  GYO: 'gyo',
  IN: 'in',
  EN: 'en',
  HATSU: 'hatsu'
};

export const NEN_TECHNIQUE_LABELS = {
  [NEN_TECHNIQUES.TEN]: 'Ten',
  [NEN_TECHNIQUES.REN]: 'Ren',
  [NEN_TECHNIQUES.GYO]: 'Gyo',
  [NEN_TECHNIQUES.IN]: 'In',
  [NEN_TECHNIQUES.EN]: 'En',
  [NEN_TECHNIQUES.HATSU]: 'Hatsu'
};

export const NEN_TECHNIQUE_DESCRIPTIONS = {
  [NEN_TECHNIQUES.TEN]: 'Shroud - Keep aura around body',
  [NEN_TECHNIQUES.REN]: 'Refine - Increase aura output',
  [NEN_TECHNIQUES.GYO]: 'Focus - Concentrate aura to one point',
  [NEN_TECHNIQUES.IN]: 'Conceal - Hide your aura',
  [NEN_TECHNIQUES.EN]: 'Circle - Extend aura to sense area',
  [NEN_TECHNIQUES.HATSU]: 'Release - Personal Nen ability'
};

// Rest types
export const REST_TYPES = {
  SHORT: 'short',
  LONG: 'long',
  FULL: 'full'
};

// Hatsu slot levels (like spell slots)
export const HATSU_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
