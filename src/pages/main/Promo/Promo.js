export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__logo" />
        <div className="promo__info">
          <h1 className="promo__title">Учебный проект студента факультета Веб‑разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <nav className="promo__nav-tab">
            <ul className="promo__nav-tab-list">
              <li><a className="promo__button" href="#about-project">Узнать больше</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}
