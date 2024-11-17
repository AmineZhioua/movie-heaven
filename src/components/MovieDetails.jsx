import React, { useEffect, useState } from 'react';
import StarRating from './StarRating';



const apiKey = "8ba7e4f";

function MovieDetails({ selectedId, onCloseMovie, onSetWatched, watched }) {
    // Loading State
    const [isLoading, setIsLoading] = useState(false);
    // The Selected Movie Details Data Will Be Stored Here
    const [movieDetail, setMovieDetail] = useState({});
    // Error Handling
    const [error, setError] = useState(null);
    // Rating State
    const [userRating, setUserRating] = useState(0);


    // A Side Effect For Fetching the selected movie data and displaying it
    useEffect(function() {
        setIsLoading(true);
        async function fetchOneMovie() {
            try {
                setIsLoading(true);
                setError(null);
                const result = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`);
                const movieData = await result.json();

                if (movieData.Response === "False") {
                    throw new Error("Movie not found");
                }

                setMovieDetail(movieData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        // If there is no ID then fetchOneMovie won't work
        if (selectedId) {
            fetchOneMovie();
        }
    }, [selectedId]);

    /* eslint-disable */
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movieDetail;

    function handleAdd() {
        const watchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ')[0]),
            userRating,
        }
        onSetWatched(watchedMovie);
    }

    const isWatched = watched?.map((movie) => movie.imdbID).includes(selectedId);


    // A Side Effect To Update The Document Title Each Time The Movie Component Mounts
    useEffect(function() {
        if(!title) return;
        document.title = `Movie | ${title}`;

        // Cleanup Function
        return function() {
            document.title = 'Movie Heaven';
        }
    }, [title]);



    // A Side Effect To Close The Movie Details When Hitting 'Esc' Button
    useEffect(() => {
        function callbackKeypress(key) {
            if(key.code === 'Escape') {
                onCloseMovie();
            }
        }

        document.addEventListener('keydown', callbackKeypress);

        // Clean Up Function
        return function() {
            document.removeEventListener('keydown', callbackKeypress);
        }
    }, [onCloseMovie]);




    return (
        <div className='details'>
            {isLoading ? ( <p className='loader'>Loading...</p> ) :
            error ? ( <p className="error">{error}</p> ) :
            (
                <>
                    <header>
                        <button className="btn-back" onClick={ onCloseMovie }>&larr;</button>
                        <img src={movieDetail.Poster} alt={`Poster of ${movieDetail.Title} movie`} />
                        <div className="details-overview">
                            <h2>{movieDetail.Title}</h2>
                            <p>
                                {movieDetail.Year} &bull; {movieDetail.Runtime}
                            </p>
                            <p>{movieDetail.Genre}</p>
                            <p>
                                <span>⭐️</span>
                                {movieDetail.imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className='rating'>
                            {isWatched ? <p>You already added this movie!</p> : 
                            <>
                                <StarRating
                                size={15}
                                maxRating={10}
                                onSetRating={setUserRating}
                                />
                                {userRating > 0 && (<button className='btn-add' onClick={handleAdd}>+ Add to list</button>)}
                            </>}
                        </div>
                        <p>{movieDetail.Plot}</p>
                        <p><strong>Starring:</strong> {movieDetail.Actors}</p>
                        <p><strong>Directed by:</strong> {movieDetail.Director}</p>
                    </section>
                </>
            )}
        </div>
    );
}





export default MovieDetails;