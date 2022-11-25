const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");
async function loadMovies(searchTerm) {
  // const url =` http://www.omdbapi.com/?i=tt3896198&apikey=89c5e3de`
  const url = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=89c5e3de`;
  const res = await fetch(`${url}`);
  const data = await res.json();
//   console.log('data', data);
  // console.log(data)
  if (data.Response === "True") {
    displayMovieList(data.Search);
  }
}
// loadMovies("lord of the rings")
function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  // console.log(searchTerm)
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  // console.log(movies)
  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    // console.log(movieListItem)
    movieListItem.dataset.id = movies[idx].imdbID;
    movieListItem.classList.add("search-list-item");
    if (movies[idx].Poster != "N/A") {
      moviePoster = movies[idx].Poster;
    } else {
      moviePoster =
        "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg";
    }
    movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
        <img src="${moviePoster}" alt="">
    </div>
    <div class="search-item-info">
        <h3>${movies[idx].Title}</h3>
        <p>${movies[idx].Year}</p>
    </div>`;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  // resultGrid.innerHTML=" ";
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      // console.log(movie.dataset.id)
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
      const result = await fetch(
        `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=89c5e3de`
      );
      const movieDtails = await result.json();
      console.log('movieDtails', movieDtails);
      // console.log(movieDtails)
      displayMovieDetails(movieDtails);
    });
  });
  // console.log(searchListMovies)
}

function displayMovieDetails(details) {
  // resultGrid.innerHTML=" ";
  resultGrid.innerHTML = `
<div class="movie-poster">
<img src="${
    details.Poster != "N?A"
      ? details.Poster
      : "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg"
  }" alt="movie poster">
</div>
<div class="movie-info">
<h3 class="movie-title">${details.Title}</h3>
<ul class="movie-misc-info">
    <li class="year">Year : ${details.Year}</li>
    <li class="rated"> Ratings : ${details.Rated}</li>
    <li class="released"> released: ${details.Released}</li>
</ul>
<p class="genre"> <b>Genre:</b> ${details.Genre}</p>
<p class="writer"><b>writer:</b> ${details.Writer}</p>
<p class="actors"><b>actors:</b> ${details.Actors}</p>
<p class="plot"><b>plot:</b>${details.Plot}</p>
<p class="language">${details.Language}</p>
<p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
</div>
`;
}

window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    searchList.classList.add("hide-search-list");
  }
});
