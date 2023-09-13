import photo from '../../../images/me-photo.jpg';

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__info">
          <div>
            <h3 className="about-me__name">Александр Мохов</h3>
            <p className="about-me__profession">Фронтенд-разработчик, 37 лет</p>
            <p className="about-me__biography">
              Я родился в Курганской области, сейчас живу в Челябинске.
              Закончил Московский Автомобильно-Дорожный Институт.
              У меня жена и двое детей.
              Я люблю туризм, тем более что у нас на Урале множество живописных мест.
              Также увлекаюсь мотоциклами, финансами, проектированием и конструированием,
              а с лета 2022 года увлекся и веб-разработкой.
            </p>
            <a
              className="about-me__link"
              href="https://github.com/Alexandr-Mokhov"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
          <img className="about-me__photo" src={photo} alt="Фото студента" />
        </div>
      </div>
    </section>
  )
}
