# Demo Characters Guide

The app now automatically loads 6 complete demo characters on first launch for testing purposes!

## Standard D&D 5e Characters

### 1. Thorgrim Ironforge - Level 7 Fighter (Battle Master)
- **Race:** Mountain Dwarf
- **Build:** Strength-based melee combatant with tactical superiority maneuvers
- **Stats:** STR 18, DEX 14, CON 16
- **Weapons:** Greataxe +1, Handaxes
- **Features:** Darkvision, Dwarven Resilience, Great Weapon Fighting, Extra Attack, Superiority Dice
- **Combat Role:** Frontline tank/damage dealer with tactical options
- **Backstory:** Grizzled veteran seeking glory, carries ancestral greataxe "Earthbreaker"

### 2. Elara Starweaver - Level 7 Wizard (Evocation)
- **Race:** High Elf
- **Build:** Blaster wizard specializing in destructive magic
- **Stats:** STR 8, DEX 16, CON 14, INT 20
- **Spells:** Fire Bolt, Magic Missile, Scorching Ray, Fireball, Lightning Bolt, Ice Storm, Shield, Counterspell
- **Features:** Darkvision, Fey Ancestry, Sculpt Spells (allies immune to your AoE), Potent Cantrip
- **Combat Role:** Artillery/crowd control with precise magical destruction
- **Backstory:** Top of her class at the Arcane Academy, researching ancient elemental magic

## Hunter x Hunter Characters

### 3. Gon Freecss - Level 10 Hunter (Enhancer)
- **Nen Type:** Enhancer
- **Build:** Pure physical combat with devastating Jajanken techniques
- **Stats:** STR 18, DEX 16, CON 18, WIS 16
- **Signature Ability:** Jajanken (Rock/Paper/Scissors) - Each with different damage types
  - Rock: Charged enhancer punch (4d10 per round charged)
  - Scissors: Transmuter blade that cuts through Nen (6d8 slashing)
  - Paper: Emitter blast with knockback (8d6 force, 120ft range)
- **Features:** All basic Nen techniques (Ten, Ren, Zetsu, Gyo, En), Enhanced Senses, Natural Affinity with animals
- **Personality:** Naive but determined, unshakeable sense of justice
- **Background:** Son of legendary Ging Freecss, from Whale Island, best friends with Killua

### 4. Killua Zoldyck - Level 10 Assassin (Transmuter)
- **Nen Type:** Transmuter
- **Build:** Speed-based assassin with electricity powers
- **Stats:** STR 16, DEX 20, CON 16, INT 18
- **Signature Ability:** Godspeed - Ultimate speed technique with two modes
  - Whirlwind: Automatic dodging and counterattacks for 1 minute
  - Speed of Lightning: Take 3 actions in one turn
- **Other Abilities:** Thunderbolt (6d8 lightning + stun), Lightning Palm (paralyze), Rhythm Echo (afterimages)
- **Features:** Assassin training, Pain Tolerance, Lightning Resistance, Yo-yo mastery
- **Personality:** Strategic genius, struggles between assassin past and protecting friends
- **Background:** Third child of infamous Zoldyck assassin family, ran away from home

### 5. Kurapika - Level 10 Chain User (Conjurer/Specialist)
- **Nen Type:** Conjurer (Specialist when Scarlet Eyes activate)
- **Build:** Versatile support/control with powerful restrictions
- **Stats:** STR 12, DEX 16, CON 14, INT 18, WIS 16
- **Signature Abilities:** Five Nen Chains with unique powers
  - Chain Jail: Binding chains (Phantom Troupe only - instant death if violated)
  - Holy Chain: Healing (8d8+20 HP)
  - Steal Chain: Force Zetsu (removes Nen abilities)
  - Dowsing Chain: Divine truth/location
  - Judgment Chain: Contract enforcement (kills if violated)
- **Scarlet Eyes:** When enraged, becomes Specialist with mastery of all Nen types, +4 all stats, but causes exhaustion
- **Personality:** Logical and calm, but rage can cloud judgment
- **Background:** Last survivor of Kurta Clan, hunting the Phantom Troupe for revenge

### 6. Hisoka Morow - Level 12 Magician (Transmuter)
- **Nen Type:** Transmuter  
- **Build:** Deceptive combatant who toys with opponents
- **Stats:** STR 18, DEX 18, CON 16, INT 16, CHA 20
- **Signature Abilities:**
  - Bungee Gum: Elastic/sticky aura (has properties of both rubber and gum)
  - Texture Surprise: Reproduce any flat texture for disguises
  - Enhanced playing cards as deadly projectiles
- **Features:** Combat Genius, Pain = Pleasure (immune to fear/pain), Bloodlust Aura, Posthumous Nen (resurrection)
- **Personality:** Sadistic, obsessed with fighting strong opponents, everything is a performance
- **Background:** Former Phantom Troupe member #4, serial killer, fixated on Gon's potential

## Testing Features

These characters are perfect for testing:
- ✅ **Roll variety:** Different types of rolls (attacks, spells, checks, saves)
- ✅ **Nen abilities:** All HxH characters have Hatsu slots and Nen-specific features
- ✅ **Different builds:** Melee, ranged, magic, physical, tactical
- ✅ **Skill proficiencies:** Each has unique skill focuses
- ✅ **Nen type variety:** Enhancer, Transmuter (x2), Conjurer/Specialist
- ✅ **Realistic stat distribution:** Optimized but not min-maxed
- ✅ **Complete features:** All have proper features, actions, and backgrounds
- ✅ **Theme accuracy:** HxH characters reflect their canon abilities faithfully

## How It Works

On first launch (when localStorage is empty):
1. App checks for existing characters
2. If none found AND demo hasn't been loaded before, it loads these 6 characters
3. Sets a flag so demo won't load again
4. You can still create, edit, or delete these characters normally

To reset and reload demo characters:
- Clear localStorage in browser dev tools
- Or delete all characters and refresh the page
