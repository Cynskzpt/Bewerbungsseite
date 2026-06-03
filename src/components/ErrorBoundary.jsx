import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('App render error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h1>Etwas ist schiefgelaufen</h1>
          <p>
            Die Seite konnte nicht geladen werden. Bitte lade die Seite neu. Wenn das Problem bleibt,
            leere den Browser-Cache oder setze die Skills-Daten zurueck.
          </p>
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              localStorage.removeItem('cynthia-portfolio-skills')
              window.location.reload()
            }}
          >
            Skills-Daten zuruecksetzen und neu laden
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
