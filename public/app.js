const baseURL = "https://letterboxd-jp.herokuapp.com";

const initMovies = () => {
    fetch(`${baseURL}/movies/`)
    .then(response => response.json())
    .then(dataMovies => {
        dataMovies.forEach((dataMovie) => {
            document.getElementById('movies').innerHTML += `
            <div class="movie"> 
                <img src=${dataMovie.imageUrl} alt=${dataMovie.title}>
                    <h3>${dataMovie.title}</h3>
            </div>
            `
        })
    })
    .catch(err => {
        console.error(err);
    })
}

initMovies();