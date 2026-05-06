import { useMemo, useState } from 'react'
import { content } from './data/content'
import { useGithubRepos } from './hooks/useGithubRepos'
import { SkillsManager } from './components/SkillsManager'

function App() {
  const [language, setLanguage] = useState('de')
  const [isOwnerMode, setIsOwnerMode] = useState(false)
  const text = content[language]
  const { repos, loading, error } = useGithubRepos(content.githubUsername)

  const age = useMemo(() => {
    const birth = new Date(content.birthDate)
    const today = new Date()
    let years = today.getFullYear() - birth.getFullYear()
    const beforeBirthday =
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    if (beforeBirthday) years -= 1
    return years
  }, [])

  return (
    <div className="page">
      <div className="floating-stickers" aria-hidden="true">
        <img className="sticker sticker-cat" src="/stickers/cat.png" alt="" />
        <span className="sticker sticker-spiral-a">🌀</span>
        <span className="sticker sticker-spiral-b">➰</span>
        <img className="sticker sticker-bunny" src="/stickers/miffy.png" alt="" />
        <span className="sticker sticker-star">✦</span>
      </div>

      <header className="topbar">
        <p className="brand">Cynthia Ferreira Cavaleiro</p>
        <div className="topbar-actions">
          <button
            className="ghost-button"
            type="button"
            onClick={() => setLanguage((old) => (old === 'de' ? 'en' : 'de'))}
          >
            {language === 'de' ? 'English' : 'Deutsch'}
          </button>
          <button
            className={`ghost-button ${isOwnerMode ? 'active' : ''}`}
            type="button"
            onClick={() => setIsOwnerMode((old) => !old)}
          >
            {isOwnerMode ? text.ownerModeOn : text.ownerModeOff}
          </button>
        </div>
      </header>

      <main className="layout">
        <section className="card hero">
          <p className="pill">🌀 {text.badge}</p>
          <h1>{text.heroTitle}</h1>
          <p>{text.heroText.replace('{age}', String(age))}</p>
        </section>

        <section className="card">
          <h2>🐈 {text.aboutTitle}</h2>
          <ul className="list">
            {text.aboutItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>✦ {text.cvTitle}</h2>
          <div className="timeline">
            {text.cvTimeline.map((item) => (
              <article key={item.title} className="timeline-item">
                <p className="timeline-year">{item.year}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>🌀 {text.projectsTitle}</h2>
          {loading && <p>{text.loadingProjects}</p>}
          {error && <p>{text.projectsError}</p>}
          {!loading && !error && (
            <div className="projects">
              {repos.length === 0 && <p>{text.noProjects}</p>}
              {repos.map((repo) => (
                <a key={repo.id} className="project" href={repo.html_url} target="_blank" rel="noreferrer">
                  <h3>{repo.name}</h3>
                  <p>{repo.description || text.noDescription}</p>
                  <span>{text.updatedAt}: {new Date(repo.updated_at).toLocaleDateString(language)}</span>
                </a>
              ))}
            </div>
          )}
        </section>

        <section className="card">
          <h2>🐰 {text.skillsTitle}</h2>
          <SkillsManager language={language} isOwnerMode={isOwnerMode} />
        </section>

        <section className="card">
          <h2>➰ {text.contactTitle}</h2>
          <ul className="list">
            <li>Email: <a href="mailto:cynthiacavaleiro2011@outlook.com">cynthiacavaleiro2011@outlook.com</a></li>
            <li>Telefon: <a href="tel:+41762058062">+41 76 205 80 62</a></li>
            <li>Adresse: Urdorferstrasse 89, 8952 Schlieren</li>
            <li>Nationalitaet: Schweiz / Portugal</li>
            <li>
              GitHub:{' '}
              <a href={`https://github.com/${content.githubUsername}`} target="_blank" rel="noreferrer">
                @{content.githubUsername}
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
