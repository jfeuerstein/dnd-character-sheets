# Hunter x Hunter Implementation - Summary

## ✅ What's Been Implemented

### 1. Hunter x Hunter Mode Toggle
- When creating a new character, you now get a modal asking:
  - "Standard D&D 5e" - Traditional character sheet
  - "Hunter x Hunter" - Includes Nen features

### 2. HxH Character Fields
Characters created in HxH mode include:
- `isHxH`: Boolean flag
- `nenType`: Nen affinity (Enhancer, Transmuter, Emitter, Conjurer, Manipulator, Specialist)
- `aura`: {current, max} - Aura point tracking
- `nenTechniques`: Object tracking Ten, Ren, Gyo, In, En, Hatsu with learned status and notes

### 3. Nen Techniques Panel
New component: `HunterXHunterPanel.js`

**Edit Mode:**
- Select Nen Type from dropdown
- Set current/max Aura
- Toggle learned status for each Nen technique
- Add notes for each technique

**View Mode:**
- Display Nen Type
- Aura tracker with +/- buttons
- List of learned techniques with descriptions

### 4. Limited Uses for Actions
All action types now support:
```javascript
uses: {
  enabled: boolean,
  current: number,
  max: number,
  resetOn: 'short' | 'long' | 'full'
}
```

### 5. Hatsu Action Type
New action type specifically for HxH Hatsu abilities:
```javascript
{
  type: 'hatsu',
  auraCost: number,
  effect: string,
  roll: { enabled, count, die, modifier },
  conditions: string,
  limitations: string,
  uses: { ... }
}
```

### 6. Updated Constants
Added to `src/constants.js`:
- `NEN_TYPES` - The 6 Nen affinities
- `NEN_TECHNIQUES` - Ten, Ren, Gyo, In, En, Hatsu
- `REST_TYPES` - Short, Long, Full rest options

## 🚧 What Still Needs Implementation

### 1. Limited Uses UI in ActionsManager
The `uses` field exists but needs UI in ActionsManager to:
- Display current/max uses in view mode
- Add +/- buttons to track uses
- Show reset type (short/long/full rest)
- Add uses editor in edit mode

### 2. Hatsu Action Editor
Need to add Hatsu-specific fields when editing:
- Aura Cost input
- Conditions textarea
- Limitations textarea
- Roll configuration

### 3. Hatsu Action Display
Display Hatsu differently from spells:
- Show aura cost
- Display conditions/limitations
- Support rolling if enabled

### 4. Rest System
Add rest buttons to:
- Reset limited uses based on rest type
- Restore HP
- Restore Aura (for HxH characters)

### 5. Aura Cost Deduction
When using a Hatsu:
- Automatically deduct aura cost
- Prevent use if insufficient aura

### 6. Nen Type Integration
- Show Nen type in character list
- Use Nen type for class field in HxH mode
- Add Nen type icons/indicators

## 📝 Next Steps

### Priority 1: Complete Limited Uses
```javascript
// In ActionDisplay component, add:
{action.uses?.enabled && (
  <div className="text-xs opacity-60 mt-1">
    Uses: {action.uses.current}/{action.uses.max} 
    (resets on {action.uses.resetOn} rest)
  </div>
)}
```

### Priority 2: Add Hatsu Button
```javascript
// In ActionsEditor, add button:
{character.isHxH && (
  <button onClick={() => addAction(ACTION_TYPES.HATSU)}>
    + hatsu
  </button>
)}
```

### Priority 3: Rest Functionality
Add rest buttons in CharacterView:
```javascript
<button onClick={() => handleRest('short')}>short rest</button>
<button onClick={() => handleRest('long')}>long rest</button>
```

## 🎯 Testing Checklist

- [ ] Create HxH character
- [ ] Select Nen type
- [ ] Set aura values
- [ ] Mark Nen techniques as learned
- [ ] Add Hatsu action
- [ ] Test aura tracking with +/- buttons
- [ ] Export/import HxH character
- [ ] Create standard D&D character (ensure no HxH features)
- [ ] Switch between character types

## 📂 Files Created/Modified

**Created:**
- `src/components/HunterXHunterPanel.js` - Nen/Aura UI
- `src/utils/actionUtils.js` - Added `createBlankHatsu()`

**Modified:**
- `src/constants.js` - Added HxH constants
- `src/utils/characterUtils.js` - Added `isHxH` parameter
- `src/App.js` - Added character type modal
- `src/components/CharacterView.js` - Added HxHPanel
- `src/components/CharacterEdit.js` - Added HxHPanel
- All action creators - Added `uses` field

## 🔧 How to Continue Development

1. **Test current implementation:**
```bash
npm start
```

2. **Add limited uses UI** - Update ActionsManager.js

3. **Add Hatsu support** - Create Hatsu editor/display in ActionsManager

4. **Add rest system** - Create rest buttons and logic

5. **Polish** - Add icons, improve styling, add tooltips

The foundation is in place! The character sheet now supports both standard D&D 5e and Hunter x Hunter mode with proper separation.
