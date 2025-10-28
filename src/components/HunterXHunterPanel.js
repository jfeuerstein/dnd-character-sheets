import React from 'react';
import { 
  NEN_TYPE_LABELS, 
  NEN_FEATURE_LABELS,
  NEN_FEATURE_DESCRIPTIONS,
  HATSU_LEVELS,
  NEN_FEATURES_BY_LEVEL
} from '../constants';
import { getNenFeaturesAtLevel } from '../utils/nenUtils';

const HunterXHunterPanel = ({ character, onUpdate, isEditing = false }) => {
  if (!character.isHxH) return null;

  const updateHatsuSlot = (level, field, value) => {
    onUpdate({
      ...character,
      hatsuSlots: {
        ...character.hatsuSlots,
        [level]: {
          ...character.hatsuSlots[level],
          [field]: parseInt(value) || 0
        }
      }
    });
  };

  const useHatsuSlot = (level) => {
    const slot = character.hatsuSlots[level];
    if (slot.current > 0) {
      updateHatsuSlot(level, 'current', slot.current - 1);
    }
  };

  const restoreHatsuSlot = (level) => {
    const slot = character.hatsuSlots[level];
    if (slot.current < slot.max) {
      updateHatsuSlot(level, 'current', slot.current + 1);
    }
  };

  const longRest = () => {
    const restoredSlots = {};
    Object.keys(character.hatsuSlots).forEach(level => {
      restoredSlots[level] = {
        ...character.hatsuSlots[level],
        current: character.hatsuSlots[level].max
      };
    });
    onUpdate({
      ...character,
      hatsuSlots: restoredSlots,
      hp: { ...character.hp, current: character.hp.max }
    });
  };

  const updateNenType = (value) => {
    onUpdate({
      ...character,
      nenType: value
    });
  };

  const availableNenFeatures = getNenFeaturesAtLevel(character.level);

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div>
          <div className="mb-2 opacity-60 text-xs">╔═ nen type</div>
          <select
            value={character.nenType || ''}
            onChange={(e) => updateNenType(e.target.value)}
            className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
            style={{ 
              borderColor: character.nenType ? 'var(--hxh-primary)' : 'white',
              color: character.nenType ? 'var(--hxh-primary)' : 'white'
            }}
          >
            <option value="">select nen type...</option>
            {Object.entries(NEN_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="mb-2 opacity-60 text-xs">
            ╔═ hatsu <span className="opacity-40">×</span> slots
          </div>
          <div className="space-y-2">
            {HATSU_LEVELS.map(level => {
              const slot = character.hatsuSlots[level];
              
              return (
                <div key={level} className="grid grid-cols-3 gap-2 items-center">
                  <label className="text-xs opacity-60">level {level}</label>
                  <input
                    type="number"
                    value={slot.current}
                    onChange={(e) => updateHatsuSlot(level, 'current', e.target.value)}
                    min="0"
                    max={slot.max}
                    className="bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
                  />
                  <input
                    type="number"
                    value={slot.max}
                    onChange={(e) => updateHatsuSlot(level, 'max', e.target.value)}
                    min="0"
                    placeholder="max"
                    className="bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
                  />
                </div>
              );
            })}
            <div className="text-xs opacity-60 mt-2">
              set max slots per level (current / max)
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 opacity-60 text-xs">
            ╔═ nen <span className="opacity-40">×</span> features (by level)
          </div>
          <div className="text-xs opacity-60 mb-3">
            nen features unlock automatically based on character level
          </div>
          {Object.entries(NEN_FEATURES_BY_LEVEL).map(([reqLevel, features]) => {
            const hasLevel = character.level >= parseInt(reqLevel);
            return (
              <div key={reqLevel} className={`border border-white p-2 mb-2 ${!hasLevel ? 'opacity-40' : ''}`}>
                <div className="text-xs mb-1">
                  <span className="font-bold">level {reqLevel}:</span>
                  {!hasLevel && <span className="ml-2 opacity-60">(locked)</span>}
                </div>
                {features.map(feature => (
                  <div key={feature} className="pl-2 text-xs">
                    <span className="font-bold">{NEN_FEATURE_LABELS[feature]}</span>
                    <span className="opacity-60 ml-2">{NEN_FEATURE_DESCRIPTIONS[feature]}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // View mode
  const availableSlots = Object.entries(character.hatsuSlots || {})
    .filter(([_, slot]) => slot.max > 0);

  return (
    <div className="space-y-6">
      {character.nenType && (
        <div>
          <div className="mb-2 opacity-60 text-xs">╔═ nen type</div>
          <div className="border p-3 text-center" style={{ borderColor: 'var(--hxh-primary)' }}>
            <div className="text-lg font-bold" style={{ color: 'var(--hxh-primary)' }}>
              {NEN_TYPE_LABELS[character.nenType]}
            </div>
          </div>
        </div>
      )}

      {availableSlots.length > 0 && (
        <div>
          <div className="mb-2 opacity-60 text-xs">
            ╔═ hatsu <span className="opacity-40">×</span> slots
          </div>
          <div className="space-y-2">
            {availableSlots.map(([level, slot]) => (
              <div key={level} className="border border-white p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs opacity-60">level {level}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => useHatsuSlot(level)}
                      disabled={slot.current === 0}
                      className="px-2 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-sm disabled:opacity-30"
                    >
                      use
                    </button>
                    <span className="text-lg font-mono">
                      {slot.current} / {slot.max}
                    </span>
                    <button
                      onClick={() => restoreHatsuSlot(level)}
                      disabled={slot.current >= slot.max}
                      className="px-2 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-sm disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(slot.max)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 border border-white"
                      style={{
                        backgroundColor: i < slot.current ? 'var(--hxh-primary)' : 'transparent'
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={longRest}
              className="w-full px-4 py-2 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-sm"
            >
              long rest (restore all slots)
            </button>
          </div>
        </div>
      )}

      {availableNenFeatures.length > 0 && (
        <div>
          <div className="mb-2 opacity-60 text-xs">
            ╔═ nen <span className="opacity-40">×</span> features
          </div>
          <div className="space-y-2">
            {availableNenFeatures.map(feature => (
              <div key={feature} className="border border-white p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold">► {NEN_FEATURE_LABELS[feature]}</span>
                </div>
                <div className="opacity-60 text-xs pl-4">
                  {NEN_FEATURE_DESCRIPTIONS[feature]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HunterXHunterPanel;
