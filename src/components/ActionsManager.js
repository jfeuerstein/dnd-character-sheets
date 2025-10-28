import React, { useState } from 'react';
import { 
  ACTION_CATEGORIES, 
  ACTION_TYPES, 
  ACTION_CATEGORY_LABELS,
  DICE_OPTIONS,
  ABILITY_NAMES 
} from '../constants';
import { 
  createBlankAttack, 
  createBlankSpell, 
  createBlankFeature,
  calculateAttackBonus,
  calculateDamageModifier,
  formatDiceNotation 
} from '../utils/actionUtils';
import { rollAttack, rollSpell } from '../utils/diceUtils';

const ActionsManager = ({ character, onUpdate, isEditing = false }) => {
  const [expandedAction, setExpandedAction] = useState(null);
  const [rollResult, setRollResult] = useState(null);

  const actions = character.actions || [];

  const addAction = (type) => {
    let newAction;
    switch (type) {
      case ACTION_TYPES.ATTACK:
        newAction = createBlankAttack();
        break;
      case ACTION_TYPES.SPELL:
        newAction = createBlankSpell();
        break;
      case ACTION_TYPES.FEATURE:
        newAction = createBlankFeature();
        break;
      default:
        newAction = createBlankFeature();
    }
    onUpdate({ ...character, actions: [...actions, newAction] });
  };

  const updateAction = (id, updates) => {
    const updated = actions.map(action => 
      action.id === id ? { ...action, ...updates } : action
    );
    onUpdate({ ...character, actions: updated });
  };

  const removeAction = (id) => {
    onUpdate({ 
      ...character, 
      actions: actions.filter(action => action.id !== id) 
    });
  };

  const handleRollAttack = (attack) => {
    const hitBonus = calculateAttackBonus(attack, character.stats, character.proficiencyBonus);
    const damageBonus = calculateDamageModifier(attack, character.stats);
    const result = rollAttack(attack, hitBonus, damageBonus);
    
    setRollResult({
      type: 'attack',
      name: attack.name,
      ...result
    });
    
    setTimeout(() => setRollResult(null), 3000);
  };

  const handleRollSpell = (spell) => {
    const result = rollSpell(spell);
    
    if (result) {
      setRollResult({
        type: 'spell',
        name: spell.name,
        ...result
      });
      setTimeout(() => setRollResult(null), 3000);
    }
  };

  const groupedActions = actions.reduce((acc, action) => {
    const category = action.category || ACTION_CATEGORIES.ACTION;
    if (!acc[category]) acc[category] = [];
    acc[category].push(action);
    return acc;
  }, {});

  if (isEditing) {
    return <ActionsEditor 
      actions={actions}
      character={character}
      onUpdate={onUpdate}
      addAction={addAction}
      updateAction={updateAction}
      removeAction={removeAction}
    />;
  }

  return (
    <div>
      {rollResult && (
        <div className="mb-4 border border-white p-3 bg-neutral-900">
          {rollResult.type === 'attack' ? (
            <div>
              <div className="mb-2">
                <span className="opacity-60">{rollResult.name} - hit:</span>
                <span className="ml-2">d20({rollResult.hit.d20}) {rollResult.hit.modifier} = </span>
                <span className="text-xl ml-2">{rollResult.hit.total}</span>
              </div>
              <div>
                <span className="opacity-60">damage:</span>
                <span className="ml-2">{rollResult.damage.notation} = </span>
                <span className="text-xl ml-2">{rollResult.damage.total}</span>
                <span className="ml-2 opacity-60 text-xs">({rollResult.damage.rolls.join(', ')})</span>
              </div>
            </div>
          ) : (
            <div>
              <span className="opacity-60">{rollResult.name}:</span>
              <span className="ml-2">{rollResult.notation} = </span>
              <span className="text-xl ml-2">{rollResult.total}</span>
              <span className="ml-2 opacity-60 text-xs">({rollResult.rolls.join(', ')})</span>
            </div>
          )}
        </div>
      )}

      {Object.entries(groupedActions).map(([category, categoryActions]) => (
        <div key={category} className="mb-6">
          <div className="mb-2 opacity-60 text-xs">╔═ {ACTION_CATEGORY_LABELS[category]}</div>
          <div className="space-y-2">
            {categoryActions.map(action => (
              <ActionDisplay
                key={action.id}
                action={action}
                character={character}
                onRollAttack={handleRollAttack}
                onRollSpell={handleRollSpell}
                expanded={expandedAction === action.id}
                onToggleExpand={() => setExpandedAction(
                  expandedAction === action.id ? null : action.id
                )}
              />
            ))}
          </div>
        </div>
      ))}

      {actions.length === 0 && (
        <div className="border border-white p-8 text-center opacity-60 text-xs">
          no actions yet
        </div>
      )}
    </div>
  );
};

