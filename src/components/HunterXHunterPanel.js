import React from 'react';
import { 
  NEN_TYPE_LABELS, 
  NEN_TECHNIQUE_LABELS,
  NEN_TECHNIQUE_DESCRIPTIONS,
  HATSU_LEVELS
} from '../constants';

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

  const updateNenTechnique = (technique, field, value) => {
    onUpdate({
      ...character,
      nenTechniques: {
        ...character.nenTechniques,
        [technique]: {
          ...character.nenTechniques[technique],
          [field]: value
        }
      }
    });
  };

  const updateNenType = (value) => {
    onUpdate({
      ...character,
      nenType: value
    });
  };

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
              if (!slot || slot.max === 0) return null;
              
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
            ╔═ nen <span className="opacity-40">×</span> techniques
          </div>
          <div className="space-y-2">
            {Object.entries(character.nenTechniques || {}).map(([key, technique]) => (
              <div key={key} className="border border-white p-3">
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={technique.learned}
                    onChange={(e) => updateNenTechnique(key, 'learned', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="font-bold">{NEN_TECHNIQUE_LABELS[key]}</span>
                  <span className="opacity-60 text-xs ml-auto">
                    {NEN_TECHNIQUE_DESCRIPTIONS[key]}
                  </span>
                </label>
                {technique.learned && (
                  <textarea
                    value={technique.notes}
                    onChange={(e) => updateNenTechnique(key, 'notes', e.target.value)}
                    placeholder="notes..."
                    rows={2}
                    className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-xs"
                  />
                )}
              </div>
            ))}
          </div>
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

      <div>
        <div className="mb-2 opacity-60 text-xs">
          ╔═ nen <span className="opacity-40">×</span> techniques
        </div>
        <div className="space-y-2">
          {Object.entries(character.nenTechniques || {}).map(([key, technique]) => (
            technique.learned && (
              <div key={key} className="border border-white p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold">► {NEN_TECHNIQUE_LABELS[key]}</span>
                  <span className="opacity-60 text-xs">
                    {NEN_TECHNIQUE_DESCRIPTIONS[key]}
                  </span>
                </div>
                {technique.notes && (
                  <div className="opacity-60 text-xs pl-4 mt-2">
                    {technique.notes}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default HunterXHunterPanel;
