const watchlistContainer = document.getElementById('watchlist-container')
import { savedMoviesHtml } from 'index'


function getMoviesFromLocalStorage() {

    if (localStorage.getItem('data') !== null) {
        watchlistContainer.innerHTML = (localStorage.getItem('data'))
    }
}

document.addEventListener('click', (event) => {

        console.log(event.target.tagName)
        if(event.target.tagName === 'BUTTON') {
            event.target.parentElement.parentElement.parentElement.parentElement.remove();
            // saveData()
        }

})

getMoviesFromLocalStorage()

