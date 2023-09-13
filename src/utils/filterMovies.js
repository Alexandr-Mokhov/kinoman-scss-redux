import { SHORT_FILMS_DURATION } from '../constans';

export default function filterMovies(moviesList, value, short) {
  return moviesList.filter(movie => movie.nameRU.toLowerCase().includes(value.toLowerCase()) &&
    (short ? movie.duration < SHORT_FILMS_DURATION : true));
}
