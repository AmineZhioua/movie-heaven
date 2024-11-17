import React from 'react'
import SearchedMovie from './SearchedMovie.jsx';


function SearchedMoviesList({ movies, onSelectMovie }) {
    return (
        <ul className='list list-movies'>
            {movies.map((movie) => (
                <SearchedMovie 
                    key={movie.imdbID}
                    movie={movie}
                    onSelectId={ onSelectMovie }
                />
            ))}
        </ul>
    );
}






export default SearchedMoviesList;