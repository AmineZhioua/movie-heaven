import React from 'react'


function NavSearch({ query, setQuery }) {

    return (
        <div style={{
            position: "relative", 
            display: "flex", 
            alignItems: "center" 
            }} >
            <input 
                className="search"
                type='text'
                placeholder='Search a movie...'
                value={ query }
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
            />
        </div>
    );
}




export default NavSearch;