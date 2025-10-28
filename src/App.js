import React, { useState, useEffect } from 'react';
import './App.css';

const CharacterSheetApp = () => {
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [view, setView] = useState('list');

  useEffect(() => {
    const savedCharacters = JSON.parse(localStorage.getItem('dnd_characters') || '[]');
    setCharacters(savedCharacters);
  }, []);

  useEffect(() => {
    localStorage.setItem('dnd_characters', JSON.stringify(characters));
  }, [characters]);

  const createNewCharacter = () => {
    const newChar = {
      id: Date.now(),
      name: 'new character',
      level: 1,
      race: '',
      class: '',
      background: '',
      stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      hp: { current: 10, max: 10, temp: 0 },
      ac: 10,
      proficiencyBonus: 2,
      skills: {},
      savingThrows: {},
      spells: { slots: {}, known: [], prepared: [] },
      inventory: [],
      features: [],
      notes: ''
    };
    setCurrentCharacter(newChar);
    setView('edit');
  };

  const saveCharacter = (char) => {
    const updated = characters.filter(c => c.id !== char.id);
    setCharacters([...updated, char]);
    setCurrentCharacter(char);
    setView('view');
  };

  const deleteCharacter = (id) => {
    setCharacters(characters.filter(c => c.id !== id));
    if (currentCharacter?.id === id) {
      setCurrentCharacter(null);
      setView('list');
    }
  };

  const exportCharacter = (char) => {
    const dataStr = JSON.stringify(char, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${char.name.replace(/\s+/g, '_')}.json`;
    link.click();
  };

  const importCharacter = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          imported.id = Date.now();
          setCharacters([...characters, imported]);
          alert('character imported');
        } catch (error) {
          alert('error importing file');
        }
      };
      reader.readAsText(file);
    }
  };

  const exportAllData = () => {
    const allData = {
      characters,
      exportDate: new Date().toISOString()
    };
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'campaign_data.json';
    link.click();
  };

  const calculateModifier = (score) => {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  return (
    <div className="min-h-screen bg-neutral-800 text-white font-mono p-4">
      <div className="max-w-4xl mx-auto">
        <pre className="text-xs mb-6 opacity-60">
{`  _____ _                          _            
 / ____| |                        | |           
| |    | |__   __ _ _ __ __ _  ___| |_ ___ _ __ 
| |    | '_ \\ / _\` | '__/ _\` |/ __| __/ _ \\ '__|
| |____| | | | (_| | | | (_| | (__| ||  __/ |   
 \\_____|_| |_|\\__,_|_|  \\__,_|\\___|\\__\\___|_|   
                                                 
    ___ _               _                       
   / __| |_  ___ ___ __| |_ ___                 
   \\__ \\ ' \\/ -_) -_) _|  _(_-<                 
   |___/_||_\\___\\___\\__|\\__/__/                 `}
        </pre>

        <div className="mb-6 flex flex-wrap gap-2 text-sm">
          <button
            onClick={() => setView('list')}
            className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
          >
            [ all characters ]
          </button>
          <button
            onClick={createNewCharacter}
            className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
          >
            [ + new ]
          </button>
          <button
            onClick={exportAllData}
            className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
          >
            [ export all ]
          </button>
          <label className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors cursor-pointer">
            [ import ]
            <input type="file" accept=".json" onChange={importCharacter} className="hidden" />
          </label>
        </div>

        {view === 'list' && (
          <CharacterList
            characters={characters}
            onView={(char) => { setCurrentCharacter(char); setView('view'); }}
            onEdit={(char) => { setCurrentCharacter(char); setView('edit'); }}
            onDelete={deleteCharacter}
            onExport={exportCharacter}
          />
        )}

        {view === 'view' && currentCharacter && (
          <CharacterView
            character={currentCharacter}
            characters={characters}
            setCharacters={setCharacters}
            setCurrentCharacter={setCurrentCharacter}
            onEdit={() => setView('edit')}
            onBack={() => setView('list')}
            calculateModifier={calculateModifier}
          />
        )}

        {view === 'edit' && currentCharacter && (
          <CharacterEdit
            character={currentCharacter}
            onSave={saveCharacter}
            onCancel={() => setView(currentCharacter.id ? 'view' : 'list')}
            calculateModifier={calculateModifier}
          />
        )}
      </div>
    </div>
  );
};

