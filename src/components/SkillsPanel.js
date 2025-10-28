import React, { useState } from 'react';
import { 
  SKILLS, 
  SKILL_NAMES, 
  SKILL_ABILITIES,
  PROFICIENCY_LEVELS,
  ABILITY_NAMES 
} from '../constants';
import { calculateSkillModifier } from '../utils/characterUtils';
import { rollD20 } from '../utils/diceUtils';
import { ROLL_DISPLAY_DURATION } from '../constants';

const SkillsPanel = ({ character, onUpdate, isEditing = false }) => {
  const [rollResult, setRollResult] = useState(null);

  const handleSkillRoll = (skill) => {
    const modifier = calculateSkillModifier(character, skill);
    const result = rollD20(modifier);
    
    setRollResult({
      skill: SKILL_NAMES[skill],
      ...result
    });
    
    setTimeout(() => setRollResult(null), ROLL_DISPLAY_DURATION);
  };

  const updateSkillProficiency = (skill, level) => {
    onUpdate({
      ...character,
      skills: {
        ...character.skills,
        [skill]: level
      }
    });
  };

  const cycleProficiency = (skill) => {
    const current = character.skills[skill] || PROFICIENCY_LEVELS.NONE;
    let next;
    
    if (current === PROFICIENCY_LEVELS.NONE) {
      next = PROFICIENCY_LEVELS.PROFICIENT;
    } else if (current === PROFICIENCY_LEVELS.PROFICIENT) {
      next = PROFICIENCY_LEVELS.EXPERTISE;
    } else {
      next = PROFICIENCY_LEVELS.NONE;
    }
    
    updateSkillProficiency(skill, next);
  };

  if (isEditing) {
    return (
      <div>
        <div className="mb-2 opacity-60 text-xs">╔═ skills</div>
        <div className="space-y-1">
          {Object.values(SKILLS).map(skill => {
            const proficiency = character.skills[skill] || PROFICIENCY_LEVELS.NONE;
            const modifier = calculateSkillModifier(character, skill);
            const ability = SKILL_ABILITIES[skill];
            
            return (
              <div key={skill} className="border border-white p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => cycleProficiency(skill)}
                    className="w-16 text-xs border border-white px-2 py-1 hover:bg-white hover:text-neutral-800 transition-colors"
                  >
                    {proficiency === PROFICIENCY_LEVELS.NONE && '○'}
                    {proficiency === PROFICIENCY_LEVELS.PROFICIENT && '●'}
                    {proficiency === PROFICIENCY_LEVELS.EXPERTISE && '◉'}
                  </button>
                  <div>
                    <div className="text-sm">{SKILL_NAMES[skill]}</div>
                    <div className="text-xs opacity-60">{ABILITY_NAMES[ability]}</div>
                  </div>
                </div>
                <div className="text-sm font-mono">
                  {modifier >= 0 ? '+' : ''}{modifier}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-2 text-xs opacity-60">
          click to cycle: ○ none → ● proficient → ◉ expertise
        </div>
      </div>
    );
  }

  // View mode
  return (
    <div>
      {rollResult && (
        <div className="mb-4 border border-white p-3 bg-neutral-900">
          <div>
            <span className="opacity-60">{rollResult.skill}:</span>
            <span className="ml-2">d20({rollResult.d20}) {rollResult.modifier} = </span>
            <span className="text-xl ml-2">{rollResult.total}</span>
          </div>
        </div>
      )}

      <div className="mb-2 opacity-60 text-xs">╔═ skills</div>
      <div className="grid grid-cols-2 gap-2">
        {Object.values(SKILLS).map(skill => {
          const proficiency = character.skills[skill] || PROFICIENCY_LEVELS.NONE;
          const modifier = calculateSkillModifier(character, skill);
          
          if (proficiency === PROFICIENCY_LEVELS.NONE) return null;
          
          return (
            <button
              key={skill}
              onClick={() => handleSkillRoll(skill)}
              className="border border-white p-2 text-left hover:bg-white hover:text-neutral-800 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm">
                    {proficiency === PROFICIENCY_LEVELS.EXPERTISE && '◉ '}
                    {proficiency === PROFICIENCY_LEVELS.PROFICIENT && '● '}
                    {SKILL_NAMES[skill]}
                  </div>
                </div>
                <div className="text-sm font-mono">
                  {modifier >= 0 ? '+' : ''}{modifier}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <button
        onClick={() => {
          // Show all skills in a modal or expanded view
          alert('Click edit to manage all skills');
        }}
        className="mt-2 w-full px-3 py-1 border border-white hover:bg-white hover:text-neutral-800 transition-colors text-xs"
      >
        view all skills
      </button>
    </div>
  );
};

export default SkillsPanel;
