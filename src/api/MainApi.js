import checkResponse from './checkResponse';

function setHeaders() {
  const token = localStorage.getItem('token');
  return { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json' 
  };
}

function request(url, option) {
  return fetch(`https://api.diploma.mokhov.nomoredomains.rocks${url}`, option).then(checkResponse);
}

export const registerUser = ({ name, email, password }) => {
  return request('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
}

export const authorizeUser = ({ email, password }) => {
  return request('/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

export const updateUserInfo = ({ name, email }) => {
  return request('/users/me', {
    method: 'PATCH',
    headers: setHeaders(),
    body: JSON.stringify({ name, email }),
  })
}

export const checkToken = () => {
  return request('/users/me', {
    method: 'GET',
    headers: setHeaders(),
  });
}

export function addStatusFavorite(movie) {
  return request(`/movies`, {
    method: 'POST',
    headers: setHeaders(),
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }),
  });
}

export function deleteStatusFavorite(movie) {
  return request(`/movies/${movie._id}`, {
    method: 'DELETE',
    headers: setHeaders(),
  });
}

export function getSavedMovies() {
  return request(`/movies/`, {
    method: 'GET',
    headers: setHeaders(),
  });
}