const ActionDisplay = ({ 
  action, 
  character, 
  onRollAttack, 
  onRollSpell,
  expanded,
  onToggleExpand 
}) => {
  if (action.type === ACTION_TYPES.ATTACK) {
    const hitBonus = calculateAttackBonus(action, character.stats, character.proficiencyBonus);
    const damageBonus = calculateDamageModifier(action, character.stats);
    
    return (
      <div className="border border-white p-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <div className="font-bold">⚔ {action.name || 'unnamed attack'}</div>
            <div className="text-xs opacity-60 mt-1">
              {ABILITY_NAMES[action.abilityScore]} {action.isProficient && '(proficient)'}
            </div>
          </div>
          <button
            onClick={() => onRollAttack(action)}
            className="px-3 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-xs"
          >
            roll
          </button>
        </div>
        <div className="text-xs opacity-80">
          <span className="mr-4">hit: d20{hitBonus >= 0 ? '+' : ''}{hitBonus}</span>
          <span>damage: {formatDiceNotation(
            action.damageRoll.count,
            action.damageRoll.die,
            damageBonus
          )}</span>
        </div>
        {action.description && expanded && (
          <div className="mt-2 text-xs opacity-60 pl-4 border-l-2 border-white">
            {action.description}
          </div>
        )}
        {action.description && (
          <button
            onClick={onToggleExpand}
            className="text-xs opacity-60 hover:opacity-100 mt-1"
          >
            {expanded ? '▼ hide' : '► show details'}
          </button>
        )}
      </div>
    );
  }

  if (action.type === ACTION_TYPES.SPELL) {
    return (
      <div className="border border-white p-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <div className="font-bold">✦ {action.name || 'unnamed spell'}</div>
            <div className="text-xs opacity-60 mt-1">
              level {action.level} {action.roll?.enabled && `• ${formatDiceNotation(
                action.roll.count,
                action.roll.die,
                action.roll.modifier
              )}`}
            </div>
          </div>
          {action.roll?.enabled && (
            <button
              onClick={() => onRollSpell(action)}
              className="px-3 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-xs"
            >
              roll
            </button>
          )}
        </div>
        {action.effect && (
          <div className="text-xs opacity-80 mb-1">
            {action.effect}
          </div>
        )}
        {action.description && expanded && (
          <div className="mt-2 text-xs opacity-60 pl-4 border-l-2 border-white">
            {action.description}
          </div>
        )}
        {action.description && (
          <button
            onClick={onToggleExpand}
            className="text-xs opacity-60 hover:opacity-100 mt-1"
          >
            {expanded ? '▼ hide' : '► show details'}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="border border-white p-3">
      <div className="font-bold">► {action.name || 'unnamed action'}</div>
      {action.description && (
        <div className="text-xs opacity-60 mt-1 pl-4">
          {action.description}
        </div>
      )}
    </div>
  );
};

const ActionsEditor = ({ 
  actions, 
  character,
  onUpdate,
  addAction, 
  updateAction, 
  removeAction 
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div className="opacity-60 text-xs">╔═ actions</div>
        <div className="flex gap-2">
          <button
            onClick={() => addAction(ACTION_TYPES.ATTACK)}
            className="px-3 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-xs"
          >
            + attack
          </button>
          <button
            onClick={() => addAction(ACTION_TYPES.SPELL)}
            className="px-3 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-xs"
          >
            + spell
          </button>
          <button
            onClick={() => addAction(ACTION_TYPES.FEATURE)}
            className="px-3 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-xs"
          >
            + other
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {actions.map(action => (
          <ActionEditor
            key={action.id}
            action={action}
            character={character}
            onUpdate={updateAction}
            onRemove={removeAction}
          />
        ))}
      </div>

      {actions.length === 0 && (
        <div className="border border-white p-8 text-center opacity-60 text-xs">
          no actions yet - click a button above to add one
        </div>
      )}
    </div>
  );
};

const ActionEditor = ({ action, character, onUpdate, onRemove }) => {
  if (action.type === ACTION_TYPES.ATTACK) {
    return (
      <div className="border border-white p-3 space-y-3">
        <div className="flex justify-between items-start">
          <div className="text-xs opacity-60 uppercase">⚔ attack</div>
          <button
            onClick={() => onRemove(action.id)}
            className="px-2 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-xs"
          >
            x
          </button>
        </div>

        <input
          type="text"
          value={action.name}
          onChange={(e) => onUpdate(action.id, { name: e.target.value })}
          placeholder="attack name"
          className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
        />

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1 opacity-60 text-xs">category</label>
            <select
              value={action.category}
              onChange={(e) => onUpdate(action.id, { category: e.target.value })}
              className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
            >
              {Object.entries(ACTION_CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 opacity-60 text-xs">ability score</label>
            <select
              value={action.abilityScore}
              onChange={(e) => onUpdate(action.id, { abilityScore: e.target.value })}
              className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
            >
              {Object.entries(ABILITY_NAMES).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={action.isProficient}
            onChange={(e) => onUpdate(action.id, { isProficient: e.target.checked })}
            className="w-4 h-4"
          />
          <span>proficient</span>
        </label>

        <div>
          <label className="block mb-1 opacity-60 text-xs">damage roll</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              value={action.damageRoll.count}
              onChange={(e) => onUpdate(action.id, {
                damageRoll: { ...action.damageRoll, count: parseInt(e.target.value) || 1 }
              })}
              placeholder="count"
              min="1"
              className="bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
            />
            <select
              value={action.damageRoll.die}
              onChange={(e) => onUpdate(action.id, {
                damageRoll: { ...action.damageRoll, die: parseInt(e.target.value) }
              })}
              className="bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
            >
              {DICE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <input
              type="number"
              value={action.damageRoll.modifier}
              onChange={(e) => onUpdate(action.id, {
                damageRoll: { ...action.damageRoll, modifier: parseInt(e.target.value) || 0 }
              })}
              placeholder="+mod"
              className="bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
            />
          </div>
        </div>

        <textarea
          value={action.description || ''}
          onChange={(e) => onUpdate(action.id, { description: e.target.value })}
          placeholder="description"
          rows={2}
          className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
        />
      </div>
    );
  }

  if (action.type === ACTION_TYPES.SPELL) {
    return (
      <div className="border border-white p-3 space-y-3">
        <div className="flex justify-between items-start">
          <div className="text-xs opacity-60 uppercase">✦ spell</div>
          <button
            onClick={() => onRemove(action.id)}
            className="px-2 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-xs"
          >
            x
          </button>
        </div>

        <input
          type="text"
          value={action.name}
          onChange={(e) => onUpdate(action.id, { name: e.target.value })}
          placeholder="spell name"
          className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
        />

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1 opacity-60 text-xs">category</label>
            <select
              value={action.category}
              onChange={(e) => onUpdate(action.id, { category: e.target.value })}
              className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
            >
              {Object.entries(ACTION_CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 opacity-60 text-xs">spell level</label>
            <input
              type="number"
              value={action.level}
              onChange={(e) => onUpdate(action.id, { level: parseInt(e.target.value) || 0 })}
              min="0"
              max="9"
              className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
            />
          </div>
        </div>

        <input
          type="text"
          value={action.effect || ''}
          onChange={(e) => onUpdate(action.id, { effect: e.target.value })}
          placeholder="effect"
          className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
        />

        <div>
          <label className="flex items-center gap-2 text-sm mb-2">
            <input
              type="checkbox"
              checked={action.roll?.enabled || false}
              onChange={(e) => onUpdate(action.id, {
                roll: { ...action.roll, enabled: e.target.checked }
              })}
              className="w-4 h-4"
            />
            <span>has roll</span>
          </label>

          {action.roll?.enabled && (
            <div className="grid grid-cols-3 gap-2 pl-6">
              <input
                type="number"
                value={action.roll.count}
                onChange={(e) => onUpdate(action.id, {
                  roll: { ...action.roll, count: parseInt(e.target.value) || 1 }
                })}
                placeholder="count"
                min="1"
                className="bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
              />
              <select
                value={action.roll.die}
                onChange={(e) => onUpdate(action.id, {
                  roll: { ...action.roll, die: parseInt(e.target.value) }
                })}
                className="bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
              >
                {DICE_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <input
                type="number"
                value={action.roll.modifier}
                onChange={(e) => onUpdate(action.id, {
                  roll: { ...action.roll, modifier: parseInt(e.target.value) || 0 }
                })}
                placeholder="+mod"
                className="bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
              />
            </div>
          )}
        </div>

        <textarea
          value={action.description || ''}
          onChange={(e) => onUpdate(action.id, { description: e.target.value })}
          placeholder="description"
          rows={2}
          className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
        />
      </div>
    );
  }

  return (
    <div className="border border-white p-3 space-y-3">
      <div className="flex justify-between items-start">
        <div className="text-xs opacity-60 uppercase">► other action</div>
        <button
          onClick={() => onRemove(action.id)}
          className="px-2 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-xs"
        >
          x
        </button>
      </div>

      <input
        type="text"
        value={action.name}
        onChange={(e) => onUpdate(action.id, { name: e.target.value })}
        placeholder="action name"
        className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
      />

      <div>
        <label className="block mb-1 opacity-60 text-xs">category</label>
        <select
          value={action.category}
          onChange={(e) => onUpdate(action.id, { category: e.target.value })}
          className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
        >
          {Object.entries(ACTION_CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <textarea
        value={action.description || ''}
        onChange={(e) => onUpdate(action.id, { description: e.target.value })}
        placeholder="description"
        rows={2}
        className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono text-sm"
      />
    </div>
  );
};

export default ActionsManager;
