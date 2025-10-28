import { NEN_FEATURES_BY_LEVEL } from '../constants';

/**
 * Get nen features available at a given level
 * @param {number} level - Character level
 * @returns {Array} Array of nen feature keys
 */
export const getNenFeaturesAtLevel = (level) => {
  const features = [];
  Object.entries(NEN_FEATURES_BY_LEVEL).forEach(([levelReq, feats]) => {
    if (parseInt(levelReq) <= level) {
      features.push(...feats);
    }
  });
  return features;
};

/**
 * Check if character has a specific nen feature
 * @param {Object} character - Character object
 * @param {string} feature - Feature key
 * @returns {boolean} Whether character has the feature
 */
export const hasNenFeature = (character, feature) => {
  if (!character.isHxH) return false;
  const availableFeatures = getNenFeaturesAtLevel(character.level);
  return availableFeatures.includes(feature);
};

/**
 * Get all nen features for a character
 * @param {Object} character - Character object
 * @returns {Array} Array of nen feature objects with details
 */
export const getCharacterNenFeatures = (character) => {
  if (!character.isHxH) return [];
  return getNenFeaturesAtLevel(character.level);
};
