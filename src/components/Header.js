import React from 'react';

const Header = ({ onViewList, onCreateNew, onExportAll, onImport }) => {
  return (
    <div>
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
          onClick={onViewList}
          className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
        >
          [ all characters ]
        </button>
        <button
          onClick={onCreateNew}
          className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
        >
          [ + new ]
        </button>
        <button
          onClick={onExportAll}
          className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
        >
          [ export all ]
        </button>
        <label className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors cursor-pointer">
          [ import ]
          <input 
            type="file" 
            accept=".json" 
            onChange={onImport} 
            className="hidden" 
          />
        </label>
      </div>
    </div>
  );
};

export default Header;
