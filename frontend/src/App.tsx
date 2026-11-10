
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [cursos, setCursos] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function obtenerCursos() {
      try {
        const response = await fetch('/api/cursos')

        if (!response.ok) {
          throw new Error('No se pudieron obtener los cursos')
        }

        const data: string[] = await response.json()
        setCursos(data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    obtenerCursos()
  }, [])

  return (
    <main>
      <h1>Aprendamos</h1>
      <h2>Catálogo de cursos</h2>

      {loading && <p>Cargando cursos...</p>}

      {error && (
        <p role="alert">No se pudieron cargar los cursos. Intentá nuevamente.</p>
      )}

      {!loading && !error && cursos.length === 0 && (
        <p>No hay cursos disponibles por el momento.</p>
      )}

      {!loading && !error && cursos.length > 0 && (
        <ul>
          {cursos.map((curso, index) => (
            <li key={index}>{curso}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
