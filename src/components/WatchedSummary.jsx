import React from 'react'


const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


function WatchedSummary({ watchedArray }) {

    const avgImdbRating = average(watchedArray?.map((movie) => movie.imdbRating || 0));
    const avgUserRating = average(watchedArray?.map((movie) => movie.userRating || 0));
    const avgRuntime = average(watchedArray?.map((movie) => movie.runtime || 0));

    return (
        <div className='summary'>
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{ watchedArray.length } Movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{ avgImdbRating.toFixed(2) }</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{ avgUserRating.toFixed(2) }</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{ avgRuntime.toFixed(1) } min</span>
                </p>
            </div>
        </div>
    );
}





export default WatchedSummary;