import React, { useCallback, useEffect, useState } from 'react'
import MoviesList from './components/MoviesList'
import AddMovie from './components/AddMovie'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMoviesHandler = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('https://react-http-70be7-default-rtdb.europe-west1.firebasedatabase.app/movies.json')
      // https://react-http-70be7-default-rtdb.europe-west1.firebasedatabase.app/movies.json
      // https://swapi.dev/api/films
      if (!res.ok) throw new Error('Something went wrong!')
      const data = await res.json()

      const loadedMovies = []
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

      // const transformedMovies = data.map(movie => ({ id: movie.episode_id, title: movie.title, openingText: movie.opening_crawl, releaseDate: movie.release_date }))
      // setMovies(transformedMovies)
      setMovies(loadedMovies)
    } catch (err) { setError(err.message) }
    setLoading(false)
  }, [])

  useEffect(() => { fetchMoviesHandler() }, [fetchMoviesHandler])

  const addMovieHandler = async (movie) => {
    console.log(movie)
    let options = {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: { 'Content-Type': 'application/json' }
    }
    const res = await fetch('https://react-http-70be7-default-rtdb.europe-west1.firebasedatabase.app/movies.json', options)
    const data = res.json()
    console.log(data)
  }

  let content = <p>No movies were found</p>
  if (movies.length > 0) content = <MoviesList movies={movies} />
  if (error) content = <p>{error}</p>
  if (loading) content = <p>Loading...</p>

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment >
  )
}

export default App
