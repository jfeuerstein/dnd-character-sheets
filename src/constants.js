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

// Skills
export const SKILLS = {
  ACROBATICS: 'acrobatics',
  ANIMAL_HANDLING: 'animal_handling',
  ARCANA: 'arcana',
  ATHLETICS: 'athletics',
  DECEPTION: 'deception',
  HISTORY: 'history',
  INSIGHT: 'insight',
  INTIMIDATION: 'intimidation',
  INVESTIGATION: 'investigation',
  MEDICINE: 'medicine',
  NATURE: 'nature',
  PERCEPTION: 'perception',
  PERFORMANCE: 'performance',
  PERSUASION: 'persuasion',
  RELIGION: 'religion',
  SLEIGHT_OF_HAND: 'sleight_of_hand',
  STEALTH: 'stealth',
  SURVIVAL: 'survival'
};

export const SKILL_NAMES = {
  acrobatics: 'Acrobatics',
  animal_handling: 'Animal Handling',
  arcana: 'Arcana',
  athletics: 'Athletics',
  deception: 'Deception',
  history: 'History',
  insight: 'Insight',
  intimidation: 'Intimidation',
  investigation: 'Investigation',
  medicine: 'Medicine',
  nature: 'Nature',
  perception: 'Perception',
  performance: 'Performance',
  persuasion: 'Persuasion',
  religion: 'Religion',
  sleight_of_hand: 'Sleight of Hand',
  stealth: 'Stealth',
  survival: 'Survival'
};

export const SKILL_ABILITIES = {
  acrobatics: 'dex',
  animal_handling: 'wis',
  arcana: 'int',
  athletics: 'str',
  deception: 'cha',
  history: 'int',
  insight: 'wis',
  intimidation: 'cha',
  investigation: 'int',
  medicine: 'wis',
  nature: 'int',
  perception: 'wis',
  performance: 'cha',
  persuasion: 'cha',
  religion: 'int',
  sleight_of_hand: 'dex',
  stealth: 'dex',
  survival: 'wis'
};

export const PROFICIENCY_LEVELS = {
  NONE: 'none',
  PROFICIENT: 'proficient',
  EXPERTISE: 'expertise'
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
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    bg: '#2C2C2C',
    bgLight: '#3A3A3A',
    text: '#FFFFFF',
    accent: '#FFE66D'
  },
  [NEN_TYPES.TRANSMUTER]: {
    primary: '#A8DADC',
    secondary: '#F1FAEE',
    bg: '#1D3557',
    bgLight: '#2D4567',
    text: '#F1FAEE',
    accent: '#E63946'
  },
  [NEN_TYPES.EMITTER]: {
    primary: '#06FFA5',
    secondary: '#FFFB46',
    bg: '#0D1B2A',
    bgLight: '#1B263B',
    text: '#E0E1DD',
    accent: '#06FFA5'
  },
  [NEN_TYPES.CONJURER]: {
    primary: '#B298DC',
    secondary: '#FFB5E8',
    bg: '#2B2D42',
    bgLight: '#3B3D52',
    text: '#EDF2F4',
    accent: '#FF006E'
  },
  [NEN_TYPES.MANIPULATOR]: {
    primary: '#FFBA08',
    secondary: '#D00000',
    bg: '#03071E',
    bgLight: '#1A1A2E',
    text: '#FAA307',
    accent: '#FFBA08'
  },
  [NEN_TYPES.SPECIALIST]: {
    primary: '#7209B7',
    secondary: '#F72585',
    bg: '#10002B',
    bgLight: '#240046',
    text: '#E0AAFF',
    accent: '#C77DFF'
  }
};

// Nen Features by Level (automatic progression from rulebook)
export const NEN_FEATURES_BY_LEVEL = {
  1: ['ten', 'ren', 'hatsu'],
  2: ['lesser_gyo'],
  3: ['total_zetsu'],
  5: ['nen_initiation'],
  7: ['greater_gyo'],
  10: ['in'],
  12: ['en']
};

export const NEN_FEATURE_LABELS = {
  ten: 'Ten',
  ren: 'Ren',
  hatsu: 'Hatsu',
  lesser_gyo: 'Lesser Gyo',
  total_zetsu: 'Total Zetsu',
  nen_initiation: 'Nen Initiation',
  greater_gyo: 'Greater Gyo',
  in: 'In',
  en: 'En'
};

export const NEN_FEATURE_DESCRIPTIONS = {
  ten: 'Shroud - Maintain nen aura for defense and resistance',
  ren: 'Refine - Output extra aura for powerful attacks',
  hatsu: 'Release - Use unique supernatural abilities',
  lesser_gyo: 'Focus - See nen auras (bonus action, concentration, disadvantage on saves)',
  total_zetsu: 'Suppress - Hide aura completely (action, advantage on stealth)',
  nen_initiation: 'Force open aura nodes in others (action, touch)',
  greater_gyo: 'Advanced Focus - Gyo becomes automatic in danger, no disadvantage',
  in: 'Conceal - Hide your nen aura (action, concentration)',
  en: 'Circle - Expand aura to sense surroundings (action, concentration)'
};

// Rest types
export const REST_TYPES = {
  SHORT: 'short',
  LONG: 'long',
  FULL: 'full'
};

// Hatsu slot levels (like spell slots)
export const HATSU_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
