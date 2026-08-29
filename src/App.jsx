import { useMemo, useState } from 'react'
import { EditModeDialog } from './components/EditModeDialog'
import { content } from './data/content'
import { useEditModeAuth } from './hooks/useEditModeAuth'
import { useGithubRepos } from './hooks/useGithubRepos'
import { HeroPortrait } from './components/HeroPortrait'
import { LanguageSkills } from './components/LanguageSkills'
import { StellwerkResults } from './components/StellwerkResults'
import { StrengthsWeaknesses } from './components/StrengthsWeaknesses'
import { SkillsManager } from './components/SkillsManager'

function App() {
  const [language, setLanguage] = useState('de')
  const text = content[language]
  const editAuth = useEditModeAuth()
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
        <img className="sticker sticker-bunny" src="/stickers/miffy.png" alt="" />
      </div>

      <header className="topbar">
        <h1 className="brand">Cynthia Ferreira Cavaleiro</h1>
        <div className="topbar-actions">
          <button
            className="ghost-button"
            type="button"
            onClick={() => setLanguage((old) => (old === 'de' ? 'en' : 'de'))}
          >
            {language === 'de' ? 'English' : 'Deutsch'}
          </button>
          <button
            className={`ghost-button ${editAuth.isOwnerMode ? 'active' : ''}`}
            type="button"
            onClick={editAuth.toggleEditMode}
          >
            {editAuth.isOwnerMode ? text.ownerModeOn : text.ownerModeOff}
          </button>
          {editAuth.isUnlocked && (
            <button className="ghost-button" type="button" onClick={editAuth.lock}>
              {text.ownerModeLock}
            </button>
          )}
        </div>
      </header>

      <EditModeDialog
        open={editAuth.showPasswordDialog}
        isConfigured={editAuth.isConfigured}
        hasError={editAuth.passwordError === 'wrong'}
        labels={{
          title: text.editDialogTitle,
          passwordLabel: text.editDialogPasswordLabel,
          passwordPlaceholder: text.editDialogPasswordPlaceholder,
          unlock: text.editDialogUnlock,
          cancel: text.editDialogCancel,
          wrongPassword: text.editDialogWrongPassword,
          notConfigured: text.editDialogNotConfigured,
        }}
        onSubmit={editAuth.submitPassword}
        onClose={editAuth.closePasswordDialog}
      />

      <main className="layout">
        <section className="card hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="pill">{text.badge}</p>
              <h1>{text.heroTitle}</h1>
              <p>{text.heroText.replace('{age}', String(age))}</p>
            </div>
            <HeroPortrait src={content.profilePhoto} alt={text.profilePhotoAlt} />
          </div>
        </section>

        <section className="card">
          <h2>{text.aboutTitle}</h2>
          <ul className="list">
            {text.aboutItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="card cv-card">
          <img className="card-spiral" src="/stickers/spiral.png" alt="" aria-hidden="true" />
          <h2>{text.cvTitle}</h2>
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
          <h2>{text.stellwerkTitle}</h2>
          <StellwerkResults
            items={text.stellwerkItems}
            scaleLabel={text.stellwerkScaleLabel}
            referenceLabel={text.stellwerkReferenceLabel}
          />
        </section>

        <section className="card">
          <h2>{text.schnuppereinsaetzeTitle}</h2>
          <ul className="list">
            {text.schnuppereinsaetzeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>{text.projectsTitle}</h2>
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

        <section className="card language-skills-card">
          <h2>{text.languagesTitle}</h2>
          <LanguageSkills languages={text.languages} language={language} />
        </section>

        <section className="card">
          <h2>{text.skillsTitle}</h2>
          <SkillsManager language={language} isOwnerMode={editAuth.isOwnerMode} />
        </section>

        <section className="card sw-section">
          <h2>{text.strengthsWeaknessesTitle}</h2>
          <StrengthsWeaknesses
            strengthsLabel={text.strengthsLabel}
            weaknessesLabel={text.weaknessesLabel}
            strengths={text.strengths}
            weaknesses={text.weaknesses}
          />
        </section>

        <section className="card">
          <h2>{text.contactTitle}</h2>
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
