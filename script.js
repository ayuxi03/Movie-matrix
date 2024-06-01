//APIKEY = 6d2457bf34d319edab10c57f345ff2e9
//API READ ACCESS TOKEN = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDI0NTdiZjM0ZDMxOWVkYWIxMGM1N2YzNDVmZjJlOSIsInN1YiI6IjY2NWEyYTYxODYwMzY5NWQxYjUwOWRmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VY18n8YJ6eoq3MQFRTL-wV4SHSIRPQYfj82hbIiDNiI

const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6d2457bf34d319edab10c57f345ff2e9&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=6d2457bf34d319edab10c57f345ff2e9&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);

async function returnMovies(url) {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data.results[16].original_title);
  console.log(data.results[16].overview);
  console.log(data.results[16].original_language);
  console.log(data.results[16].poster_path);
  moviesCard(data);
}

const moviesCard = (data) => {
  data.results.forEach(element => {
    const divCard = document.createElement('div');
    divCard.setAttribute('class','card');
    const divRow = document.createElement('div');
    divRow.setAttribute('class','row');
    const divCol = document.createElement('div');
    divCol.setAttribute('class','column');
    const poster = document.createElement('img');
    poster.setAttribute('class','thumbnail');
    poster.setAttribute('id','image');
    // const title = document.createElement('h3');
    // title.setAttribute('id','title');
    const center = document.createElement('div');

    // title.innerHTML = `${element.original_title}`;
    poster.src = IMG_PATH + element.poster_path;

    center.appendChild(poster);
    divCard.appendChild(center);
    // divCard.appendChild(title);
    divCol.appendChild(divCard);
    divRow.appendChild(divCol);

    main.appendChild(divRow);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = search.value;
  if (searchItem) {
    SEARCHLINK = SEARCHAPI + searchItem;
    console.log(SEARCHLINK);
    returnMovies(SEARCHLINK);
    search.value = "";
  }
});
