import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CharacterList from './components/CharacterList';
import CharacterView from './components/CharacterView';
import CharacterEdit from './components/CharacterEdit';
import { useCharacters } from './hooks/useCharacters';
import { 
  createBlankCharacter, 
  exportCharacterToFile, 
  exportAllData, 
  importCharacterFromFile 
} from './utils/characterUtils';

function App() {
  const { characters, setCharacters, addCharacter, updateCharacter, deleteCharacter } = useCharacters();
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [view, setView] = useState('list'); // list, view, edit

  const handleCreateNew = () => {
    const newChar = createBlankCharacter();
    setCurrentCharacter(newChar);
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

  return (
    <div className="min-h-screen bg-neutral-800 text-white font-mono p-4">
      <div className="max-w-4xl mx-auto">
        <Header
          onViewList={() => setView('list')}
          onCreateNew={handleCreateNew}
          onExportAll={() => exportAllData(characters)}
          onImport={handleImport}
        />

        {view === 'list' && (
          <CharacterList
            characters={characters}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onExport={exportCharacterToFile}
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
    </div>
  );
}

export default App;
