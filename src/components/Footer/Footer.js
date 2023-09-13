import { useLocation } from 'react-router-dom';

export default function Footer() {
  const { pathname } = useLocation();
  const isMain = pathname === '/';
  const isMovies = pathname === '/movies';
  const isSavedMovies = pathname === '/saved-movies';

  return (
    <>
      {isMain || isMovies || isSavedMovies ?
        <footer className="footer">
          <div className="footer__container">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__info">
              <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
              <ul className="footer__links">
                <li className="footer__list">
                  <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">
                    Яндекс.Практикум
                  </a>
                </li>
                <li className="footer__list">
                  <a className="footer__link" href="https://github.com/" target="_blank" rel="noreferrer">
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
        : ''}
    </>
  )
}
