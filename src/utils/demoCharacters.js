import { PROFICIENCY_LEVELS, NEN_TYPES } from '../constants';

/**
 * Get demo characters for testing
 * @returns {Array} Array of complete demo character objects
 */
export const getDemoCharacters = () => {
  const baseTime = Date.now();
  
  return [
    // D&D 5e Character 1: Battle-Hardened Fighter
    {
      id: baseTime + 1,
      name: 'Thorgrim Ironforge',
      level: 7,
      race: 'Mountain Dwarf',
      class: 'Fighter (Battle Master)',
      background: 'Soldier',
      stats: {
        str: 18,
        dex: 14,
        con: 16,
        int: 10,
        wis: 12,
        cha: 8
      },
      hp: { current: 68, max: 68, temp: 0 },
      ac: 18,
      proficiencyBonus: 3,
      skills: {
        acrobatics: PROFICIENCY_LEVELS.NONE,
        animal_handling: PROFICIENCY_LEVELS.NONE,
        arcana: PROFICIENCY_LEVELS.NONE,
        athletics: PROFICIENCY_LEVELS.EXPERTISE,
        deception: PROFICIENCY_LEVELS.NONE,
        history: PROFICIENCY_LEVELS.NONE,
        insight: PROFICIENCY_LEVELS.PROFICIENT,
        intimidation: PROFICIENCY_LEVELS.PROFICIENT,
        investigation: PROFICIENCY_LEVELS.NONE,
        medicine: PROFICIENCY_LEVELS.NONE,
        nature: PROFICIENCY_LEVELS.NONE,
        perception: PROFICIENCY_LEVELS.PROFICIENT,
        performance: PROFICIENCY_LEVELS.NONE,
        persuasion: PROFICIENCY_LEVELS.NONE,
        religion: PROFICIENCY_LEVELS.NONE,
        sleight_of_hand: PROFICIENCY_LEVELS.NONE,
        stealth: PROFICIENCY_LEVELS.NONE,
        survival: PROFICIENCY_LEVELS.PROFICIENT
      },
      savingThrows: {
        str: true,
        dex: false,
        con: true,
        int: false,
        wis: false,
        cha: false
      },
      hitDice: { current: 7, max: 7, size: 10 },
      actions: [
        {
          id: baseTime + 101,
          type: 'attack',
          category: 'action',
          name: 'Greataxe +1',
          abilityScore: 'str',
          isProficient: true,
          damageRoll: { count: 1, die: 12, modifier: 1 },
          description: 'Heavy, two-handed weapon forged in the depths of the Iron Mountains'
        },
        {
          id: baseTime + 102,
          type: 'attack',
          category: 'action',
          name: 'Handaxe',
          abilityScore: 'str',
          isProficient: true,
          damageRoll: { count: 1, die: 6, modifier: 0 },
          description: 'Light weapon. Range 20/60 ft when thrown'
        },
        {
          id: baseTime + 103,
          type: 'feature',
          category: 'bonus action',
          name: 'Second Wind',
          description: 'Regain 1d10 + 7 hit points. Recharges on short rest.'
        },
        {
          id: baseTime + 104,
          type: 'feature',
          category: 'action',
          name: 'Action Surge',
          description: 'Take one additional action on your turn. Recharges on short rest.'
        }
      ],
      features: [
        { name: 'Darkvision', description: 'See in dim light within 60 feet as if it were bright light' },
        { name: 'Dwarven Resilience', description: 'Advantage on saving throws against poison' },
        { name: 'Dwarven Combat Training', description: 'Proficiency with battleaxe, handaxe, light hammer, and warhammer' },
        { name: 'Fighting Style: Great Weapon Fighting', description: 'When you roll a 1 or 2 on damage dice, reroll the die' },
        { name: 'Extra Attack', description: 'Attack twice when you take the Attack action' },
        { name: 'Superiority Dice', description: '5d8 superiority dice for combat maneuvers' },
        { name: 'Precision Attack', description: 'Add superiority die to attack roll' },
        { name: 'Riposte', description: 'When creature misses you, use reaction to make melee attack' },
        { name: 'Trip Attack', description: 'On hit, add superiority die to damage and target makes STR save or falls prone' }
      ],
      notes: 'A grizzled veteran of countless battles. Left his mountain home to seek glory in distant lands. Known for his tactical brilliance and unshakeable resolve. Carries the ancestral greataxe "Earthbreaker" which has felled giants and dragons alike.',
      isHxH: false
    },

    // D&D 5e Character 2: Powerful Wizard
    {
      id: baseTime + 2,
      name: 'Elara Starweaver',
      level: 7,
      race: 'High Elf',
      class: 'Wizard (Evocation)',
      background: 'Sage',
      stats: {
        str: 8,
        dex: 16,
        con: 14,
        int: 20,
        wis: 12,
        cha: 10
      },
      hp: { current: 42, max: 42, temp: 0 },
      ac: 13,
      proficiencyBonus: 3,
      skills: {
        acrobatics: PROFICIENCY_LEVELS.NONE,
        animal_handling: PROFICIENCY_LEVELS.NONE,
        arcana: PROFICIENCY_LEVELS.EXPERTISE,
        athletics: PROFICIENCY_LEVELS.NONE,
        deception: PROFICIENCY_LEVELS.NONE,
        history: PROFICIENCY_LEVELS.EXPERTISE,
        insight: PROFICIENCY_LEVELS.PROFICIENT,
        intimidation: PROFICIENCY_LEVELS.NONE,
        investigation: PROFICIENCY_LEVELS.PROFICIENT,
        medicine: PROFICIENCY_LEVELS.PROFICIENT,
        nature: PROFICIENCY_LEVELS.NONE,
        perception: PROFICIENCY_LEVELS.NONE,
        performance: PROFICIENCY_LEVELS.NONE,
        persuasion: PROFICIENCY_LEVELS.NONE,
        religion: PROFICIENCY_LEVELS.PROFICIENT,
        sleight_of_hand: PROFICIENCY_LEVELS.NONE,
        stealth: PROFICIENCY_LEVELS.NONE,
        survival: PROFICIENCY_LEVELS.NONE
      },
      savingThrows: {
        str: false,
        dex: false,
        con: false,
        int: true,
        wis: true,
        cha: false
      },
      hitDice: { current: 7, max: 7, size: 6 },
      actions: [
        {
          id: baseTime + 201,
          type: 'spell',
          category: 'action',
          name: 'Fire Bolt',
          level: 0,
          effect: 'Ranged spell attack, range 120 ft',
          roll: { enabled: true, count: 2, die: 10, modifier: 0 },
          description: 'A flaming bolt streaks toward a creature or object'
        },
        {
          id: baseTime + 202,
          type: 'spell',
          category: 'action',
          name: 'Magic Missile',
          level: 1,
          effect: 'Three darts automatically hit, +1 dart per slot level above 1st',
          roll: { enabled: true, count: 3, die: 4, modifier: 3 },
          description: 'Darts of magical force that never miss'
        },
        {
          id: baseTime + 203,
          type: 'spell',
          category: 'action',
          name: 'Scorching Ray',
          level: 2,
          effect: 'Three ranged spell attacks, 2d6 fire damage each',
          roll: { enabled: true, count: 2, die: 6, modifier: 0 },
          description: 'Create three rays of fire and hurl them at targets'
        },
        {
          id: baseTime + 204,
          type: 'spell',
          category: 'action',
          name: 'Fireball',
          level: 3,
          effect: '20-ft radius, DEX save DC 17 for half damage',
          roll: { enabled: true, count: 8, die: 6, modifier: 0 },
          description: 'A bright streak flashes to a point and explodes in flame'
        },
        {
          id: baseTime + 205,
          type: 'spell',
          category: 'action',
          name: 'Lightning Bolt',
          level: 3,
          effect: '100-ft line, DEX save DC 17 for half damage',
          roll: { enabled: true, count: 8, die: 6, modifier: 0 },
          description: 'A stroke of lightning forming a line 100 feet long and 5 feet wide'
        },
        {
          id: baseTime + 206,
          type: 'spell',
          category: 'action',
          name: 'Ice Storm',
          level: 4,
          effect: '20-ft radius cylinder, DEX save DC 17',
          roll: { enabled: true, count: 4, die: 8, modifier: 0 },
          description: 'Hail and ice fall from above, bludgeoning and freezing creatures'
        },
        {
          id: baseTime + 207,
          type: 'spell',
          category: 'reaction',
          name: 'Shield',
          level: 1,
          effect: '+5 AC until start of your next turn',
          roll: { enabled: false },
          description: 'An invisible barrier of magical force appears'
        },
        {
          id: baseTime + 208,
          type: 'spell',
          category: 'reaction',
          name: 'Counterspell',
          level: 3,
          effect: 'Interrupt a creature casting a spell',
          roll: { enabled: false },
          description: 'Attempt to interrupt a creature in the process of casting a spell'
        }
      ],
      features: [
        { name: 'Darkvision', description: '60 feet darkvision' },
        { name: 'Fey Ancestry', description: 'Advantage on saves against being charmed, immune to magical sleep' },
        { name: 'Trance', description: 'Meditate 4 hours instead of sleeping 8 hours' },
        { name: 'Evocation Savant', description: 'Half cost and time to copy evocation spells' },
        { name: 'Sculpt Spells', description: 'Allies automatically succeed saves vs your evocation spells and take no damage' },
        { name: 'Potent Cantrip', description: 'Targets that succeed on saves vs your cantrips take half damage' },
        { name: 'Arcane Recovery', description: 'Once per day during short rest, recover spell slots (total level ≤ 4)' }
      ],
      notes: 'Graduated top of her class from the Arcane Academy. Specializes in destructive evocation magic. Currently researching ancient elemental magic in forgotten ruins. Known for her precise control - can detonate a fireball in a crowded room without harming allies.',
      isHxH: false
    },

    // HxH Character 1: Gon Freecss - Enhancer
    {
      id: baseTime + 3,
      name: 'Gon Freecss',
      level: 10,
      race: 'Human',
      class: 'Hunter',
      background: 'Whale Island Native',
      stats: {
        str: 18,
        dex: 16,
        con: 18,
        int: 12,
        wis: 16,
        cha: 14
      },
      hp: { current: 110, max: 110, temp: 0 },
      ac: 16,
      proficiencyBonus: 4,
      skills: {
        acrobatics: PROFICIENCY_LEVELS.PROFICIENT,
        animal_handling: PROFICIENCY_LEVELS.EXPERTISE,
        arcana: PROFICIENCY_LEVELS.NONE,
        athletics: PROFICIENCY_LEVELS.EXPERTISE,
        deception: PROFICIENCY_LEVELS.NONE,
        history: PROFICIENCY_LEVELS.NONE,
        insight: PROFICIENCY_LEVELS.PROFICIENT,
        intimidation: PROFICIENCY_LEVELS.NONE,
        investigation: PROFICIENCY_LEVELS.NONE,
        medicine: PROFICIENCY_LEVELS.NONE,
        nature: PROFICIENCY_LEVELS.PROFICIENT,
        perception: PROFICIENCY_LEVELS.EXPERTISE,
        performance: PROFICIENCY_LEVELS.NONE,
        persuasion: PROFICIENCY_LEVELS.PROFICIENT,
        religion: PROFICIENCY_LEVELS.NONE,
        sleight_of_hand: PROFICIENCY_LEVELS.NONE,
        stealth: PROFICIENCY_LEVELS.NONE,
        survival: PROFICIENCY_LEVELS.EXPERTISE
      },
      savingThrows: {
        str: true,
        dex: true,
        con: true,
        int: false,
        wis: false,
        cha: false
      },
      hitDice: { current: 10, max: 10, size: 10 },
      actions: [
        {
          id: baseTime + 301,
          type: 'attack',
          category: 'action',
          name: 'Fishing Rod Strike',
          abilityScore: 'str',
          isProficient: true,
          damageRoll: { count: 2, die: 6, modifier: 0 },
          description: 'Melee attack with enhanced fishing rod. Can grapple on hit.'
        },
        {
          id: baseTime + 302,
          type: 'hatsu',
          category: 'action',
          name: 'Jajanken: Rock (First Comes Rock!)',
          description: 'Enhancer punch. Charge for 1-3 rounds. 4d10 + STR damage per round charged. Costs 2 Hatsu slots.'
        },
        {
          id: baseTime + 303,
          type: 'hatsu',
          category: 'action',
          name: 'Jajanken: Scissors (Scissors!)',
          description: 'Transmuter blade of aura. 6d8 slashing damage, can cut through Nen constructs. Costs 3 Hatsu slots.'
        },
        {
          id: baseTime + 304,
          type: 'hatsu',
          category: 'action',
          name: 'Jajanken: Paper (Paper!)',
          description: 'Emitter blast. 120ft range, 8d6 force damage, DEX save DC 16 or knocked prone. Costs 3 Hatsu slots.'
        }
      ],
      features: [
        { name: 'Ten - Shroud', description: 'Maintain aura for defense. +2 AC while concentrating' },
        { name: 'Ren - Refine', description: 'Output extra aura. Bonus action: +2d6 to next attack this turn' },
        { name: 'Zetsu - Suppress', description: 'Hide aura completely. Advantage on Stealth, but AC reduced by 2' },
        { name: 'Gyo - Focus', description: 'See hidden Nen. Bonus action to gain truesight 60ft, concentration' },
        { name: 'En - Circle', description: 'Expand aura to sense surroundings in 50ft radius' },
        { name: 'Enhanced Senses', description: 'Incredible sense of smell and hearing, can track by scent' },
        { name: 'Simple Determination', description: 'When reduced to 0 HP, can make DC 15 CON save to drop to 1 HP instead (1/long rest)' },
        { name: 'Natural Affinity', description: 'Animals instinctively trust you unless threatened' }
      ],
      notes: 'Son of the legendary Hunter Ging Freecss. Pure Enhancer with incredible potential and growth rate. His Jajanken requires him to say "First comes rock!" and charge for several seconds, showing three fingers before choosing rock, paper, or scissors. Naive but has an unshakeable sense of justice. Best friends with Killua Zoldyck.',
      isHxH: true,
      nenType: NEN_TYPES.ENHANCER,
      hatsuSlots: {
        1: { max: 4, current: 4 },
        2: { max: 4, current: 4 },
        3: { max: 4, current: 4 },
        4: { max: 3, current: 3 },
        5: { max: 2, current: 2 },
        6: { max: 0, current: 0 },
        7: { max: 0, current: 0 },
        8: { max: 0, current: 0 },
        9: { max: 0, current: 0 }
      }
    },

    // HxH Character 2: Killua Zoldyck - Transmuter
    {
      id: baseTime + 4,
      name: 'Killua Zoldyck',
      level: 10,
      race: 'Human',
      class: 'Assassin',
      background: 'Zoldyck Family Heir',
      stats: {
        str: 16,
        dex: 20,
        con: 16,
        int: 18,
        wis: 14,
        cha: 12
      },
      hp: { current: 95, max: 95, temp: 0 },
      ac: 18,
      proficiencyBonus: 4,
      skills: {
        acrobatics: PROFICIENCY_LEVELS.EXPERTISE,
        animal_handling: PROFICIENCY_LEVELS.NONE,
        arcana: PROFICIENCY_LEVELS.NONE,
        athletics: PROFICIENCY_LEVELS.PROFICIENT,
        deception: PROFICIENCY_LEVELS.PROFICIENT,
        history: PROFICIENCY_LEVELS.NONE,
        insight: PROFICIENCY_LEVELS.PROFICIENT,
        intimidation: PROFICIENCY_LEVELS.EXPERTISE,
        investigation: PROFICIENCY_LEVELS.PROFICIENT,
        medicine: PROFICIENCY_LEVELS.PROFICIENT,
        nature: PROFICIENCY_LEVELS.NONE,
        perception: PROFICIENCY_LEVELS.EXPERTISE,
        performance: PROFICIENCY_LEVELS.NONE,
        persuasion: PROFICIENCY_LEVELS.NONE,
        religion: PROFICIENCY_LEVELS.NONE,
        sleight_of_hand: PROFICIENCY_LEVELS.EXPERTISE,
        stealth: PROFICIENCY_LEVELS.EXPERTISE,
        survival: PROFICIENCY_LEVELS.PROFICIENT
      },
      savingThrows: {
        str: false,
        dex: true,
        con: true,
        int: true,
        wis: false,
        cha: false
      },
      hitDice: { current: 10, max: 10, size: 8 },
      actions: [
        {
          id: baseTime + 401,
          type: 'attack',
          category: 'action',
          name: 'Assassin Claws',
          abilityScore: 'dex',
          isProficient: true,
          damageRoll: { count: 2, die: 6, modifier: 0 },
          description: 'Dual wielding retractable claws. Finesse, light weapons.'
        },
        {
          id: baseTime + 402,
          type: 'hatsu',
          category: 'action',
          name: 'Godspeed: Whirlwind',
          description: 'Automatic reaction mode. For 1 minute, automatically dodge attacks and make opportunity attacks. Speed doubled. Costs 4 Hatsu slots.'
        },
        {
          id: baseTime + 403,
          type: 'hatsu',
          category: 'action',
          name: 'Godspeed: Speed of Lightning',
          description: 'Ultra-fast movement. Take 3 actions this turn instead of 1. Costs 5 Hatsu slots.'
        },
        {
          id: baseTime + 404,
          type: 'hatsu',
          category: 'action',
          name: 'Thunderbolt',
          description: 'Transmute aura into electricity. Melee attack: 6d8 lightning damage + target stunned (CON save DC 17). Costs 3 Hatsu slots.'
        },
        {
          id: baseTime + 405,
          type: 'hatsu',
          category: 'bonus action',
          name: 'Lightning Palm',
          description: 'Touch attack to paralyze. Target makes CON save DC 17 or paralyzed for 1 minute. Costs 2 Hatsu slots.'
        },
        {
          id: baseTime + 406,
          type: 'feature',
          category: 'action',
          name: 'Rhythm Echo',
          description: 'Create afterimages through movement. Creates 1d4+2 illusory duplicates.'
        }
      ],
      features: [
        { name: 'Ten, Ren, Zetsu, Gyo, En', description: 'Master of all basic Nen techniques' },
        { name: 'Assassin Training', description: 'Trained from birth in the art of assassination. Immune to poison damage.' },
        { name: 'Pain Tolerance', description: 'Years of torture training. Advantage on saves vs pain and fear effects' },
        { name: 'Lightning Resistance', description: 'Electrocuted himself repeatedly to build resistance. Resistance to lightning damage' },
        { name: 'Needleless', description: 'Removed Illumi\'s needle. No longer affected by fear from strong opponents' },
        { name: 'Yo-yo Mastery', description: 'Expert at using yo-yos as weapons - can weigh 50kg each' },
        { name: 'Strategic Genius', description: 'Exceptional tactical mind, can analyze opponents mid-combat' }
      ],
      notes: 'Third child of the infamous Zoldyck assassin family. Transmuter who can convert his aura into electricity. Ran away from home to find freedom and became best friends with Gon. Struggles between his assassin upbringing and desire to protect friends. His Godspeed ability is his ultimate technique, combining automatic reactions with conscious super-speed attacks.',
      isHxH: true,
      nenType: NEN_TYPES.TRANSMUTER,
      hatsuSlots: {
        1: { max: 4, current: 4 },
        2: { max: 4, current: 4 },
        3: { max: 4, current: 4 },
        4: { max: 3, current: 3 },
        5: { max: 2, current: 2 },
        6: { max: 0, current: 0 },
        7: { max: 0, current: 0 },
        8: { max: 0, current: 0 },
        9: { max: 0, current: 0 }
      }
    },

    // HxH Character 3: Kurapika - Conjurer/Specialist
    {
      id: baseTime + 5,
      name: 'Kurapika',
      level: 10,
      race: 'Kurta',
      class: 'Chain User',
      background: 'Sole Survivor',
      stats: {
        str: 12,
        dex: 16,
        con: 14,
        int: 18,
        wis: 16,
        cha: 14
      },
      hp: { current: 85, max: 85, temp: 0 },
      ac: 15,
      proficiencyBonus: 4,
      skills: {
        acrobatics: PROFICIENCY_LEVELS.PROFICIENT,
        animal_handling: PROFICIENCY_LEVELS.NONE,
        arcana: PROFICIENCY_LEVELS.PROFICIENT,
        athletics: PROFICIENCY_LEVELS.NONE,
        deception: PROFICIENCY_LEVELS.PROFICIENT,
        history: PROFICIENCY_LEVELS.EXPERTISE,
        insight: PROFICIENCY_LEVELS.EXPERTISE,
        intimidation: PROFICIENCY_LEVELS.PROFICIENT,
        investigation: PROFICIENCY_LEVELS.EXPERTISE,
        medicine: PROFICIENCY_LEVELS.PROFICIENT,
        nature: PROFICIENCY_LEVELS.NONE,
        perception: PROFICIENCY_LEVELS.PROFICIENT,
        performance: PROFICIENCY_LEVELS.NONE,
        persuasion: PROFICIENCY_LEVELS.PROFICIENT,
        religion: PROFICIENCY_LEVELS.NONE,
        sleight_of_hand: PROFICIENCY_LEVELS.NONE,
        stealth: PROFICIENCY_LEVELS.PROFICIENT,
        survival: PROFICIENCY_LEVELS.NONE
      },
      savingThrows: {
        str: false,
        dex: true,
        con: false,
        int: true,
        wis: true,
        cha: false
      },
      hitDice: { current: 10, max: 10, size: 8 },
      actions: [
        {
          id: baseTime + 501,
          type: 'hatsu',
          category: 'action',
          name: 'Chain Jail',
          description: 'Conjure chains to bind Phantom Troupe members. Auto-hits, target completely restrained and Nen sealed. Cannot be used on non-Troupe (instant death if violated). Costs 4 Hatsu slots.'
        },
        {
          id: baseTime + 502,
          type: 'hatsu',
          category: 'action',
          name: 'Holy Chain',
          description: 'Healing chain wrapped around heart. Heal 8d8+20 HP. Can use on self or ally within 30ft. Costs 3 Hatsu slots.'
        },
        {
          id: baseTime + 503,
          type: 'hatsu',
          category: 'action',
          name: 'Steal Chain',
          description: 'Force target to enter Zetsu (cannot use Nen). Touch attack, INT save DC 17 or lose Nen for 1 hour. Costs 3 Hatsu slots.'
        },
        {
          id: baseTime + 504,
          type: 'hatsu',
          category: 'bonus action',
          name: 'Dowsing Chain',
          description: 'Divine truth or location. Ask a yes/no question about creature/object within 1 mile. Chain points toward truth. Costs 1 Hatsu slot.'
        },
        {
          id: baseTime + 505,
          type: 'hatsu',
          category: 'action',
          name: 'Judgment Chain',
          description: 'Pierce target\'s heart with contract chain. Set a condition; if violated, chain crushes heart (auto-death). Costs 5 Hatsu slots.'
        },
        {
          id: baseTime + 506,
          type: 'attack',
          category: 'action',
          name: 'Chain Strike',
          abilityScore: 'dex',
          isProficient: true,
          damageRoll: { count: 3, die: 8, modifier: 0 },
          description: 'Normal attack with conjured chains. 30ft reach.'
        }
      ],
      features: [
        { name: 'Scarlet Eyes', description: 'When enraged, eyes turn scarlet. Becomes Specialist with all Nen types at 100% efficiency. +4 to all stats for 1 hour. After effect ends, gain 1 level of exhaustion.' },
        { name: 'Emperor Time (Scarlet Eyes)', description: 'While eyes are scarlet, master all Nen types simultaneously' },
        { name: 'Last of the Kurta', description: 'Sworn vengeance against the Phantom Troupe. Advantage on attacks vs Troupe members' },
        { name: 'Genius Intellect', description: 'Mastered Nen in 6 months. Can learn new abilities quickly' },
        { name: 'Blacklist Hunter License', description: 'Authority to track and apprehend criminals' },
        { name: 'Nen Chains', description: 'Five chains, each with unique ability. Unbreakable while maintained with aura' }
      ],
      notes: 'Last survivor of the Kurta Clan, massacred by the Phantom Troupe for their Scarlet Eyes. Naturally a Conjurer, but becomes a Specialist when his eyes turn scarlet due to extreme emotion. Created his Chain Jail ability specifically to capture Phantom Troupe members - using it on anyone else will kill him instantly. Logical and calm most of the time, but rage can cloud judgment. Currently working as a bodyguard while hunting the Troupe.',
      isHxH: true,
      nenType: NEN_TYPES.CONJURER,
      hatsuSlots: {
        1: { max: 4, current: 4 },
        2: { max: 4, current: 4 },
        3: { max: 4, current: 4 },
        4: { max: 3, current: 3 },
        5: { max: 2, current: 2 },
        6: { max: 0, current: 0 },
        7: { max: 0, current: 0 },
        8: { max: 0, current: 0 },
        9: { max: 0, current: 0 }
      }
    },

    // HxH Character 4: Hisoka - Transmuter
    {
      id: baseTime + 6,
      name: 'Hisoka Morow',
      level: 12,
      race: 'Human',
      class: 'Magician',
      background: 'Hunter/Serial Killer',
      stats: {
        str: 18,
        dex: 18,
        con: 16,
        int: 16,
        wis: 14,
        cha: 20
      },
      hp: { current: 120, max: 120, temp: 0 },
      ac: 17,
      proficiencyBonus: 4,
      skills: {
        acrobatics: PROFICIENCY_LEVELS.EXPERTISE,
        animal_handling: PROFICIENCY_LEVELS.NONE,
        arcana: PROFICIENCY_LEVELS.PROFICIENT,
        athletics: PROFICIENCY_LEVELS.PROFICIENT,
        deception: PROFICIENCY_LEVELS.EXPERTISE,
        history: PROFICIENCY_LEVELS.NONE,
        insight: PROFICIENCY_LEVELS.EXPERTISE,
        intimidation: PROFICIENCY_LEVELS.EXPERTISE,
        investigation: PROFICIENCY_LEVELS.PROFICIENT,
        medicine: PROFICIENCY_LEVELS.NONE,
        nature: PROFICIENCY_LEVELS.NONE,
        perception: PROFICIENCY_LEVELS.EXPERTISE,
        performance: PROFICIENCY_LEVELS.EXPERTISE,
        persuasion: PROFICIENCY_LEVELS.PROFICIENT,
        religion: PROFICIENCY_LEVELS.NONE,
        sleight_of_hand: PROFICIENCY_LEVELS.EXPERTISE,
        stealth: PROFICIENCY_LEVELS.PROFICIENT,
        survival: PROFICIENCY_LEVELS.NONE
      },
      savingThrows: {
        str: true,
        dex: true,
        con: true,
        int: false,
        wis: false,
        cha: true
      },
      hitDice: { current: 12, max: 12, size: 8 },
      actions: [
        {
          id: baseTime + 601,
          type: 'hatsu',
          category: 'bonus action',
          name: 'Bungee Gum',
          description: 'Transmute aura into elastic gum. Attach to any surface or creature within 30ft. Can pull/swing/restrain. Has properties of both rubber and gum. Costs 2 Hatsu slots, lasts until dismissed.'
        },
        {
          id: baseTime + 602,
          type: 'hatsu',
          category: 'action',
          name: 'Texture Surprise',
          description: 'Transmute aura to reproduce any flat texture. Can disguise appearance or create fake objects. Foolproof against normal vision. Costs 1 Hatsu slot per use.'
        },
        {
          id: baseTime + 603,
          type: 'attack',
          category: 'action',
          name: 'Playing Card Throw',
          abilityScore: 'dex',
          isProficient: true,
          damageRoll: { count: 4, die: 6, modifier: 0 },
          description: 'Throw enhanced playing cards with deadly precision. Range 60/120 ft. Can target multiple creatures.'
        },
        {
          id: baseTime + 604,
          type: 'attack',
          category: 'action',
          name: 'Bungee Gum Strike',
          abilityScore: 'str',
          isProficient: true,
          damageRoll: { count: 5, die: 8, modifier: 0 },
          description: 'Punch/kick enhanced with Bungee Gum for devastating impact. Can pull self to target or target to self.'
        }
      ],
      features: [
        { name: 'Master Nen User', description: 'Absolute mastery of all basic and advanced Nen techniques' },
        { name: 'Magician\'s Sleight', description: 'Can hide and produce objects seemingly from nowhere' },
        { name: 'Combat Genius', description: 'Reads opponents instantly, can predict moves before they happen' },
        { name: 'Pain = Pleasure', description: 'Immune to being frightened. Takes no penalty from pain.' },
        { name: 'Bloodlust Aura', description: 'Can emanate terrifying killing intent. Creatures within 30ft must make WIS save DC 18 or become frightened' },
        { name: 'Immortality (Posthumous Nen)', description: 'If killed, Bungee Gum automatically activates to repair fatal damage. Resurrection (1/lifetime)' },
        { name: 'Showman', description: 'Everything is a performance. Can use Performance check to distract in combat' }
      ],
      notes: 'A deadly transmuter with a sadistic personality and obsession with fighting strong opponents. His Bungee Gum has the properties of both rubber and gum - can be used to attach to opponents, create traps, enhance strikes, or manipulate his environment. Frequently uses it in combination with his playing cards. Member of the Phantom Troupe (number 4) but his loyalty is questionable. Fixated on Gon\'s potential and wants to fight him when he\'s stronger. Often disguises himself or his abilities with Texture Surprise.',
      isHxH: true,
      nenType: NEN_TYPES.TRANSMUTER,
      hatsuSlots: {
        1: { max: 4, current: 4 },
        2: { max: 4, current: 4 },
        3: { max: 4, current: 4 },
        4: { max: 4, current: 4 },
        5: { max: 3, current: 3 },
        6: { max: 2, current: 2 },
        7: { max: 0, current: 0 },
        8: { max: 0, current: 0 },
        9: { max: 0, current: 0 }
      }
    }
  ];
};
