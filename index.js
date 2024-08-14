const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const searchListContainer = document.getElementById('searchlist-container')
let savedMoviesArr = []
let savedMoviesHtml = []

searchBtn.addEventListener('click', () => {
    // THIS FETCH REQUEST GETS AN ARRAY OF THE MOVIES THAT MATCH THE SEARCH INPUT
    fetch(`https://www.omdbapi.com/?apikey=72fd1c8d&s=${searchInput.value}&type=movie&page=1&plot=full`)
        .then(res => res.json())
        .then(data => {

        let searchResultsHtml = '' 

        // THIS FOR LOOP GETS THE DETAILS OF EACH MOVIE AND RENDERS EACH ONE
        for (let item of data.Search) {
            fetch(`https://www.omdbapi.com/?apikey=72fd1c8d&t=${item.Title}&type=movie&page=1&plot=short`)
                .then(res => res.json())
                .then(individualMovie => {

                // loops through render function and adds each movie result to searchResultsHtml
                searchResultsHtml += searchMovieHtml(individualMovie)
                
                // renders searchResultsHtml to the searchListContainer on the main index.html
                searchListContainer.innerHTML = searchResultsHtml

                // listens for watchlist btn being clicked
                document.addEventListener('click', (event) => {
                
                    if (event.target.dataset.id === individualMovie.imdbID) {
                        if( !savedMoviesHtml.includes(individualMovie.imdbID) ) { //only adds movie if it has not been added yet (checkds imdb id)
                            if(!savedMoviesHtml === null) {
                                savedMoviesHtml = localStorage.getItem('data') //gets previously added movies only if there is not a null value
                            }
                            savedMoviesHtml += watchListMovieHtml(individualMovie)
                            localStorage.setItem('data', savedMoviesHtml)
                        }
                        
                    }
                })


            })
            
        }
        })
})

// returns a single html for search result
function searchMovieHtml(item) {
    return `
    <div class="movie-container">
        <div class="movie-poster-container">
            <img src="${item.Poster}" class="movie-poster">
        </div>
        <div class="movie-details-container">
            <h2>${item.Title} <span class="rating"><i class="fa-solid fa-star" style="color: #74C0FC;"></i>${item.imdbRating}/10</span></h2>
            <ul>
                <li>${item.Runtime}</li>
                <li>${item.Genre}</li>
                <li><button class="watchlist-btn" data-id="${item.imdbID}"><i class="fa-solid fa-circle-plus"></i>watchlist</button></li>
            </ul>
            <p>${item.Plot}</p>
        </div>
    </div>
    `
}

// returns a single html for watchlist
function watchListMovieHtml(item) {
    return `
    <div class="movie-container">
        <div class="movie-poster-container">
            <img src="${item.Poster}" class="movie-poster">
        </div>
        <div class="movie-details-container">
            <h2>${item.Title} <span class="rating"><i class="fa-solid fa-star" style="color: #74C0FC;"></i>${item.imdbRating}/10</span></h2>
            <ul>
                <li>${item.Runtime}</li>
                <li>${item.Genre}</li>
                <li><button class="watchlist-btn" data-id="${item.imdbID}"><i class="fa-solid fa-circle-minus"></i>watchlist</button></li>
            </ul>
            <p>${item.Plot}</p>
        </div>
    </div>
    `
}
