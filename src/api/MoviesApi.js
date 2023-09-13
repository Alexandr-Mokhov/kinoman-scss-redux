import checkResponse from './checkResponse';

function request(option) {
  return fetch(`https://api.nomoreparties.co/beatfilm-movies`, option).then(checkResponse);
}

export const getAllMovies = () => {
  return request({
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(),
  })
}
