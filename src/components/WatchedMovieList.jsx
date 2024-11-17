import React from 'react';
import WatchedMovie from './WatchedMovie';


function WatchedMovieList({ watched, onDeleteWatched }) {
    return (
        <ul className="list list-movies">
            {watched?.map((movie) => (
                <WatchedMovie
                    key={movie.imdbID}
                    movie={movie}
                    onDelete={onDeleteWatched}
                />
            ))}
        </ul>
    );
}





export default WatchedMovieList;