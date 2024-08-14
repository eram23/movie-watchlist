const watchlistContainer = document.getElementById('watchlist-container')


function getMoviesFromLocalStorage() {

    if (localStorage.getItem('data') !== null) {
        watchlistContainer.innerHTML = (localStorage.getItem('data'))
    }
}

document.addEventListener('click', (event) => {

        // console.log(savedMoviesHtml)
        if(event.target.tagName === 'BUTTON') {
            event.target.parentElement.parentElement.parentElement.parentElement.remove();
            localStorage.setItem('data', watchlistContainer.innerHTML)
        }

})

getMoviesFromLocalStorage()

