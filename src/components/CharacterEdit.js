import React, { useState } from 'react';
import { calculateModifier } from '../utils/characterUtils';
import ActionsManager from './ActionsManager';
import HunterXHunterPanel from './HunterXHunterPanel';
import SkillsPanel from './SkillsPanel';
import { getHxHStyles } from '../utils/themeUtils';
import { ABILITIES, ABILITY_NAMES } from '../constants';

const CharacterEdit = ({ character, onSave, onCancel }) => {
  const [editChar, setEditChar] = useState({ ...character });

  const updateField = (field, value) => {
    setEditChar({ ...editChar, [field]: value });
  };

  const updateStat = (stat, value) => {
    setEditChar({
      ...editChar,
      stats: { ...editChar.stats, [stat]: parseInt(value) || 10 }
    });
  };

  const addFeature = () => {
    setEditChar({
      ...editChar,
      features: [...editChar.features, { name: '', description: '', abilityModifiers: {} }]
    });
  };

  const updateFeature = (idx, field, value) => {
    const updated = [...editChar.features];
    updated[idx][field] = value;
    setEditChar({ ...editChar, features: updated });
  };

  const updateFeatureAbilityModifier = (idx, ability, value) => {
    const updated = [...editChar.features];
    const mods = { ...updated[idx].abilityModifiers };
    const val = parseInt(value);
    
    if (val && val !== 0) {
      mods[ability] = val;
    } else {
      delete mods[ability];
    }
    
    updated[idx].abilityModifiers = mods;
    setEditChar({ ...editChar, features: updated });
  };

  const removeFeature = (idx) => {
    setEditChar({
      ...editChar,
      features: editChar.features.filter((_, i) => i !== idx)
    });
  };

  const toggleSavingThrow = (ability) => {
    setEditChar({
      ...editChar,
      savingThrows: {
        ...editChar.savingThrows,
        [ability]: !editChar.savingThrows?.[ability]
      }
    });
  };

  return (
    <div className="text-sm" style={getHxHStyles(editChar)}>
      <div className="mb-4 flex gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
        >
          cancel
        </button>
        <button
          onClick={() => onSave(editChar)}
          className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
        >
          save
        </button>
      </div>

      <div className="border border-white p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 opacity-60 text-xs">character name</label>
            <input
              type="text"
              value={editChar.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
            />
          </div>
          <div>
            <label className="block mb-1 opacity-60 text-xs">level</label>
            <input
              type="number"
              value={editChar.level}
              onChange={(e) => updateField('level', parseInt(e.target.value) || 1)}
              className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
            />
          </div>
          <div>
            <label className="block mb-1 opacity-60 text-xs">race</label>
            <input
              type="text"
              value={editChar.race}
              onChange={(e) => updateField('race', e.target.value)}
              className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
            />
          </div>
          <div>
            <label className="block mb-1 opacity-60 text-xs">class</label>
            <input
              type="text"
              value={editChar.class}
              onChange={(e) => updateField('class', e.target.value)}
              className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 opacity-60 text-xs">background</label>
            <input
              type="text"
              value={editChar.background}
              onChange={(e) => updateField('background', e.target.value)}
              className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 opacity-60 text-xs">current hp</label>
            <input
              type="number"
              value={editChar.hp.current}
              onChange={(e) => updateField('hp', { ...editChar.hp, current: parseInt(e.target.value) || 0 })}
              className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
            />
          </div>
          <div>
            <label className="block mb-1 opacity-60 text-xs">max hp</label>
            <input
              type="number"
              value={editChar.hp.max}
              onChange={(e) => updateField('hp', { ...editChar.hp, max: parseInt(e.target.value) || 0 })}
              className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
            />
          </div>
          <div>
            <label className="block mb-1 opacity-60 text-xs">armor class</label>
            <input
              type="number"
              value={editChar.ac}
              onChange={(e) => updateField('ac', parseInt(e.target.value) || 10)}
              className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 opacity-60 text-xs">╔═ ability scores</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(editChar.stats).map(([stat, value]) => (
              <div key={stat}>
                <label className="block mb-1 opacity-60 text-xs">{stat}</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => updateStat(stat, e.target.value)}
                  className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
                />
                <div className="text-center opacity-60 text-xs mt-1">
                  {calculateModifier(value)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SkillsPanel
            character={editChar}
            onUpdate={setEditChar}
            isEditing={true}
          />
        </div>

        <div>
          <div className="mb-2 opacity-60 text-xs">╔═ saving throw proficiencies</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.entries(ABILITIES).map(([key, ability]) => {
              const isProficient = editChar.savingThrows?.[ability] || false;
              return (
                <button
                  key={ability}
                  onClick={() => toggleSavingThrow(ability)}
                  className="border border-white p-2 text-center hover:bg-white hover:text-neutral-800 transition-colors"
                >
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <span>{isProficient ? '●' : '○'}</span>
                    <span>{ABILITY_NAMES[ability]}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="text-xs opacity-60 mt-1">
            click to toggle proficiency
          </div>
        </div>

        <div>
          <div className="mb-2 opacity-60 text-xs">╔═ hit dice</div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 opacity-60 text-xs">current</label>
              <input
                type="number"
                value={editChar.hitDice?.current || editChar.level}
                onChange={(e) => updateField('hitDice', { 
                  ...editChar.hitDice, 
                  current: parseInt(e.target.value) || 0 
                })}
                className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block mb-1 opacity-60 text-xs">maximum</label>
              <input
                type="number"
                value={editChar.hitDice?.max || editChar.level}
                onChange={(e) => updateField('hitDice', { 
                  ...editChar.hitDice, 
                  max: parseInt(e.target.value) || editChar.level 
                })}
                className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block mb-1 opacity-60 text-xs">die size</label>
              <select
                value={editChar.hitDice?.size || 8}
                onChange={(e) => updateField('hitDice', { 
                  ...editChar.hitDice, 
                  size: parseInt(e.target.value) 
                })}
                className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
              >
                <option value="6">d6</option>
                <option value="8">d8</option>
                <option value="10">d10</option>
                <option value="12">d12</option>
              </select>
            </div>
          </div>
          <div className="text-xs opacity-60 mt-1">
            typical: d6 (wizard), d8 (rogue), d10 (fighter), d12 (barbarian)
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="opacity-60 text-xs">╔═ features & traits</div>
            <button
              onClick={addFeature}
              className="px-3 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-xs"
            >
              + add
            </button>
          </div>
          <div className="space-y-2">
            {editChar.features.map((feature, idx) => (
              <div key={idx} className="border border-white p-3 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={feature.name}
                    onChange={(e) => updateFeature(idx, 'name', e.target.value)}
                    placeholder="feature name"
                    className="flex-1 bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
                  />
                  <button
                    onClick={() => removeFeature(idx)}
                    className="px-3 py-2 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
                  >
                    x
                  </button>
                </div>
                <textarea
                  value={feature.description}
                  onChange={(e) => updateFeature(idx, 'description', e.target.value)}
                  placeholder="description"
                  rows={2}
                  className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
                />
                <div>
                  <label className="block mb-1 opacity-60 text-xs">ability modifiers (optional)</label>
                  <div className="grid grid-cols-6 gap-2">
                    {Object.keys(ABILITIES).map(ability => (
                      <div key={ability} className="text-center">
                        <div className="text-xs opacity-60 mb-1">{ability}</div>
                        <input
                          type="number"
                          value={feature.abilityModifiers?.[ABILITIES[ability]] || ''}
                          onChange={(e) => updateFeatureAbilityModifier(idx, ABILITIES[ability], e.target.value)}
                          placeholder="0"
                          className="w-full bg-neutral-900 border border-white px-2 py-1 text-white font-mono text-xs text-center"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs opacity-60 mt-1">
                    example: +2 for bonus, -1 for penalty
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ActionsManager
            character={editChar}
            onUpdate={setEditChar}
            isEditing={true}
          />
        </div>

        {editChar.isHxH && (
          <div>
            <HunterXHunterPanel
              character={editChar}
              onUpdate={setEditChar}
              isEditing={true}
            />
          </div>
        )}

        <div>
          <label className="block mb-1 opacity-60 text-xs">notes</label>
          <textarea
            value={editChar.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            rows={4}
            className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
            placeholder="character notes, backstory, etc."
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterEdit;
