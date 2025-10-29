import React, { createContext, useContext, useState, useEffect } from 'react';

const RollHistoryContext = createContext();

const MAX_HISTORY = 5;
const STORAGE_KEY = 'dnd_roll_history';

/**
 * Create a roll history entry
 */
export const createRollEntry = (rollData) => {
  return {
    id: Date.now() + Math.random(),
    timestamp: Date.now(),
    ...rollData
  };
};

/**
 * Roll History Provider Component
 */
export const RollHistoryProvider = ({ children }) => {
  const [rollHistory, setRollHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRollHistory(parsed.slice(0, MAX_HISTORY));
      }
    } catch (error) {
      console.error('Error loading roll history:', error);
    }
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rollHistory));
    } catch (error) {
      console.error('Error saving roll history:', error);
    }
  }, [rollHistory]);

  /**
   * Add a roll to history (keeps only last MAX_HISTORY rolls)
   */
  const addRoll = (rollData) => {
    const entry = createRollEntry(rollData);
    setIsAnimating(true);
    setRollHistory(prev => [entry, ...prev.slice(0, MAX_HISTORY - 1)]);
    
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 600);
  };

  /**
   * Clear all roll history
   */
  const clearHistory = () => {
    setRollHistory([]);
  };

  const value = {
    rollHistory,
    addRoll,
    clearHistory,
    isAnimating
  };

  return (
    <RollHistoryContext.Provider value={value}>
      {children}
    </RollHistoryContext.Provider>
  );
};

/**
 * Hook to use roll history context
 */
export const useRollHistory = () => {
  const context = useContext(RollHistoryContext);
  if (!context) {
    throw new Error('useRollHistory must be used within RollHistoryProvider');
  }
  return context;
};
