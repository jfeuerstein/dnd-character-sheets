# Visual Guide: Dice Roll History Sidebar

## Layout Overview

```
┌─────────────────────────────────────┐
│                          [🎲]        │  ← Toggle button (top-right)
│                                      │
│    [Main Character Sheet Area]      │
│                                      │
│                                      │
└──────────────────────────────────────┘
```

## Sidebar Open State

```
┌──────────────────────────┬───────────────────────────┐
│                          │  ╔═ roll history           │
│                          │  [clear]  [close]          │
│                          ├───────────────────────────┤
│  [Main Character         │  ┌─────────────────────┐  │
│   Sheet Area]            │  │ 🎲 Dexterity Check  │  │
│                          │  │ 2m ago              │  │
│                          │  │                     │  │
│                          │  │     /\              │  │
│                          │  │    /  \             │  │
│                          │  │   / 18 \            │  │
│                          │  │  /______\           │  │
│                          │  │                     │  │
│                          │  │  18 +5 = 23         │  │
│                          │  └─────────────────────┘  │
│                          │                           │
│                          │  ┌─────────────────────┐  │
│                          │  │ ⚔ Longsword (Hit)   │  │
│                          │  │ 5m ago              │  │
│                          │  │                     │  │
│                          │  │     /\              │  │
│                          │  │    /  \    CRITICAL!│  │
│                          │  │   / 20 \   (green)  │  │
│                          │  │  /______\           │  │
│                          │  │                     │  │
│                          │  │  20 +3 = 23         │  │
│                          │  └─────────────────────┘  │
└──────────────────────────┴───────────────────────────┘
         ▲                              ▲
     Click overlay              Sidebar content
     to close                   (scrollable)
```

## Empty State

```
┌───────────────────────────┐
│  ╔═ roll history           │
│  [clear]  [close]          │
├───────────────────────────┤
│                           │
│  ┌─────────────────┐      │
│  │  no rolls yet   │      │
│  │                 │      │
│  │  roll some dice │      │
│  │  to see history │      │
│  └─────────────────┘      │
│                           │
│                           │
└───────────────────────────┘
```

## Roll Type Examples

### D20 Roll (Ability Check, Save, Attack Hit)
```
┌─────────────────────┐
│ 🎲 STR Check        │
│ Gandalf • 1m ago    │
│                     │
│      /\             │
│     /  \            │
│    / 15 \           │
│   /______\          │
│                     │
│   15 +3 = 18        │
└─────────────────────┘
```

### Critical Hit (Nat 20)
```
┌─────────────────────┐
│ ⚔ Greatsword (Hit)  │
│ Conan • 30s ago     │
│                     │
│      /\             │ ← Green glow effect
│     /  \            │   (pulsing animation)
│    / 20 \           │
│   /______\          │
│                     │
│   20 +5 = 25        │
│   CRITICAL!         │ ← Green border label
└─────────────────────┘
```

### Fumble (Nat 1)
```
┌─────────────────────┐
│ 🎲 Acrobatics       │
│ Aragorn • 2m ago    │
│                     │
│      /\             │ ← Red pulse effect
│     /  \            │   (pulsing animation)
│    /  1 \           │
│   /______\          │
│                     │
│    1 +4 = 5         │
│    FUMBLE!          │ ← Red border label
└─────────────────────┘
```

### Multi-Die Roll (Damage, Spell)
```
┌─────────────────────┐
│ 💥 Fireball         │
│ Wizard • 10m ago    │
│                     │
│  ┌───┐ ┌───┐       │ ← Individual dice
│  │ 6 │ │ 4 │       │   (tumble animation)
│  └───┘ └───┘       │
│  ┌───┐ ┌───┐       │
│  │ 2 │ │ 5 │       │
│  └───┘ └───┘       │
│                     │
│  4d6 = 17           │
└─────────────────────┘
```

### Attack with Damage
```
When you roll an attack, TWO entries appear:

1. ┌─────────────────────┐
   │ ⚔ Dagger (Attack)   │  ← Hit roll
   │ Rogue • just now    │
   │     /\              │
   │    /  \             │
   │   / 14 \            │
   │  /______\           │
   │   14 +6 = 20        │
   └─────────────────────┘

2. ┌─────────────────────┐
   │ 💥 Dagger (Damage)  │  ← Damage roll
   │ Rogue • just now    │
   │  ┌───┐              │
   │  │ 4 │              │
   │  └───┘              │
   │   1d4+3 = 7         │
   └─────────────────────┘
```

## Icons by Roll Type

- 🎲 = Ability checks, proficiency
- 🛡 = Saving throws
- ⚡ = Initiative
- ⚔ = Attack rolls (hit)
- 💥 = Damage rolls
- ✦ = Spell effects

## Animation States

### New Roll Animation
When a new roll is added:
1. Dice spins/tumbles (0.5s)
2. Entry slides in from right (0.4s)
3. Becomes static in history

### Critical/Fumble Animation
Continuous effects:
- Critical: Green glow pulses (1.5s cycle)
- Fumble: Red pulse (1.5s cycle)
- Label border matches effect color

## Mobile View

On screens < 768px:
- Sidebar becomes full-width
- Slides in from right covering entire screen
- Toggle button smaller (40x40px)
- Otherwise identical functionality

## Hunter x Hunter Theme

When HxH character is active:
- Borders use Nen type color (purple, green, etc.)
- Button hovers use Nen type color
- Otherwise maintains same structure
- Critical/fumble effects stay green/red

## Interaction Flow

1. User clicks ability/attack/skill
   ↓
2. Roll is calculated
   ↓
3. Entry appears at top of sidebar with animation
   ↓
4. Older rolls push down
   ↓
5. After 5 rolls, oldest is removed
   ↓
6. All rolls persist to localStorage
