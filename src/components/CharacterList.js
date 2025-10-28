import React from 'react';

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

export default CharacterList;
