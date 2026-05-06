import { useMemo, useState } from 'react'

const STORAGE_KEY = 'cynthia-portfolio-skills'

const labels = {
  de: {
    learned: 'Gelernt',
    planned: 'Geplant zu lernen',
    addPlaceholder: 'Neuen Skill eintragen...',
    addLearned: 'Als gelernt hinzufuegen',
    addPlanned: 'Als geplant hinzufuegen',
    ownerHint:
      'Im Bearbeitungsmodus kannst du Skills hinzufuegen. Mit Checkboxen verschiebst du Skills zwischen geplant und gelernt.',
    viewerHint: 'Aktiviere den Bearbeitungsmodus, um Skills zu bearbeiten.',
    emptyLearned: 'Noch keine eingetragenen gelernten Skills.',
    emptyPlanned: 'Noch keine eingetragenen geplanten Skills.',
  },
  en: {
    learned: 'Learned',
    planned: 'Planned to learn',
    addPlaceholder: 'Add a new skill...',
    addLearned: 'Add as learned',
    addPlanned: 'Add as planned',
    ownerHint:
      'In edit mode you can add skills. Checkboxes move skills between planned and learned.',
    viewerHint: 'Enable edit mode to manage your skills.',
    emptyLearned: 'No learned skills added yet.',
    emptyPlanned: 'No planned skills added yet.',
  },
}

function loadInitialSkills() {
  const fallback = {
    learned: ['Python', 'Scratch', 'Grundlagen Webentwicklung'],
    planned: ['React', 'TypeScript', 'SQL', 'Node.js', 'Cloud Basics'],
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return fallback
    const parsed = JSON.parse(saved)
    if (!parsed.learned || !parsed.planned) return fallback
    return parsed
  } catch {
    return fallback
  }
}

export function SkillsManager({ language, isOwnerMode }) {
  const [skills, setSkills] = useState(loadInitialSkills)
  const [newSkill, setNewSkill] = useState('')
  const t = labels[language]

  const normalizedSkill = useMemo(() => newSkill.trim(), [newSkill])

  function save(next) {
    setSkills(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function addSkill(target) {
    if (!normalizedSkill) return
    const next = {
      learned: [...skills.learned],
      planned: [...skills.planned],
    }
    if (next.learned.includes(normalizedSkill) || next.planned.includes(normalizedSkill)) return
    next[target].push(normalizedSkill)
    save(next)
    setNewSkill('')
  }

  function toggleToLearned(skillName) {
    const next = {
      learned: [...skills.learned, skillName],
      planned: skills.planned.filter((item) => item !== skillName),
    }
    save(next)
  }

  function toggleToPlanned(skillName) {
    const next = {
      learned: skills.learned.filter((item) => item !== skillName),
      planned: [...skills.planned, skillName],
    }
    save(next)
  }

  return (
    <div className="skills-manager">
      <p className="hint">{isOwnerMode ? t.ownerHint : t.viewerHint}</p>

      {isOwnerMode && (
        <div className="skill-add">
          <input
            value={newSkill}
            onChange={(event) => setNewSkill(event.target.value)}
            placeholder={t.addPlaceholder}
            type="text"
          />
          <button type="button" onClick={() => addSkill('learned')}>
            {t.addLearned}
          </button>
          <button type="button" onClick={() => addSkill('planned')}>
            {t.addPlanned}
          </button>
        </div>
      )}

      <div className="skills-columns">
        <article>
          <h3>{t.learned}</h3>
          {skills.learned.length === 0 && <p>{t.emptyLearned}</p>}
          <ul className="list">
            {skills.learned.map((skill) => (
              <li key={`learned-${skill}`}>
                <label className="check-row">
                  {isOwnerMode && (
                    <input
                      type="checkbox"
                      checked
                      onChange={() => toggleToPlanned(skill)}
                    />
                  )}
                  <span>{skill}</span>
                </label>
              </li>
            ))}
          </ul>
        </article>

        <article>
          <h3>{t.planned}</h3>
          {skills.planned.length === 0 && <p>{t.emptyPlanned}</p>}
          <ul className="list">
            {skills.planned.map((skill) => (
              <li key={`planned-${skill}`}>
                <label className="check-row">
                  {isOwnerMode && (
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={() => toggleToLearned(skill)}
                    />
                  )}
                  <span>{skill}</span>
                </label>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  )
}
