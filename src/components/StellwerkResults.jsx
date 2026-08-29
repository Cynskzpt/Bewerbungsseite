const SCALE_MIN = 200
const SCALE_MAX = 800
const REFERENCE_SCORE = 500

function scorePercent(score) {
  return Math.max(0, Math.min(100, ((score - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100))
}

export function StellwerkResults({ items, scaleLabel, referenceLabel }) {
  const referenceLeft = `${scorePercent(REFERENCE_SCORE)}%`

  return (
    <div className="stellwerk-list">
      {items.map((item) => (
        <article key={item.id} className="stellwerk-card">
          <div className="stellwerk-card-header">
            <div>
              <h3>{item.title}</h3>
              {item.subtitle && <p className="stellwerk-subtitle">{item.subtitle}</p>}
            </div>
            {item.file && (
              <a className="ghost-button stellwerk-pdf-link" href={item.file} target="_blank" rel="noreferrer">
                {item.openLabel}
              </a>
            )}
          </div>

          {item.subjects?.length > 0 && (
            <>
              <div className="stellwerk-legend">
                <p className="stellwerk-scale-label">{scaleLabel}</p>
                <p className="stellwerk-reference-label">
                  <span className="stellwerk-reference-swatch" aria-hidden="true" />
                  {referenceLabel}
                </p>
              </div>
              <ul className="stellwerk-subjects">
                {item.subjects.map((subject) => (
                  <li key={subject.name} className="stellwerk-subject">
                    <div className="stellwerk-subject-meta">
                      <span className="stellwerk-subject-name">{subject.name}</span>
                      <span className="stellwerk-subject-score">{subject.score}</span>
                    </div>
                    <div
                      className="stellwerk-bar-track"
                      role="img"
                      aria-label={`${subject.name}: ${subject.score}. ${referenceLabel}`}
                    >
                      <div
                        className="stellwerk-bar-fill"
                        style={{ width: `${scorePercent(subject.score)}%` }}
                      />
                      <span
                        className="stellwerk-reference-line"
                        style={{ left: referenceLeft }}
                        aria-hidden="true"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>
      ))}
    </div>
  )
}
