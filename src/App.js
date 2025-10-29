import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CharacterList from './components/CharacterList';
import CharacterView from './components/CharacterView';
import CharacterEdit from './components/CharacterEdit';
import DiceRollSidebar from './components/DiceRollSidebar';
import { RollHistoryProvider } from './contexts/RollHistoryContext';
import { useCharacters } from './hooks/useCharacters';
import { 
  createBlankCharacter, 
  exportCharacterToFile, 
  exportAllData, 
  importCharacterFromFile 
} from './utils/characterUtils';

function AppContent() {
  const { characters, setCharacters, addCharacter, updateCharacter, deleteCharacter } = useCharacters();
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [view, setView] = useState('list'); // list, view, edit
  const [showHxHModal, setShowHxHModal] = useState(false);

  const handleCreateNew = () => {
    setShowHxHModal(true);
  };

  const handleConfirmCharacterType = (isHxH) => {
    const newChar = createBlankCharacter(isHxH);
    setCurrentCharacter(newChar);
    setShowHxHModal(false);
    setView('edit');
  };

  const handleSaveCharacter = (char) => {
    if (characters.find(c => c.id === char.id)) {
      updateCharacter(char);
    } else {
      addCharacter(char);
    }
    setCurrentCharacter(char);
    setView('view');
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    importCharacterFromFile(
      file,
      (imported) => {
        addCharacter(imported);
        alert('character imported');
      },
      (error) => {
        console.error('Import error:', error);
        alert('error importing file');
      }
    );
    // Reset input so same file can be imported again
    event.target.value = '';
  };

  const handleView = (char) => {
    setCurrentCharacter(char);
    setView('view');
  };

  const handleEdit = (char) => {
    setCurrentCharacter(char);
    setView('edit');
  };

  const handleDelete = (id) => {
    deleteCharacter(id);
    if (currentCharacter?.id === id) {
      setCurrentCharacter(null);
      setView('list');
    }
  };

  const handleCancel = () => {
    if (currentCharacter?.id) {
      setView('view');
    } else {
      setCurrentCharacter(null);
      setView('list');
    }
  };

  // Add debug logging
  console.log('App rendering with characters:', characters?.length);

  return (
    <div className="min-h-screen bg-neutral-800 text-white font-mono p-4">
      <div className="max-w-4xl mx-auto">
        <Header
          onViewList={() => setView('list')}
          onCreateNew={handleCreateNew}
          onExportAll={() => characters?.length > 0 ? exportAllData(characters) : null}
          onImport={handleImport}
        />

        {view === 'list' && Array.isArray(characters) && (
          <CharacterList
            characters={characters}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onExport={exportCharacterToFile}
          />
        )}

        {showHxHModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-neutral-800 border border-white p-6 max-w-md">
              <div className="text-lg mb-4">select character type</div>
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleConfirmCharacterType(false)}
                  className="w-full px-4 py-3 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-left"
                >
                  <div className="font-bold">standard d&d 5e</div>
                  <div className="text-xs opacity-60 mt-1">traditional character sheet</div>
                </button>
                <button
                  onClick={() => handleConfirmCharacterType(true)}
                  className="w-full px-4 py-3 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-left"
                >
                  <div className="font-bold">hunter x hunter</div>
                  <div className="text-xs opacity-60 mt-1">includes nen types, aura, and hatsu</div>
                </button>
              </div>
              <button
                onClick={() => setShowHxHModal(false)}
                className="w-full px-4 py-2 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
              >
                cancel
              </button>
            </div>
          </div>
        )}

        {view === 'view' && currentCharacter && (
          <CharacterView
            character={currentCharacter}
            characters={characters}
            setCharacters={setCharacters}
            setCurrentCharacter={setCurrentCharacter}
            onEdit={() => setView('edit')}
            onBack={() => setView('list')}
          />
        )}

        {view === 'edit' && currentCharacter && (
          <CharacterEdit
            character={currentCharacter}
            onSave={handleSaveCharacter}
            onCancel={handleCancel}
          />
        )}
      </div>
      
      {/* Dice Roll Sidebar */}
      <DiceRollSidebar />
    </div>
  );
}

function App() {
  return (
    <RollHistoryProvider>
      <AppContent />
    </RollHistoryProvider>
  );
}

export default App;
