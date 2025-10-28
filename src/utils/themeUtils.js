import { NEN_TYPE_COLORS } from '../constants';

/**
 * Get theme colors for a character
 * @param {Object} character - Character object
 * @returns {Object} Theme colors
 */
export const getCharacterTheme = (character) => {
  if (!character.isHxH || !character.nenType) {
    // Default theme for non-HxH characters
    return {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
      bg: '#262626',
      bgLight: '#171717',
      text: '#FFFFFF',
      accent: '#FFFFFF'
    };
  }

  return NEN_TYPE_COLORS[character.nenType] || NEN_TYPE_COLORS.specialist;
};

/**
 * Format text with HxH "word x word" style
 * @param {string} text - Text to format
 * @returns {JSX} Formatted text
 */
export const formatHxHText = (text) => {
  // Splits on 'x' or 'X' surrounded by spaces
  const parts = text.split(/\s+[xX]\s+/);
  
  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, idx) => (
    <span key={idx}>
      {part}
      {idx < parts.length - 1 && <span className="opacity-40"> × </span>}
    </span>
  ));
};

/**
 * Get HxH-styled class names based on nen type
 * @param {Object} character - Character object
 * @returns {string} Class names
 */
export const getHxHClassNames = (character) => {
  if (!character.isHxH || !character.nenType) {
    return '';
  }
  
  return `hxh-theme hxh-${character.nenType}`;
};

/**
 * Apply inline styles based on nen type
 * @param {Object} character - Character object
 * @returns {Object} Style object
 */
export const getHxHStyles = (character) => {
  const theme = getCharacterTheme(character);
  
  if (!character.isHxH) {
    return {};
  }

  return {
    '--hxh-primary': theme.primary,
    '--hxh-secondary': theme.secondary,
    '--hxh-bg': theme.bg,
    '--hxh-bg-light': theme.bgLight,
    '--hxh-text': theme.text,
    '--hxh-accent': theme.accent
  };
};