const CharacterList = ({ characters, onView, onEdit, onDelete, onExport }) => {
  return (
    <div className="text-sm">
      {characters.length === 0 ? (
        <div className="border border-white p-8 text-center opacity-60">
          <pre className="text-xs">
{`    _  _     
   | \\| |___ 
   | .\` / _ \\
   |_|\\_\\___/
             
  characters
     yet     `}
          </pre>
        </div>
      ) : (
        <div className="space-y-4">
          {characters.map(char => (
            <div key={char.id} className="border border-white p-4">
              <div className="mb-3">
                <div className="text-lg">{char.name}</div>
                <div className="opacity-60">
                  lvl {char.level} / {char.race || '?'} / {char.class || '?'}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onView(char)}
                  className="px-3 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
                >
                  view
                </button>
                <button
                  onClick={() => onEdit(char)}
                  className="px-3 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
                >
                  edit
                </button>
                <button
                  onClick={() => onExport(char)}
                  className="px-3 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
                >
                  export
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('delete this character?')) onDelete(char.id);
                  }}
                  className="px-3 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CharacterView = ({ character, characters, setCharacters, setCurrentCharacter, onEdit, onBack, calculateModifier }) => {
  const [rollResult, setRollResult] = useState(null);

  const rollDice = (type, bonus = 0) => {
    const d20 = Math.floor(Math.random() * 20) + 1;
    const total = d20 + bonus;
    const modString = bonus >= 0 ? `+${bonus}` : `${bonus}`;
    
    setRollResult({
      type,
      d20,
      modifier: modString,
      total,
      timestamp: Date.now()
    });

    setTimeout(() => setRollResult(null), 3000);
  };

  const updateHP = (delta) => {
    const newHp = Math.max(0, Math.min(character.hp.max, character.hp.current + delta));
    const updated = { ...character, hp: { ...character.hp, current: newHp } };
    const updatedChars = characters.map(c => c.id === character.id ? updated : c);
    setCharacters(updatedChars);
    setCurrentCharacter(updated);
  };

  return (
    <div className="text-sm">
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

      <div className="border border-white p-6">
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
            onClick={() => rollDice('proficiency', character.proficiencyBonus)}
            className="border border-white p-3 text-center hover:bg-white hover:text-neutral-800 transition-colors cursor-pointer"
          >
            <div className="text-2xl mb-1">+{character.proficiencyBonus}</div>
            <div className="opacity-60 text-xs">proficiency</div>
          </button>
        </div>

        <div className="mb-6">
          <div className="mb-2 opacity-60">╔═ ability scores</div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {Object.entries(character.stats).map(([stat, value]) => {
              const mod = Math.floor((value - 10) / 2);
              return (
                <button
                  key={stat}
                  onClick={() => rollDice(`${stat} check`, mod)}
                  className="border border-white p-2 text-center hover:bg-white hover:text-neutral-800 transition-colors cursor-pointer"
                >
                  <div className="text-xs opacity-60 mb-1">{stat}</div>
                  <div className="text-xl">{value}</div>
                  <div className="text-xs opacity-60">{calculateModifier(value)}</div>
                </button>
              );
            })}
          </div>
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

        {character.spells.known.length > 0 && (
          <div className="mb-6">
            <div className="mb-2 opacity-60">╔═ spells</div>
            <div className="space-y-2">
              {character.spells.known.map((spell, idx) => (
                <div key={idx} className="border border-white p-3">
                  <div className="flex justify-between mb-1">
                    <span>► {spell.name}</span>
                    <span className="opacity-60 text-xs">lvl {spell.level}</span>
                  </div>
                  {spell.description && (
                    <div className="opacity-60 text-xs pl-4">{spell.description}</div>
                  )}
                </div>
              ))}
            </div>
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

const CharacterEdit = ({ character, onSave, onCancel, calculateModifier }) => {
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
      features: [...editChar.features, { name: '', description: '' }]
    });
  };

  const updateFeature = (idx, field, value) => {
    const updated = [...editChar.features];
    updated[idx][field] = value;
    setEditChar({ ...editChar, features: updated });
  };

  const removeFeature = (idx) => {
    setEditChar({
      ...editChar,
      features: editChar.features.filter((_, i) => i !== idx)
    });
  };

  const addSpell = () => {
    setEditChar({
      ...editChar,
      spells: {
        ...editChar.spells,
        known: [...editChar.spells.known, { name: '', level: 0, description: '' }]
      }
    });
  };

  const updateSpell = (idx, field, value) => {
    const updated = [...editChar.spells.known];
    updated[idx][field] = value;
    setEditChar({
      ...editChar,
      spells: { ...editChar.spells, known: updated }
    });
  };

  const removeSpell = (idx) => {
    setEditChar({
      ...editChar,
      spells: {
        ...editChar.spells,
        known: editChar.spells.known.filter((_, i) => i !== idx)
      }
    });
  };

  return (
    <div className="text-sm">
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
              <div key={idx} className="border border-white p-3">
                <div className="flex gap-2 mb-2">
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
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="opacity-60 text-xs">╔═ spells</div>
            <button
              onClick={addSpell}
              className="px-3 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-xs"
            >
              + add
            </button>
          </div>
          <div className="space-y-2">
            {editChar.spells.known.map((spell, idx) => (
              <div key={idx} className="border border-white p-3">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={spell.name}
                    onChange={(e) => updateSpell(idx, 'name', e.target.value)}
                    placeholder="spell name"
                    className="flex-1 bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
                  />
                  <input
                    type="number"
                    value={spell.level}
                    onChange={(e) => updateSpell(idx, 'level', parseInt(e.target.value) || 0)}
                    placeholder="lvl"
                    className="w-20 bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
                  />
                  <button
                    onClick={() => removeSpell(idx)}
                    className="px-3 py-2 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
                  >
                    x
                  </button>
                </div>
                <textarea
                  value={spell.description}
                  onChange={(e) => updateSpell(idx, 'description', e.target.value)}
                  placeholder="description"
                  rows={2}
                  className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
                />
              </div>
            ))}
          </div>
        </div>

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

export default CharacterSheetApp;
