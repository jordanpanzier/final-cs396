const baseURL = "https://letterboxd-jp.herokuapp.com";

const initMovies = () => {
    fetch(`${baseURL}/movies/`)
    .then(response => response.json())
    .then(dataMovies => {
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

initMovies();