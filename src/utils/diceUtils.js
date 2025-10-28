/**
 * Roll a d20 with modifier
 * @param {number} bonus - Bonus to add to roll
 * @returns {Object} Roll result with d20 value, modifier, and total
 */
export const rollD20 = (bonus = 0) => {
  const d20 = Math.floor(Math.random() * 20) + 1;
  const total = d20 + bonus;
  const modString = bonus >= 0 ? `+${bonus}` : `${bonus}`;
  
  return {
    d20,
    modifier: modString,
    total,
    timestamp: Date.now()
  };
};

/**
 * Roll any die
 * @param {number} sides - Number of sides on the die
 * @param {number} count - Number of dice to roll
 * @param {number} bonus - Bonus to add to total
 * @returns {Object} Roll result
 */
export const rollDice = (sides = 20, count = 1, bonus = 0) => {
  const rolls = [];
  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  
  const sum = rolls.reduce((acc, val) => acc + val, 0);
  const total = sum + bonus;
  
  return {
    rolls,
    sum,
    bonus,
    total,
    notation: formatRollNotation(count, sides, bonus),
    timestamp: Date.now()
  };
};

/**
 * Roll attack (hit roll + damage roll)
 * @param {Object} attack - Attack object with hit and damage info
 * @param {number} hitBonus - Bonus for hit roll
 * @param {number} damageBonus - Bonus for damage roll
 * @returns {Object} Attack roll result
 */
export const rollAttack = (attack, hitBonus, damageBonus) => {
  const hitRoll = rollD20(hitBonus);
  const damageRoll = rollDice(
    attack.damageRoll.die,
    attack.damageRoll.count,
    damageBonus
  );
  
  return {
    hit: hitRoll,
    damage: damageRoll,
    timestamp: Date.now()
  };
};

/**
 * Roll spell effect
 * @param {Object} spell - Spell object with roll info
 * @returns {Object|null} Spell roll result or null if no roll
 */
export const rollSpell = (spell) => {
  if (!spell.roll || !spell.roll.enabled) {
    return null;
  }
  
  return rollDice(
    spell.roll.die,
    spell.roll.count,
    spell.roll.modifier
  );
};

/**
 * Format roll notation (e.g., "2d6+3")
 * @param {number} count - Number of dice
 * @param {number} sides - Die sides
 * @param {number} bonus - Modifier
 * @returns {string} Formatted notation
 */
const formatRollNotation = (count, sides, bonus = 0) => {
  const base = `${count}d${sides}`;
  if (bonus === 0) return base;
  const sign = bonus > 0 ? '+' : '';
  return `${base}${sign}${bonus}`;
};
