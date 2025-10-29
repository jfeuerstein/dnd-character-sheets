import React, { useState } from 'react';
import { rollD20 } from '../utils/diceUtils';
import { getModifierValue, calculateModifier, getEffectiveStats, calculateSavingThrow, performShortRest, performLongRest } from '../utils/characterUtils';
import { ROLL_DISPLAY_DURATION, ABILITY_NAMES, ABILITIES } from '../constants';
import ActionsManager from './ActionsManager';
import HunterXHunterPanel from './HunterXHunterPanel';
import SkillsPanel from './SkillsPanel';
import { getHxHStyles } from '../utils/themeUtils';
import { useRollHistory } from '../contexts/RollHistoryContext';

const CharacterView = ({ 
  character, 
  characters, 
  setCharacters, 
  setCurrentCharacter, 
  onEdit, 
  onBack 
}) => {
  const [rollResult, setRollResult] = useState(null);
  const [showShortRestModal, setShowShortRestModal] = useState(false);
  const [hitDiceToSpend, setHitDiceToSpend] = useState(0);
  const [restResult, setRestResult] = useState(null);
  const { addRoll } = useRollHistory();

  const handleRoll = (type, bonus = 0, label = null) => {
    const result = rollD20(bonus);
    setRollResult({ type, ...result });
    setTimeout(() => setRollResult(null), ROLL_DISPLAY_DURATION);
    
    // Add to roll history
    addRoll({
      type: type === 'proficiency' ? 'ability_check' : 
            type === 'initiative' ? 'initiative' : 
            type.includes('save') ? 'saving_throw' : 'ability_check',
      label: label || type,
      characterName: character.name,
      d20: result.d20,
      modifier: result.modifier,
      total: result.total
    });
  };

  const updateHP = (delta) => {
    const newHp = Math.max(0, Math.min(character.hp.max, character.hp.current + delta));
    const updated = { ...character, hp: { ...character.hp, current: newHp } };
    const updatedChars = characters.map(c => c.id === character.id ? updated : c);
    setCharacters(updatedChars);
    setCurrentCharacter(updated);
  };

  const handleShortRest = () => {
    const { character: updated, results } = performShortRest(character, hitDiceToSpend);
    const updatedChars = characters.map(c => c.id === character.id ? updated : c);
    setCharacters(updatedChars);
    setCurrentCharacter(updated);
    setRestResult(results);
    setShowShortRestModal(false);
    setHitDiceToSpend(0);
    setTimeout(() => setRestResult(null), 5000);
  };

  const handleLongRest = () => {
    const { character: updated, results } = performLongRest(character);
    const updatedChars = characters.map(c => c.id === character.id ? updated : c);
    setCharacters(updatedChars);
    setCurrentCharacter(updated);
    setRestResult(results);
    setTimeout(() => setRestResult(null), 5000);
  };

  const handleInitiativeRoll = () => {
    const dexMod = getModifierValue(getEffectiveStats(character).dex);
    handleRoll('initiative', dexMod, 'Initiative');
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

      {restResult && (
        <div className="mb-4 border border-white p-3 bg-neutral-900">
          <div className="mb-2 font-bold">╔═ rest completed</div>
          {restResult.hpRestored > 0 && (
            <div className="opacity-80">► HP restored: +{restResult.hpRestored}</div>
          )}
          {restResult.hitDiceSpent > 0 && (
            <div className="opacity-80">► Hit dice spent: {restResult.hitDiceSpent}</div>
          )}
          {restResult.hitDiceRestored > 0 && (
            <div className="opacity-80">► Hit dice restored: {restResult.hitDiceRestored}</div>
          )}
          {restResult.actionsRestored.length > 0 && (
            <div className="opacity-80">► Actions restored: {restResult.actionsRestored.join(', ')}</div>
          )}
          {restResult.hatsuSlotsRestored.length > 0 && (
            <div className="opacity-80">► Hatsu slots restored: {restResult.hatsuSlotsRestored.join(', ')}</div>
          )}
        </div>
      )}

      {showShortRestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-neutral-800 border border-white p-6 max-w-md">
            <div className="text-lg mb-4">short rest</div>
            <div className="mb-4 opacity-80 text-sm">
              Spend hit dice to recover HP. Each hit die rolled restores HP equal to the roll + your Constitution modifier (minimum 1).
            </div>
            <div className="mb-4">
              <label className="block mb-2 opacity-60 text-xs">
                hit dice to spend (available: {character.hitDice?.current || 0})
              </label>
              <input
                type="number"
                min="0"
                max={character.hitDice?.current || 0}
                value={hitDiceToSpend}
                onChange={(e) => setHitDiceToSpend(Math.max(0, Math.min(character.hitDice?.current || 0, parseInt(e.target.value) || 0)))}
                className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
              />
              <div className="text-xs opacity-60 mt-1">
                Hit die: d{character.hitDice?.size || 8} + {getModifierValue(character.stats.con)} (CON)
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShortRest}
                className="flex-1 px-4 py-2 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
              >
                rest
              </button>
              <button
                onClick={() => {
                  setShowShortRestModal(false);
                  setHitDiceToSpend(0);
                }}
                className="flex-1 px-4 py-2 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-4 flex gap-2 flex-wrap">
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
        <button
          onClick={() => setShowShortRestModal(true)}
          className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
        >
          short rest
        </button>
        <button
          onClick={handleLongRest}
          className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
        >
          long rest
        </button>
        <button
          onClick={handleInitiativeRoll}
          className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
        >
          🎲 initiative
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
            onClick={() => handleRoll('proficiency', character.proficiencyBonus, 'Proficiency')}
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
                  onClick={() => handleRoll(`${stat} check`, mod, `${stat.toUpperCase()} Check`)}
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
          <div className="mb-2 opacity-60">╔═ saving throws</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.entries(ABILITIES).map(([key, ability]) => {
              const saveMod = calculateSavingThrow(character, ability);
              const isProficient = character.savingThrows?.[ability] || false;
              return (
                <button
                  key={ability}
                  onClick={() => handleRoll(`${ABILITY_NAMES[ability]} save`, saveMod, `${ABILITY_NAMES[ability]} Save`)}
                  className="border border-white p-2 text-center hover:bg-white hover:text-neutral-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-1 text-xs opacity-60 mb-1">
                    {isProficient && <span>●</span>}
                    {ABILITY_NAMES[ability]}
                  </div>
                  <div className="text-lg">{saveMod >= 0 ? `+${saveMod}` : saveMod}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-2 opacity-60">╔═ hit dice</div>
          <div className="border border-white p-3 text-center">
            <div className="text-2xl mb-1">
              {character.hitDice?.current || 0} / {character.hitDice?.max || 0}
            </div>
            <div className="opacity-60 text-xs">d{character.hitDice?.size || 8} available</div>
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
