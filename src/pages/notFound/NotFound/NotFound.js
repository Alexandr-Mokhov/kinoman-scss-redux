import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="not-found">
      <section className="not-found__container">
        <div className="not-found__container-text">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__subtitle">Страница не найдена</p>
        </div>
        <Link className="not-found__back" to="/">Назад</Link>
      </section>
    </main>
  )
}
