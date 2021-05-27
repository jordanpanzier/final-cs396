const baseURL = "https://letterboxd-jp.herokuapp.com";

function titleSort(x, y){
    if (x.title < y.title){
        return -1;
    }
    if (x.title > y.title){
        return 1;
    }
    return 0;
}

function ratingLHSort(x, y){
    if (x.rating < y.rating){
        return -1;
    }
    if (x.rating > y.rating){
        return 1;
    }
    return 0;
}

function ratingHLSort(x, y){
    if (x.rating > y.rating){
        return -1;
    }
    if (x.rating < y.rating){
        return 1;
    }
    return 0;

}

function dateWatchedELSort(x, y){
    if (x.dateWatched < y.dateWatched){
        return -1;
    }
    if (x.dateWatched > y.dateWatched){
        return 1;
    }
    return 0;
}

function dateWatchedLESort(x, y){
    if (x.dateWatched > y.dateWatched){
        return -1;
    }
    if (x.dateWatched < y.dateWatched){
        return 1;
    }
    return 0;
}

function dateReleasedELSort(x, y){
    if (x.dateReleased < y.dateReleased){
        return -1;
    }
    if (x.dateReleased > y.dateReleased){
        return 1;
    }
    return 0;
}

function dateReleasedLESort(x, y){
    if (x.dateReleased > y.dateReleased){
        return -1;
    }
    if (x.dateReleased < y.dateReleased){
        return 1;
    }
    return 0;
}

function sortMovies() {
    const selected = document.getElementById('menu').value;
    console.log(selected)
    initMovies(selected);
}

const initMovies = (type) => {
    fetch(`${baseURL}/movies/`)
    .then(response => response.json())
    .then(dataMovies => {
        document.getElementById('movies').innerHTML = ``
        if (type == 'title'){
            dataMovies.sort(titleSort);
        }
        else if (type == 'ratingLH'){
            dataMovies.sort(ratingLHSort)
        }
        else if (type == 'ratingHL'){
            dataMovies.sort(ratingHLSort);
        }
        else if (type == 'dateWatchedEL'){
            dataMovies.sort(dateWatchedELSort);
        }
        else if (type == 'dateWatchedLE'){
            dataMovies.sort(dateWatchedLESort);
        }
        else if (type == 'dateReleasedEL'){
            dataMovies.sort(dateReleasedELSort);
        }
        else if (type == 'dateReleasedLE'){
            dataMovies.sort(dateReleasedLESort);
        }
        else {
            dataMovies.sort(titleSort);
        }
        dataMovies.forEach((dataMovie) => {
            const date = new Date(dataMovie.dateWatched)
            date.setDate(date.getDate() + 1)
            document.getElementById('movies').innerHTML += `
            <div class="movie"> 
                <p>${date.toString().slice(0,15)}</p>
                <img src=${dataMovie.imageUrl} alt=${dataMovie.title}>
                <h3>${dataMovie.title}</h3>
                <h4>${dataMovie.ratingText}</p>
            </div>
            `
        })
    })
    .catch(err => {
        console.error(err);
    })
}

initMovies('title');

