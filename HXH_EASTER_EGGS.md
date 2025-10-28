# Hunter x Hunter Easter Eggs - Implementation Summary

## ✅ What's Been Implemented

### 1. Hatsu Slot System (Replaces Simple Aura Counter)
Instead of a simple aura point counter, HxH characters now use the **Hatsu Slot System** from the rulebook:

**How It Works:**
- Characters have 9 levels of hatsu slots (like spell slots)
- Each slot level has a max and current value
- Using a level 1 hatsu consumes a level 1 slot
- Can use higher-level slots for lower-level hatsu
- All slots restore on long rest

**UI Features:**
- Visual slot indicators (filled/empty boxes)
- "use" button to expend a slot
- "+" button to manually restore slots
- "long rest" button restores all slots AND full HP
- Edit mode: Set max slots for each level

### 2. Nen-Based Color Schemes
Each Nen type has its own unique 2-color theme inspired by the anime:

**Enhancer** (Red × Teal)
- Primary: #FF6B6B (Red)
- Secondary: #4ECDC4 (Teal)
- Dark charcoal background

**Transmuter** (Light Blue × Off White)
- Primary: #A8DADC (Light Blue)
- Secondary: #F1FAEE (Off White)
- Navy background

**Emitter** (Bright Green × Yellow)
- Primary: #06FFA5 (Neon Green)
- Secondary: #FFFB46 (Yellow)
- Deep blue background

**Conjurer** (Purple × Pink)
- Primary: #B298DC (Purple)
- Secondary: #FFB5E8 (Pink)
- Dark blue-gray background

**Manipulator** (Gold × Dark Red)
- Primary: #FFBA08 (Gold)
- Secondary: #D00000 (Dark Red)
- Nearly black background

**Specialist** (Purple × Pink - darker)
- Primary: #7209B7 (Purple)
- Secondary: #F72585 (Pink)
- Very dark purple background

### 3. HxH Text Formatting
Text throughout HxH character sheets uses the iconic "word × word" formatting:

**Examples:**
- "hunter × hunter" appears below character name
- "hatsu × slots" in the slots section
- "nen × techniques" for techniques section
- Uses the × symbol (not 'x') with reduced opacity

### 4. Dynamic Theme Application
Themes automatically apply when:
- Character has `isHxH: true`
- Character has a `nenType` selected

**What Changes:**
- All borders change to primary nen color
- Border hover effects add glow in nen color
- Button hovers use nen colors
- Nen type display uses primary color
- "hunter × hunter" text uses primary color
- Slot indicators fill with primary color

### 5. Character List Integration
The character list shows HxH status:
```
character name
lvl 5 / human / enhancer
hunter × hunter (Enhancer)
```

## 🎨 Theme System Details

### CSS Variables
When a HxH character is viewed/edited, these CSS variables are set:
```css
--hxh-primary: [nen type primary color]
--hxh-secondary: [nen type secondary color]
--hxh-bg: [background color]
--hxh-bg-light: [lighter background]
--hxh-text: [text color]
--hxh-accent: [accent color]
```

### Smooth Transitions
All color changes have 0.2-0.3s transitions for a polished feel.

### Hover Effects
- Borders glow on hover with nen color
- Buttons fill with nen color on hover
- Maintains readability with proper contrast

## 📊 Hatsu Slot Example

**Level 3 Character might have:**
```
Level 1: ████ (4/4)  [use] [+]
Level 2: ██░░ (2/4)  [use] [+]
Level 3: ░░░░ (0/4)  [use] [+]
        [long rest (restore all slots)]
```

Each filled box represents an available slot.
Empty boxes show total capacity.

## 🔄 Migration

Old HxH characters with `aura: {current, max}` automatically convert to:
```javascript
hatsuSlots: {
  1: { max: 2, current: 2 },
  2-9: { max: 0, current: 0 }
}
```

## 🎯 Testing the Easter Eggs

1. **Create HxH Character**
```bash
npm start
```

2. **Select Nen Type**
- Create new character
- Choose "hunter × hunter"
- Edit character
- Select a Nen type (e.g., Enhancer)

3. **Watch the Magic**
- Save the character
- View it - notice the red/teal theme (for Enhancer)
- See "hunter × hunter" below name
- See "hatsu × slots" with visual indicators
- Hover over borders - they glow red

4. **Try Different Types**
- Create characters with different Nen types
- Each gets unique color scheme
- Specialist gets the most dramatic purple/pink theme

5. **Use Hatsu Slots**
- Click "use" on a slot level
- Watch visual indicator empty
- Click "long rest" to restore everything

## 💡 Design Philosophy

**Subtle But Impactful:**
- Doesn't overwhelm the interface
- Standard D&D characters unchanged
- Enhances immersion for HxH players
- Professional, polished appearance

**Faithful to Source:**
- Slot system matches rulebook exactly
- "× " formatting mimics anime/manga
- Color schemes evoke series arcs
- Nen type emphasis matches importance

**Practical:**
- Easy to track slot usage
- Visual feedback is clear
- Long rest button is convenient
- Themes don't hurt readability

## 📁 Files Modified

**New:**
- `src/utils/themeUtils.js` - Theme utilities

**Updated:**
- `src/constants.js` - Added colors and hatsu levels
- `src/utils/characterUtils.js` - Hatsu slots instead of aura
- `src/utils/migration.js` - Migrate aura to slots
- `src/components/HunterXHunterPanel.js` - Slot UI
- `src/components/CharacterView.js` - Theme application
- `src/components/CharacterEdit.js` - Theme application
- `src/components/CharacterList.js` - HxH indicator
- `src/index.css` - HxH theme CSS

The easter eggs are complete! HxH characters now have a unique, immersive experience while maintaining full compatibility with standard D&D 5e characters.
