import React from "react";
import logo from '../images/Vector.svg';
import { useLocation, Link } from "react-router-dom";

//добавим ссылки для авторизации и нет
function Header(props) {
  const location = useLocation();
  return (
    <header className="header page__header">
      <img src={logo} alt="mesto logo" className="logo" />
      {location.pathname === "/" && (
        <div className="header__block">
          <p className="header__email">{props.email}</p>
          <a className="header__link" onClick={props.onSignout}>
            Выйти
          </a>
        </div>
      )}
      {location.pathname === "/sign-up" && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {location.pathname === "/sign-in" && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
    </header>
  )
}

export default Header
//up
