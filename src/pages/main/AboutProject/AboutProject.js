export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__info">
          <div className="about-project__info-stages">
            <p className="about-project__info-title">
              Дипломный проект включал 5 этапов
            </p>
            <p className="about-project__info-subtitle">
              Составление плана, работу над бэкендом, вёрстку,
              добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__info-weeks">
            <p className="about-project__info-title">
              На выполнение диплома ушло 5 недель
            </p>
            <p className="about-project__info-subtitle">
              У каждого этапа был мягкий и жёсткий дедлайн, 
              которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__time-line">
          <p className="about-project__time-line-text">1 неделя</p>
          <p className="about-project__time-line-text">4 недели</p>
        </div>
        <div className="about-project__time-name">
          <p className="about-project__time-name-text">Back-end</p>
          <p className="about-project__time-name-text">Front-end</p>
        </div>
      </div>
    </section>
  )
}
