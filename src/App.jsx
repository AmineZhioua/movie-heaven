import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import NavSearch from './components/NavSearch';
import NavResultsNum from './components/NavResultsNum';
import Box from './components/UI/Box';
import Main from './components/UI/Main';
import SearchedMoviesList from './components/SearchedMoviesList';
import WatchedSummary from './components/WatchedSummary';
import ErrorMessage from './components/UI/ErrorMessage';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import MovieDetails from './components/MovieDetails';
import WatchedMovieList from './components/WatchedMovieList';

// const apiKey = process.env.REACT_APP_OMDB_API_KEY;

/* eslint-disable*/
const MySwal = withReactContent(Swal);

function App() {
  // All States
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(function() {
    const storedMovies = JSON.parse(localStorage.getItem("watched"));
    return storedMovies ? storedMovies : [];
  });


  // All Handlers
  // Movie Selection Handler
  function handleSelectedMovie(id) {
    setSelectedId(id);
  }

  // Closing Movie Handler
  function handleOnCloseMovie() {
    setSelectedId(null);
  }

  // Adding a Movie To Watched List Handler
  function addWatchedHandler(newWatched) {
    setWatched((watched) => [...watched, newWatched]);
    setSelectedId(null);
  }

  // Deleting a Movie From The Movie List
  function deleteMovieHandler(id) {
    setWatched((watched) => watched.filter((movies) => movies.imdbID !== id));
  }


  // ALL SIDE EFFECTS
  useEffect(function() {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const result = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${"8ba7e4f"}&s=${query || "spider"}`, 
          { signal: controller.signal });

        const data = await result.json();
        if(data.Response === 'False') {
          throw new Error('Movie not found');
        }

        setMovies(data.Search);
        setError("");
      }
      catch(error) {
        if(error.name !== "AbortError") {
          setError(error.message);
        }
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);





  // Main Application Components
  return (
    <div>
      <NavBar>
        <NavSearch query={query} setQuery={setQuery} />
        <NavResultsNum resultLength={ movies.length } />
      </NavBar>

      <Main>
        {/* Left Box */}
        <Box>
          { isLoading && <p className='loader'>Loading...</p> }
          { !isLoading && !error && <SearchedMoviesList movies={ movies } onSelectMovie={ handleSelectedMovie } /> }
          { error && <ErrorMessage message= { error } /> }
        </Box>

        {/* Right Box */}
        <Box>
          { selectedId ? 
            <MovieDetails 
              selectedId={ selectedId } 
              onCloseMovie={ handleOnCloseMovie } 
              onSetWatched={ addWatchedHandler }
              watched={ watched } /> 
            : 
            <>
              <WatchedSummary watchedArray={ watched || []} />
              <WatchedMovieList watched={ watched } onDeleteWatched={ deleteMovieHandler } />
            </>
          }
        </Box>
      </Main>
    </div>
  );
}




export default App;