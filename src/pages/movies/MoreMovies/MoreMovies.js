export default function MoreMovies({ handleClickMore }) {
  return (
    <section className="more-movies">
      <div className="more-movies__container">
        <button className="more-movies__button" type="button" onClick={handleClickMore}>Еще</button>
      </div>
    </section>
  )
}
