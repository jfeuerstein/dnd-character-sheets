# Project Structure

```
dnd-character-sheets/
│
├── public/                      # Static assets
│   ├── index.html
│   └── ...
│
├── src/
│   ├── components/              # React components
│   │   ├── Header.js           # App header with navigation
│   │   ├── CharacterList.js    # List view of characters
│   │   ├── CharacterView.js    # Character sheet viewer (with dice rolls)
│   │   ├── CharacterEdit.js    # Character editor form
│   │   └── index.js            # Component barrel export
│   │
│   ├── hooks/                   # Custom React hooks
│   │   └── useCharacters.js    # Character state management + localStorage
│   │
│   ├── utils/                   # Utility functions
│   │   ├── characterUtils.js   # Character CRUD operations
│   │   ├── diceUtils.js        # Dice rolling logic
│   │   ├── storage.js          # localStorage wrapper
│   │   └── index.js            # Utils barrel export
│   │
│   ├── constants.js             # App constants and config
│   ├── App.js                   # Main application component
│   ├── App.css                  # App-specific styles
│   ├── index.js                 # React entry point
│   └── index.css                # Global styles + Tailwind imports
│
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Dependencies and scripts
├── README.md                    # Project documentation
├── CONTRIBUTING.md              # Development guide
└── .gitignore                   # Git ignore rules
```

## Data Flow

```
App.js
  ├─> useCharacters() hook
  │     └─> localStorage (persistence)
  │
  ├─> Header (navigation)
  │
  ├─> CharacterList (list view)
  │     ├─> characterUtils (export)
  │     └─> onClick handlers
  │
  ├─> CharacterView (read-only)
  │     ├─> diceUtils (rolling)
  │     ├─> characterUtils (modifiers)
  │     └─> updates via setCharacters
  │
  └─> CharacterEdit (editing)
        ├─> characterUtils (validation)
        └─> onSave -> useCharacters hook
```

## Key Files

### Entry Point
- `src/index.js` - React app initialization
- `src/App.js` - Main component with routing logic

### State Management
- `src/hooks/useCharacters.js` - Central state for all characters
- `src/utils/storage.js` - Handles localStorage operations

### Core Components
- `src/components/CharacterView.js` - Most complex, handles dice rolling and HP updates
- `src/components/CharacterEdit.js` - Form with dynamic feature/spell arrays

### Utilities
- `src/utils/characterUtils.js` - Character operations (create, import, export)
- `src/utils/diceUtils.js` - Dice mechanics
- `src/constants.js` - Configuration values

## Adding Features

### New Character Property
1. Add to `createBlankCharacter()` in `characterUtils.js`
2. Add form field in `CharacterEdit.js`
3. Add display in `CharacterView.js`

### New Dice Mechanic
1. Add function to `diceUtils.js`
2. Import and use in `CharacterView.js`
3. Display result in roll banner

### New Page/View
1. Create component in `src/components/`
2. Add route logic in `App.js`
3. Add navigation button in `Header.js`

## Testing Checklist

- [ ] Create new character
- [ ] Edit character
- [ ] Delete character
- [ ] Roll ability checks
- [ ] Increment/decrement HP
- [ ] Export character
- [ ] Import character
- [ ] Export all data
- [ ] Refresh page (localStorage persistence)
- [ ] Mobile responsive layout
