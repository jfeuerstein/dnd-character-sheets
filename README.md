# D&D Character Sheet Manager

A minimalist, terminal-inspired character sheet manager for D&D 5e and homebrew campaigns.

## Features

- ✨ Create, edit, and manage multiple characters
- 🎲 Clickable dice rolls for ability checks and proficiency
- 💾 Auto-save to localStorage
- 📤 Import/Export characters as JSON
- 🎨 ASCII art terminal aesthetic
- ⚡ HP increment/decrement buttons
- 🔧 Fully customizable for homebrew systems

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # App header with navigation
│   ├── CharacterList.js    # List view of all characters
│   ├── CharacterView.js    # Read-only character sheet
│   ├── CharacterEdit.js    # Edit character sheet
│   └── index.js        # Component exports
├── hooks/              # Custom React hooks
│   └── useCharacters.js    # Character state management
├── utils/              # Utility functions
│   ├── characterUtils.js   # Character operations
│   ├── diceUtils.js        # Dice rolling logic
│   ├── storage.js          # localStorage management
│   └── index.js        # Utility exports
├── App.js              # Main application
├── App.css             # Application styles
├── index.js            # React entry point
└── index.css           # Global styles
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Deploy to GitHub Pages

```bash
npm run deploy
```

## Usage

### Creating a Character

1. Click `[ + new ]` to create a new character
2. Fill in character details (name, race, class, stats, etc.)
3. Add features, spells, and notes as needed
4. Click `save` to save the character

### Rolling Dice

- Click any **ability score** to roll a d20 + modifier
- Click the **proficiency bonus** to roll d20 + proficiency
- Roll results appear at the top for 3 seconds

### Managing HP

- Use **+** and **-** buttons to adjust HP during gameplay
- HP automatically saves to localStorage

### Import/Export

- **Export**: Click `export` on any character to download as JSON
- **Import**: Click `[ import ]` and select a JSON file
- **Export All**: Click `[ export all ]` to backup all characters

## Customization

### Adding Custom Features

Edit `src/utils/characterUtils.js` to modify the default character template:

```javascript
export const createBlankCharacter = () => ({
  // Customize default values here
  stats: { str: 10, dex: 10, ... },
  // Add custom fields
  customField: 'value'
});
```

### Styling

- Colors: Edit `src/index.css` for neutral colors
- Layout: Modify individual components in `src/components/`
- Tailwind: Update `tailwind.config.js` for theme changes

## Tech Stack

- **React** - UI framework
- **Tailwind CSS** - Styling
- **localStorage** - Data persistence
- **Create React App** - Build tooling

## Contributing

Feel free to fork and customize for your own campaigns!

## License

MIT
