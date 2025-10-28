import React, { useState } from 'react';
import { rollD20 } from '../utils/diceUtils';
import { getModifierValue, calculateModifier, getEffectiveStats } from '../utils/characterUtils';
import { ROLL_DISPLAY_DURATION } from '../constants';
import ActionsManager from './ActionsManager';
import HunterXHunterPanel from './HunterXHunterPanel';
import SkillsPanel from './SkillsPanel';
import { getHxHStyles } from '../utils/themeUtils';

const CharacterView = ({ 
  character, 
  characters, 
  setCharacters, 
  setCurrentCharacter, 
  onEdit, 
  onBack 
}) => {
  const [rollResult, setRollResult] = useState(null);

  const handleRoll = (type, bonus = 0) => {
    const result = rollD20(bonus);
    setRollResult({ type, ...result });
    setTimeout(() => setRollResult(null), ROLL_DISPLAY_DURATION);
  };

  const updateHP = (delta) => {
    const newHp = Math.max(0, Math.min(character.hp.max, character.hp.current + delta));
    const updated = { ...character, hp: { ...character.hp, current: newHp } };
    const updatedChars = characters.map(c => c.id === character.id ? updated : c);
    setCharacters(updatedChars);
    setCurrentCharacter(updated);
  };

  return (
    <div className="text-sm" style={getHxHStyles(character)}>
      {rollResult && (
        <div className="mb-4 border border-white p-3 bg-neutral-900">
          <div className="flex justify-between items-center">
            <div>
              <span className="opacity-60">{rollResult.type}:</span>
              <span className="ml-2">d20({rollResult.d20}) {rollResult.modifier} = </span>
              <span className="text-xl ml-2">{rollResult.total}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-4 flex gap-2">
        <button 
          onClick={onBack}
          className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
        >
          ← back
        </button>
        <button
          onClick={onEdit}
          className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
        >
          edit
        </button>
      </div>

      <div className="border border-white p-6" style={{ borderColor: character.isHxH && character.nenType ? 'var(--hxh-primary)' : 'white' }}>
        <div className="mb-6">
          <pre className="text-lg mb-2">
{`╔═══════════════════════════════╗
║  ${character.name.toUpperCase().padEnd(27)}║
╚═══════════════════════════════╝`}
          </pre>
          <div className="opacity-60">
            level {character.level} {character.race} {character.class}
            {character.background && ` / ${character.background}`}
          </div>
          {character.isHxH && character.nenType && (
            <div className="mt-2" style={{ color: 'var(--hxh-primary)' }}>
              hunter <span className="opacity-40">×</span> hunter
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="border border-white p-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <button
                onClick={() => updateHP(-1)}
                className="px-2 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-sm"
              >
                -
              </button>
              <div className="text-2xl">{character.hp.current}</div>
              <button
                onClick={() => updateHP(1)}
                className="px-2 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-sm"
              >
                +
              </button>
            </div>
            <div className="opacity-60 text-xs text-center">hp / {character.hp.max}</div>
          </div>
          <div className="border border-white p-3 text-center">
            <div className="text-2xl mb-1">{character.ac}</div>
            <div className="opacity-60 text-xs">armor class</div>
          </div>
          <button
            onClick={() => handleRoll('proficiency', character.proficiencyBonus)}
            className="border border-white p-3 text-center hover:bg-white hover:text-neutral-800 transition-colors cursor-pointer"
          >
            <div className="text-2xl mb-1">+{character.proficiencyBonus}</div>
            <div className="opacity-60 text-xs">proficiency</div>
          </button>
        </div>

        <div className="mb-6">
          <div className="mb-2 opacity-60">╔═ ability scores</div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {Object.entries(character.stats).map(([stat, baseValue]) => {
              const effectiveStats = getEffectiveStats(character);
              const effectiveValue = effectiveStats[stat];
              const hasModifier = baseValue !== effectiveValue;
              const mod = getModifierValue(effectiveValue);
              return (
                <button
                  key={stat}
                  onClick={() => handleRoll(`${stat} check`, mod)}
                  className="border border-white p-2 text-center hover:bg-white hover:text-neutral-800 transition-colors cursor-pointer"
                >
                  <div className="text-xs opacity-60 mb-1">{stat}</div>
                  <div className="text-xl">
                    {effectiveValue}
                    {hasModifier && (
                      <span className="text-xs ml-1 opacity-60">({baseValue})</span>
                    )}
                  </div>
                  <div className="text-xs opacity-60">{calculateModifier(effectiveValue)}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <SkillsPanel
            character={character}
            onUpdate={(updated) => {
              const updatedChars = characters.map(c => c.id === updated.id ? updated : c);
              setCharacters(updatedChars);
              setCurrentCharacter(updated);
            }}
            isEditing={false}
          />
        </div>

        {character.features.length > 0 && (
          <div className="mb-6">
            <div className="mb-2 opacity-60">╔═ features & traits</div>
            <div className="space-y-2">
              {character.features.map((feature, idx) => (
                <div key={idx} className="border border-white p-3">
                  <div className="mb-1">► {feature.name}</div>
                  <div className="opacity-60 text-xs pl-4">{feature.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {character.actions && character.actions.length > 0 && (
          <div className="mb-6">
            <ActionsManager
              character={character}
              onUpdate={(updated) => {
                const updatedChars = characters.map(c => c.id === updated.id ? updated : c);
                setCharacters(updatedChars);
                setCurrentCharacter(updated);
              }}
              isEditing={false}
            />
          </div>
        )}

        {character.isHxH && (
          <div className="mb-6">
            <HunterXHunterPanel
              character={character}
              onUpdate={(updated) => {
                const updatedChars = characters.map(c => c.id === updated.id ? updated : c);
                setCharacters(updatedChars);
                setCurrentCharacter(updated);
              }}
              isEditing={false}
            />
          </div>
        )}

        {character.notes && (
          <div>
            <div className="mb-2 opacity-60">╔═ notes</div>
            <div className="border border-white p-3 whitespace-pre-wrap opacity-80">
              {character.notes}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterView;
