import React from 'react';
import AnimatedDice from './AnimatedDice';

/**
 * Format timestamp to relative time
 */
const formatTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

/**
 * Get icon for roll type
 */
const getRollIcon = (type) => {
  switch (type) {
    case 'attack': return '⚔';
    case 'damage': return '💥';
    case 'spell': return '✦';
    case 'saving_throw': return '🛡';
    case 'initiative': return '⚡';
    case 'ability_check':
    default: return '🎲';
  }
};

/**
 * Roll History Item Component
 * Displays a single roll in the history sidebar
 */
const RollHistoryItem = ({ roll, isNew = false }) => {
  const { type, label, characterName, timestamp } = roll;
  
  return (
    <div className={`roll-history-item ${isNew ? 'roll-new' : ''}`}>
      <div className="roll-header">
        <div className="roll-info">
          <span className="roll-icon">{getRollIcon(type)}</span>
          <span className="roll-label">{label}</span>
        </div>
        <span className="roll-time">{formatTimeAgo(timestamp)}</span>
      </div>
      
      {characterName && (
        <div className="roll-character">{characterName}</div>
      )}
      
      <AnimatedDice rollData={roll} isNew={isNew} />
    </div>
  );
};

export default RollHistoryItem;
