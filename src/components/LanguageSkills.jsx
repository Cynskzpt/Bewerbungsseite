const MAX_LEVEL = 5

export function LanguageSkills({ languages, language = 'de' }) {
  const levelLabel = language === 'de' ? 'von' : 'of'

  return (
    <ul className="language-skills-list">
      {languages.map((lang) => (
        <li key={lang.name} className="language-row">
          <div
            className="language-dots"
            role="img"
            aria-label={`${lang.name}: ${lang.level} ${levelLabel} ${MAX_LEVEL}`}
          >
            {Array.from({ length: MAX_LEVEL }, (_, i) => (
              <span
                key={i}
                className={`language-dot ${i < lang.level ? 'filled' : ''}`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="language-name">{lang.name}</span>
        </li>
      ))}
    </ul>
  )
}
