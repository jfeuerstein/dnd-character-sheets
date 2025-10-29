import React, { useState } from 'react';
import { useRollHistory } from '../contexts/RollHistoryContext';
import RollHistoryItem from './RollHistoryItem';
import '../styles/dice-animations.css';

/**
 * Dice Roll Sidebar Component
 * Slide-out panel showing recent roll history
 */
const DiceRollSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { rollHistory, clearHistory, isAnimating } = useRollHistory();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="dice-sidebar-toggle"
        aria-label="Toggle roll history"
      >
        🎲
      </button>

      {/* Sidebar Panel */}
      <div className={`dice-sidebar ${isOpen ? 'dice-sidebar-open' : ''}`}>
        <div className="dice-sidebar-header">
          <div className="dice-sidebar-title">
            <pre>
{`╔═ roll history`}
            </pre>
          </div>
          <div className="dice-sidebar-actions">
            <button
              onClick={clearHistory}
              className="dice-sidebar-btn"
              disabled={rollHistory.length === 0}
            >
              clear
            </button>
            <button
              onClick={toggleSidebar}
              className="dice-sidebar-btn"
            >
              close
            </button>
          </div>
        </div>

        <div className="dice-sidebar-content">
          {rollHistory.length === 0 ? (
            <div className="dice-sidebar-empty">
              <pre>
{`┌─────────────────┐
│  no rolls yet   │
│                 │
│  roll some dice │
│  to see history │
└─────────────────┘`}
              </pre>
            </div>
          ) : (
            <div className="dice-sidebar-list">
              {rollHistory.map((roll, index) => (
                <RollHistoryItem
                  key={roll.id}
                  roll={roll}
                  isNew={index === 0 && isAnimating}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="dice-sidebar-overlay"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default DiceRollSidebar;
