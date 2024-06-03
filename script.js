//APIKEY = 6d2457bf34d319edab10c57f345ff2e9
//API READ ACCESS TOKEN = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDI0NTdiZjM0ZDMxOWVkYWIxMGM1N2YzNDVmZjJlOSIsInN1YiI6IjY2NWEyYTYxODYwMzY5NWQxYjUwOWRmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VY18n8YJ6eoq3MQFRTL-wV4SHSIRPQYfj82hbIiDNiI

const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6d2457bf34d319edab10c57f345ff2e9&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=6d2457bf34d319edab10c57f345ff2e9&query=";

// Initializing global variables
const main = document.getElementById("section");
main.setAttribute('class','main');
const form = document.getElementById("form");
const search = document.getElementById("query");
const queryMsg = document.createElement('h3');
queryMsg.setAttribute('id','query');

// Calling function to get movies data and create movie cards
returnMovies(APILINK);

// Defining function to fetch movie data from API 
async function returnMovies(url) {
  let response = await fetch(url);
  let data = await response.json();
  moviesCard(data);
}

// Defining function to create movie cards using data fetched from API
const moviesCard = (data) => {
  data.results.forEach(element => {

    // Creating poster element and assigning class 
    const poster = document.createElement('img');
    poster.setAttribute('class','thumbnail');
    poster.src = IMG_PATH + element.poster_path;
    
    // Creating movie card as container for movie elements
    const divCard = document.createElement('div');
    divCard.setAttribute('class','card');

    // Appending poster as a child element of movie card
    divCard.appendChild(poster);

    // Calling function to dynamically add movie info inside movie card on hovering
    addMovieDetails(divCard, element);
    
    // Finally adding movie card inside main section
    main.appendChild(divCard);
    
  });
}

// Creating search function to return movies queried with movie name
form.addEventListener("submit", (e) => {

  // Disabling default reload on form submission & clearing main section for new results
  e.preventDefault();
  main.innerHTML = '';
  
  // Creating search link with queried value and fetching results
  const searchItem = search.value;

  // Generating a msg before showing query results
  queryMsg.innerHTML = '';
  main.before(queryMsg);
  queryMsg.innerHTML = `Showing results for "${searchItem}"`;

  // Fetching results using search functionality of api link
  if (searchItem) {
    SEARCHLINK = SEARCHAPI + searchItem;
    console.log(SEARCHLINK);
    returnMovies(SEARCHLINK);
    search.value = "";
  }
});


// Creating function to dynamically add movie details inside movie card on hovering on the card
const addMovieDetails = (divCard, element) => {

  // Adding elements when mouse enters the movie card
  divCard.addEventListener("mouseenter", () => {

  // Creating movie info grid to contain movie details
  const movieInfo = document.createElement('div');
  movieInfo.setAttribute('class','movie-info-grid');

  // Creating other detail elements 
  const rating = document.createElement('p');
  rating.setAttribute('id', 'rating');
  rating.innerText = `Rating: ${Math.round((element.vote_average * 10)) / 10}`

  const movieTitle = document.createElement('p');
  movieTitle.setAttribute('id','movie-title');
  movieTitle.innerText = `${element.title}`;
  
  const genreRow = document.createElement('p');
  genreRow.setAttribute('id','genre-row');

  // Fetching genre from API. It returns an array of genre-ids
  const genreArr = element.genre_ids;
  
  // Creating an array to contain genre names from ids
  let movieGenreList = [];

  // Looping in genre id array and storing respective genre names inside movieGenreList array
  for (let genreId of genreArr) {

    // genreList has been created in a separate genre.js file. It is an object with genre ids as keys and genre names as values. This info has been aquired from TMDb site

    movieGenreList.push(genreList[genreId]);
    genreRow.innerText += `${genreList[genreId]}`;
    if (genreId !== genreArr[genreArr.length - 1]) {
      genreRow.innerText += ` | `;
    }
  }
  
  // Adding movie detail elements inside the movieInfo grid
  movieInfo.append(rating);
  movieInfo.append(movieTitle);
  movieInfo.append(genreRow);

  // Finally adding movie info grid inside movie card
  divCard.append(movieInfo);
  });

  // Creating an event for when the mouse leaves the movie card -> movieInfo grid is removed from the movie card
  divCard.addEventListener("mouseleave", () => {
    while (divCard.children.length > 1) {
      divCard.removeChild(divCard.lastChild);
    }
  });
}

