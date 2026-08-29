export function StrengthsWeaknesses({
  strengthsLabel,
  weaknessesLabel,
  strengths,
  weaknesses,
}) {
  return (
    <div className="sw-grid">
      <div className="sw-column sw-strengths">
        <h3 className="sw-column-title">{strengthsLabel}</h3>
        <div className="sw-items">
          {strengths.map((item) => (
            <article key={item.title} className="sw-item sw-item-strength">
              <h4>{item.title}</h4>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="sw-column sw-weaknesses">
        <h3 className="sw-column-title">{weaknessesLabel}</h3>
        <div className="sw-items">
          {weaknesses.map((item) => (
            <article key={item.title} className="sw-item sw-item-weakness">
              <h4>{item.title}</h4>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {item.growth && <p className="sw-growth">{item.growth}</p>}
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
