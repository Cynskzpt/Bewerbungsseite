import { useMemo, useState } from 'react'

const STORAGE_KEY = 'cynthia-portfolio-skills'
const CATEGORIES = ['learned', 'inProgress', 'planned']

const labels = {
  de: {
    learned: 'Gelernt',
    inProgress: 'Bin ich dran',
    planned: 'Geplant zu lernen',
    addPlaceholder: 'Neuen Skill eintragen...',
    addLearned: 'Gelernt',
    addInProgress: 'Bin ich dran',
    addPlanned: 'Geplant',
    moveLabel: 'Verschieben nach',
    ownerHint:
      'Im Bearbeitungsmodus kannst du Skills hinzufuegen und mit dem Dropdown in eine andere Spalte verschieben.',
    viewerHint: 'Aktiviere den Bearbeitungsmodus, um Skills zu bearbeiten.',
    emptyLearned: 'Noch keine gelernten Skills.',
    emptyInProgress: 'Noch keine Skills, an denen du gerade arbeitest.',
    emptyPlanned: 'Noch keine geplanten Skills.',
  },
  en: {
    learned: 'Learned',
    inProgress: 'Working on',
    planned: 'Planned to learn',
    addPlaceholder: 'Add a new skill...',
    addLearned: 'Learned',
    addInProgress: 'Working on',
    addPlanned: 'Planned',
    moveLabel: 'Move to',
    ownerHint:
      'In edit mode you can add skills and use the dropdown to move them between columns.',
    viewerHint: 'Enable edit mode to manage your skills.',
    emptyLearned: 'No learned skills added yet.',
    emptyInProgress: 'No skills you are working on yet.',
    emptyPlanned: 'No planned skills added yet.',
  },
}

const emptyKeys = {
  learned: 'emptyLearned',
  inProgress: 'emptyInProgress',
  planned: 'emptyPlanned',
}

const addKeys = {
  learned: 'addLearned',
  inProgress: 'addInProgress',
  planned: 'addPlanned',
}

function normalizeSkillList(value) {
  if (!Array.isArray(value)) return []
  return value.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim())
}

function loadInitialSkills() {
  const fallback = {
    learned: ['Python', 'Scratch', 'Grundlagen Webentwicklung'],
    inProgress: ['React', 'TypeScript'],
    planned: ['SQL', 'Node.js', 'Cloud Basics'],
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return fallback
    const parsed = JSON.parse(saved)
    if (!parsed || typeof parsed !== 'object') return fallback

    const learned = normalizeSkillList(parsed.learned)
    const inProgress = normalizeSkillList(parsed.inProgress)
    const planned = normalizeSkillList(parsed.planned)

    if (learned.length === 0 && inProgress.length === 0 && planned.length === 0) {
      return fallback
    }

    return { learned, inProgress, planned }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return fallback
  }
}

function hasSkill(skills, name) {
  return CATEGORIES.some((category) => skills[category].includes(name))
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
    if (!normalizedSkill || hasSkill(skills, normalizedSkill)) return
    const next = {
      learned: [...skills.learned],
      inProgress: [...skills.inProgress],
      planned: [...skills.planned],
    }
    next[target].push(normalizedSkill)
    save(next)
    setNewSkill('')
  }

  function moveSkill(skillName, target) {
    if (!CATEGORIES.includes(target)) return
    const next = {
      learned: skills.learned.filter((item) => item !== skillName),
      inProgress: skills.inProgress.filter((item) => item !== skillName),
      planned: skills.planned.filter((item) => item !== skillName),
    }
    next[target].push(skillName)
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
          {CATEGORIES.map((category) => (
            <button key={category} type="button" onClick={() => addSkill(category)}>
              {t[addKeys[category]]}
            </button>
          ))}
        </div>
      )}

      <div className="skills-columns">
        {CATEGORIES.map((category) => (
          <article key={category} className="skills-column">
            <h3>{t[category]}</h3>
            {skills[category].length === 0 && <p>{t[emptyKeys[category]]}</p>}
            <ul className="list">
              {skills[category].map((skill) => (
                <li key={`${category}-${skill}`}>
                  {isOwnerMode ? (
                    <div className="skill-row-edit">
                      <span>{skill}</span>
                      <label className="skill-move">
                        <span className="skill-move-label">{t.moveLabel}</span>
                        <select
                          value={category}
                          onChange={(event) => moveSkill(skill, event.target.value)}
                        >
                          {CATEGORIES.map((option) => (
                            <option key={option} value={option}>
                              {t[option]}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  ) : (
                    <span>{skill}</span>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}
