import { useLocation } from 'react-router-dom';

export default function SearchForm({
  value,
  handleSubmit,
  handleChange,
  isValid,
  buttonDisabled,
  checkedShort,
  handleChecked,
  checkedShortSaved,
}) {
  const { pathname } = useLocation();

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form onSubmit={handleSubmit} noValidate>
          <div className="search-form__input-container">
            <input
              id="input-search"
              className="search-form__input"
              name="search"
              type="text"
              placeholder="Фильм"
              value={value || ''}
              onChange={handleChange}
              autoComplete="off"
            />
            <button className="search-form__button" type="submit" disabled={buttonDisabled}>Поиск</button>
          </div>
          <span className={`search-form__input-error ${!isValid && 'search-form__input-error_active'}`}>
            Нужно ввести ключевое слово!
          </span>
          <div className="search-form__checkbox-container">
            <label className="search-form__checkbox-label" htmlFor="checkbox">
              <input className="search-form__checkbox-input"
                id="checkbox"
                type="checkbox"
                onChange={handleChecked}
                checked={pathname === '/movies' ? checkedShort : checkedShortSaved}
              />
              <span className="search-form__new-checkbox">Короткометражки</span>
            </label>
          </div>
        </form>
      </div>
    </section>
  )
}
