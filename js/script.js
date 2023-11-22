const global = {
  currentPath: window.location.pathname,
  search: {
    type: '',
    term: '',
    page: '1',
    totalPages: '',
    totalResults: '',
  },
};

// Display 20 most popular movies
async function displayPopularMovies() {
  const data = await fetchAPIData('movie/popular');
  const movies = data.results;

  movies.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('data-id', movie.id);

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
            }
          </a>
          
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
            <small class="text.muted">Air Date: ${movie.release_date}</small>
            </p>
          </div>
          `;

    document.getElementById('popular-movies').appendChild(div);
  });
}

// Display Movies details
async function displayMovieDetails() {
  const id = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${id}`);

  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = ` <div class="details-top">
  <div>
  ${
    movie.poster_path
      ? `<img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />`
      : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${movie.title}"
/>`
  }
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
      ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${
      movie.homepage
    }" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
      movie.budget
    )}</li>
    <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
      movie.revenue
    )}</li>
    <li><span class="text-secondary">Runtime:</span> ${
      movie.runtime
    } minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
    ${movie.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(', ')}
  </div>
</div>`;

  document.getElementById('movie-details').appendChild(div);
}

// Display 20 most popular shows
async function displayPopularShows() {
  const data = await fetchAPIData('tv/popular');
  const shows = data.results;

  shows.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('data-id', show.id);

    div.innerHTML = `<a href="tv-details.html?=${show.id}">
    ${
      show.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
        : `<img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${show.name}"
      />`
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${show.name}</h5>
    <p class="card-text">
    <small class="text-muted">Air Date: ${show.first_air_date}</small>
    </p>
  </div>`;

    document.getElementById('popular-shows').appendChild(div);
  });
}

// Display show details
async function displayShowDetails() {
  const id = window.location.search.split('=')[1];
  const show = await fetchAPIData(`tv/${id}`);

  displayBackgroundImage('show', show.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    show.poster_path
      ? `<img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    class="card-img-top"
    alt="${show.name}"
  />`
      : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${show.name}"
/>`
  }
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
    <p>
      ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${
      show.homepage
    }" target="_blank" class="btn">Visit show Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number of Episodes:</span> ${
      show.number_of_episodes
    }</li>
    <li><span class="text-secondary">Last Episode To Air:</span> ${
      show.last_episode_to_air.name
    }</li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
    ${show.production_companies
      .map((company) => `<span>${company.name}</span>`)
      .join(', ')}
  </div>
</div>
  `;

  document.getElementById('show-details').appendChild(div);
}

// Display Search Results()
function displaySearchResults(results) {
  document.getElementById('search-results-heading').innerHTML = '';
  document.getElementById('search-results').innerHTML = '';
  document.getElementById('pagination').innerHTML = '';

  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <a href="${global.search.type}-details.html?id=${result.id}">
      ${
        result.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500${result.poster_path}"
        class="card-img-top"
        alt="${global.search.type === 'movie' ? result.title : result.name}"
      />`
          : `<img
      src="../images/no-image.jpg"
      class="card-img-top"
       alt="${global.search.type === 'movie' ? result.title : result.name}"
    />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${
        global.search.type === 'movie' ? result.title : result.name
      }</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${
          global.search.type === 'movie'
            ? result.release_date
            : result.first_air_date
        }</small>
      </p>
    </div>
    `;

    document.getElementById('search-results').appendChild(div);
  });

  document.getElementById('search-results-heading').innerHTML = `
    <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
  `;

  displayPagination();
}

// Display Pagination
function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">${global.search.page} of ${global.search.totalPages}</div>
  `;

  document.getElementById('pagination').appendChild(div);

  document.getElementById('next').addEventListener('click', async (e) => {
    global.search.page++;

    const { results } = await searchAPIData();
    displaySearchResults(results);
    window.scrollTo(0, 0);
  });

  document.getElementById('prev').addEventListener('click', async (e) => {
    global.search.page--;

    const { results } = await searchAPIData();
    displaySearchResults(results);
    window.scrollTo(0, 0);
  });

  if (global.search.page <= 1) {
    document.getElementById('prev').disabled = true;
  }
  if (global.search.page === global.search.totalPages) {
    document.getElementById('next').disabled = true;
  }
}

// Search functionality
async function search() {
  const params = new URLSearchParams(window.location.search);

  const type = params.get('type');
  const term = params.get('search-term');

  global.search.term = term;
  global.search.type = type;

  if (global.search.term === '' || global.search.term === null) {
    showAlert('Please enter a search term');
  }

  const { results, page, total_pages, total_results } = await searchAPIData();

  global.search.page = page;
  global.search.totalPages = total_pages;
  global.search.totalResults = total_results;

  console.log(global.search.totalPages);

  displaySearchResults(results);
}

// Show alert
function showAlert(message, className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.getElementById('alert').appendChild(alertEl);

  setTimeout(() => {
    alertEl.remove();
  }, 3000);
}

// Fetch data from api
async function fetchAPIData(endpoint) {
  const API_KEY = '05e1c39526cfcad16d30aae45602a17f';
  const API_URL = 'https://api.themoviedb.org/3/';

  displaySpinner();

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`);
  const data = response.json();

  removeSpinner();

  return data;
}

// Search api data
async function searchAPIData() {
  const API_KEY = '05e1c39526cfcad16d30aae45602a17f';
  const API_URL = 'https://api.themoviedb.org/3/';

  displaySpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&query=${global.search.term}&page=${global.search.page}`
  );

  const data = response.json();

  removeSpinner();

  return data;
}

// Display background image
function displayBackgroundImage(type, path) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${path})`;
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.width = '100%';
  overlayDiv.style.height = '100%';
  overlayDiv.style.opacity = '0.2';
  overlayDiv.style.zIndex = '-1';

  if (type === 'movie') {
    document.getElementById('movie-details').appendChild(overlayDiv);
  } else {
    document.getElementById('show-details').appendChild(overlayDiv);
  }
}

// Add commas to number
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPath) {
      link.classList.add('active');
    }
  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    freemode: false,
    loop: true,
    autoplay: {
      delay: 4000,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
        slidesPerGroup: 1,
      },
      700: {
        slidesPerView: 3,
        slidesPerGroup: 1,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 1,
      },
    },
  });
}

// Display Swiper
async function displaySwiper() {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
    </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);
    initSwiper();
  });
}

// Display Spinner
function displaySpinner() {
  document.querySelector('.spinner').classList.add('show');
}

// Remove Spinner
function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Router
function init() {
  switch (global.currentPath) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      displaySwiper();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
  }

  highlightActiveLink();
}

window.addEventListener('DOMContentLoaded', init);
