import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [navMenu, setNavMenu] = useState(false);
  const { pathname } = useLocation();
  const isMain = pathname === '/';

  useEffect(() => {
    if (!navMenu) return;
    function handleClickOverlay(evt) {
      if (evt.target.className.indexOf('navigation__overlay') === 0) {
        setNavMenu(!navMenu);
      }
    }
    document.addEventListener('mousedown', handleClickOverlay);
    return () => {
      document.removeEventListener('mousedown', handleClickOverlay);
    }
  }, [navMenu])

  useEffect(() => {
    setNavMenu(false);
  }, [pathname]);

  return (
    <div className="navigation">
      <button className={
        `navigation__button-menu 
          ${navMenu ? "navigation__button-menu_type_close" : "navigation__button-menu_type_open"}
          ${isMain && "navigation__button-menu_type_light"}`
      }
        onClick={() => setNavMenu(!navMenu)}
      />
      <nav className={`navigation__container ${!navMenu && "navigation__container_type_hide"}`}>
        <ul className="navigation__links">
          <li>
            <NavLink to="/" className={
              ({ isActive }) => `navigation__link navigation__link_type_main ${isActive && "navigation__link_type_active"}`
            }>
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={
              ({ isActive }) => `navigation__link ${isActive && "navigation__link_type_active"}
              ${isMain && "navigation__link_type_light"}`
            }>
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink to="/saved-movies" className={
              ({ isActive }) => `navigation__link ${isActive && "navigation__link_type_active"}
              ${isMain && "navigation__link_type_light"}`
            }>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link to="/profile" className={`navigation__account ${isMain && (!navMenu && "navigation__account__light")}`}>
          Аккаунт
          <div className="navigation__icon-account" />
        </Link>
      </nav>
      <div className={`${navMenu && "navigation__overlay"}`} />
    </div>
  )
}
