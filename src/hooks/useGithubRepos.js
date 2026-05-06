import { useEffect, useState } from 'react'

export function useGithubRepos(username) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    async function loadRepos() {
      try {
        setLoading(true)
        setError(false)
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=12&type=owner`,
        )
        if (!response.ok) throw new Error('GitHub API request failed')
        const json = await response.json()
        const visibleRepos = json
          .filter((repo) => !repo.private)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        if (active) setRepos(visibleRepos)
      } catch {
        if (active) setError(true)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadRepos()
    return () => {
      active = false
    }
  }, [username])

  return { repos, loading, error }
}
