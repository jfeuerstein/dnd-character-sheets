# Contributing to D&D Character Sheet Manager

Thank you for your interest in contributing! This guide will help you understand the project structure and how to add new features.

## Development Setup

1. Clone the repository
2. Run `npm install`
3. Run `npm start` to start the dev server
4. Make your changes
5. Test thoroughly
6. Commit with clear messages

## Project Architecture

### Component Structure

Components are organized by responsibility:

- **Header**: Navigation and global actions
- **CharacterList**: Display all characters
- **CharacterView**: Read-only character display with dice rolling
- **CharacterEdit**: Character editing form

### State Management

We use a custom `useCharacters` hook for state management. This hook:
- Loads characters from localStorage on mount
- Auto-saves on every change
- Provides CRUD operations

### Utilities

Utility functions are organized by domain:

- **characterUtils.js**: Character operations (create, export, import)
- **diceUtils.js**: Dice rolling logic
- **storage.js**: localStorage operations

### Constants

All magic numbers and configuration values are in `src/constants.js`.

## Adding New Features

### Adding a New Character Field

1. Update the character template in `src/utils/characterUtils.js`:
```javascript
export const createBlankCharacter = () => ({
  // ... existing fields
  newField: 'default value'
});
```

2. Add UI in `CharacterEdit.js` and `CharacterView.js`

### Adding New Dice Types

1. Add to `DICE_TYPES` in `src/constants.js`
2. Use `rollDice()` from `diceUtils.js`:
```javascript
import { rollDice } from '../utils/diceUtils';
const result = rollDice(6, 2, 3); // 2d6+3
```

### Adding Custom Styling

- Edit `src/index.css` for global styles
- Modify component-specific styles inline with Tailwind classes
- Keep the monospace/terminal aesthetic

## Code Style

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into hooks or utilities
- Use JSDoc comments for functions
- Follow existing naming conventions

## Testing

Before submitting:

1. Test all CRUD operations (Create, Read, Update, Delete)
2. Test import/export functionality
3. Test dice rolling
4. Test HP increment/decrement
5. Test on different screen sizes
6. Check localStorage persistence

## Common Patterns

### Adding a Button

```javascript
<button
  onClick={handleClick}
  className="px-4 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors"
>
  button text
</button>
```

### Adding a Roll Result Display

```javascript
const [rollResult, setRollResult] = useState(null);

const handleRoll = (type, bonus) => {
  const result = rollD20(bonus);
  setRollResult({ type, ...result });
  setTimeout(() => setRollResult(null), ROLL_DISPLAY_DURATION);
};
```

### Adding a Form Field

```javascript
<div>
  <label className="block mb-1 opacity-60 text-xs">field label</label>
  <input
    type="text"
    value={value}
    onChange={(e) => updateField('fieldName', e.target.value)}
    className="w-full bg-neutral-900 border border-white px-3 py-2 text-white font-mono"
  />
</div>
```

## Future Feature Ideas

- [ ] Skill check system with proficiency
- [ ] Saving throw buttons
- [ ] Initiative tracker
- [ ] Inventory management with weight
- [ ] Spell slots tracker
- [ ] Multi-character party view
- [ ] Character templates/archetypes
- [ ] Dice roll history
- [ ] Dark/light mode toggle
- [ ] PDF export
- [ ] Online multiplayer sync

## Questions?

Open an issue for any questions or suggestions!
