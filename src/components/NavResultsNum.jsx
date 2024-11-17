import React from 'react'


function NavResultsNum({ resultLength }) {
    return (
        <div className="num-results">
            Found <strong>{ resultLength }</strong> results
        </div>
    );
}




export default NavResultsNum;