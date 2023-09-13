export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a className="portfolio__link"
              href="https://alexandr-mokhov.github.io/how-to-learn/"
              target="_blank"
              rel="noreferrer"
            >
              Статичный сайт
              <div className="portfolio__link-arrow" />
            </a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link"
              href="https://alexandr-mokhov.github.io/russian-travel/"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт
              <div className="portfolio__link-arrow" />
            </a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link"
              href="https://alexandr-mokhov.github.io/react-mesto-auth/#/"
              target="_blank"
              rel="noreferrer"
            >
              Одностраничное приложение
              <div className="portfolio__link-arrow" />
            </a>
          </li>
        </ul>
      </div>
    </section >
  )
}
