const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const searchListContainer = document.getElementById('searchlist-container')
const watchlistContainer = document.getElementById('watchlist-container')

searchBtn.addEventListener('click', () => {
    // THIS FETCH REQUEST GETS AN ARRAY OF THE MOVIES THAT MATCH THE SEARCH INPUT
    fetch(`http://www.omdbapi.com/?apikey=72fd1c8d&s=${searchInput.value}&type=movie&page=1&plot=full`)
        .then(res => res.json())
        .then(data => {

        let searchResultsHtml = ''
        let savedMoviesHtml = ''

        // THIS FOR LOOP GETS THE DETAILS OF EACH MOVIE AND RENDERS EACH ONE
        for (let item of data.Search) {
            fetch(`http://www.omdbapi.com/?apikey=72fd1c8d&t=${item.Title}&type=movie&page=1&plot=short`)
                .then(res => res.json())
                .then(individualMovie => {

                // loops through render function and adds each movie result to searchResultsHtml
                searchResultsHtml += movieHtml(individualMovie)
                
                // renders searchResultsHtml to the searchListContainer on the main index.html
                searchListContainer.innerHTML = searchResultsHtml

                // listens for watchlist btn being clicked
                document.addEventListener('click', (event) => {
                
                    if (event.target.dataset.id === individualMovie.imdbID) {
                        // console.log(event.target.data)
                        addMovieToLocalStorage(individualMovie.Title, movieHtml(individualMovie))
                        
                    }
                })

                getMoviesFromLocalStorage(individualMovie.Title)
            })
            
        }
        
        })    
})

function getMoviesFromLocalStorage(thisMovieName) {
    watchlistContainer.innerHTML = localStorage.getItem(thisMovieName)
}


// saves a movie item to localstorage
function addMovieToLocalStorage(thisMovieName, thisMovie) {
    localStorage.setItem(thisMovieName, thisMovie)
}

// returns the html for a single movie result
function movieHtml(item) {
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