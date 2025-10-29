import React from 'react';
import '../styles/dice-animations.css';

/**
 * Animated Dice Component
 * Displays dice rolls with terminal-aesthetic animations
 */
const AnimatedDice = ({ rollData, isNew = false }) => {
  const { type, d20, rolls, modifier, total, notation } = rollData;
  
  // Detect critical hits and fumbles
  const isCritical = d20 === 20;
  const isFumble = d20 === 1;

  // For d20 rolls (ability checks, saves, attacks)
  if (d20 !== undefined) {
    return (
      <div className={`dice-container ${isNew ? 'dice-roll-in' : ''}`}>
        <div className={`
          dice-d20 
          ${isCritical ? 'dice-critical' : ''} 
          ${isFumble ? 'dice-fumble' : ''}
          ${isNew ? 'dice-spin' : ''}
        `}>
          <div className="dice-face">
            <pre className="dice-d20-art">
{` /\\
 /  \\
 / ${d20.toString().padStart(2, ' ')} \\
 /______\\`}
            </pre>
          </div>
        </div>
        <div className="dice-result">
          <span className="dice-value">{d20}</span>
          {modifier && <span className="dice-modifier">{modifier}</span>}
          <span className="dice-equals">=</span>
          <span className="dice-total">{total}</span>
        </div>
        {isCritical && <div className="dice-label critical-label">fuck yea!</div>}
        {isFumble && <div className="dice-label fumble-label">shit!</div>}
      </div>
    );
  }

  // For multi-die rolls (damage, spells)
  if (rolls && rolls.length > 0) {
    return (
      <div className={`dice-container ${isNew ? 'dice-roll-in' : ''}`}>
        <div className="dice-multi">
          {rolls.map((roll, idx) => (
            <div 
              key={idx} 
              className={`dice-small ${isNew ? 'dice-tumble' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <pre className="dice-small-art">
{`┌───┐
│ ${roll} │
└───┘`}
              </pre>
            </div>
          ))}
        </div>
        <div className="dice-result">
          <span className="dice-notation">{notation}</span>
          <span className="dice-equals">=</span>
          <span className="dice-total">{total}</span>
        </div>
      </div>
    );
  }

  // Fallback for other roll types
  return (
    <div className={`dice-container ${isNew ? 'dice-roll-in' : ''}`}>
      <div className="dice-result">
        <span className="dice-total">{total}</span>
      </div>
    </div>
  );
};

export default AnimatedDice;
