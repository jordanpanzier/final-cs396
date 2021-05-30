"use strict";
const baseURL = "https://letterboxd-jp.herokuapp.com";
const genres = [{'id':28, "name": "Action"}, 
{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},
{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},
{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},
{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},
{"id":36,"name":"History"},{"id":27,"name":"Horror"},
{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},
{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},
{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},
{"id":10752,"name":"War"},{"id":37,"name":"Western"}]

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
    initMovies(selected);
}

function openMovieDetail(movie, date){

    const tmdbBaseURL = "https://api.themoviedb.org/3/";
    const key = "f9fedf69581febb3811fb7cde7b4b4e8";

    const movieURL = "".concat(tmdbBaseURL, "search/movie?api_key=", key, "&query=", movie, "&page=1&include_adult=false&year=", date);
    fetch(movieURL)
    .then(response => response.json())
    .then((movieData) => {

        console.log(movieData.results[0].id)

        const castURL =  "".concat(tmdbBaseURL, "movie/", movieData.results[0].id, "/credits?api_key=", key, "&language=en-US")
        fetch(castURL)
        .then(response => response.json())
        .then((castData) => {
            
            let theGenres = [];
            genres.forEach(genre => {
                if (movieData.results[0].genre_ids.includes(genre.id)){
                    theGenres.push(" ".concat(genre.name));
                }
            })

            let theDirectors = [];
            const directorList = castData.crew.filter(member => member.job == "Director")
            directorList.forEach(director => {
                theDirectors.push(" ".concat(director.name));
            })

            let theWriters = [];
            const writerList = castData.crew.filter(member => member.job == "Book" || member.job == "Screenplay" || member.job == "Writer")
            writerList.forEach(writer => {
                theWriters.push(" ".concat(writer.name));
            })

            let theCast = [];
            castData.cast.splice(0,5).forEach(actor => theCast.push(" ".concat(actor.name)));
        
            document.getElementById('movieDetails').innerHTML = `
                <p style="font-style:italic; font-size:15px;">Information from The Movie Database.</p>
                <h2>${movie}</h2>
                <h3>${date}</h3>
                <p>${movieData.results[0].overview}</p>
                <h4>Average Rating: ${movieData.results[0].vote_average}</h4>
                <h4>Genres: ${theGenres}</h4>
                <h4>Director(s): ${theDirectors}</h4>
                <h4>Writers(s): ${theWriters}</h4>
                <h4>Cast: ${theCast}</h4>
            `
            document.getElementById('movieDetail').style.visibility = "visible";
        })
        .catch(err => {
            console.error(err);
        })
    })
    .catch(err => {
        console.error(err);
    })
}

function closeMovieDetail(){
    document.getElementById('movieDetail').style.visibility = "hidden";
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

           
            const theTitle = dataMovie.title.replace("\'", "\\'");
           

            document.getElementById('movies').innerHTML += `
            <div class="movie"> 
                <p>${date.toString().slice(0,15)}</p>
                <a href="#0"> 
                <img onclick="openMovieDetail('${theTitle}', ${dataMovie.dateReleased})" src=${dataMovie.imageUrl} alt=${dataMovie.title}>
                </a>
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

initMovies('dateWatchedLE');


