import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChange(evt) {
    evt.preventDefault();
    if (evt.target.name === "email") {
      setEmail(evt.target.value);
    } else if (evt.target.name === "password") {
      setPassword(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <main className="content">
      <section className="form">
        <div className="form__content">
          <h2 className="form__title">Регистрация</h2>
          <form className="form__form" name="form__form" onSubmit={handleSubmit}>
          <input className="form__email" id="email" type="email" placeholder="Email" value={email} onChange={handleChange} name="email" required minLength="2" maxLength="40"/>
            <span className="form__email-error" id="email-error"></span>
            <input className="form__password" id="password" type="password" placeholder="Пароль" value={password} onChange={handleChange} name="password" required minLength="2" maxLength="40"/>
            <span className="form__password-error" id="password-error"></span>
            <button className="form__button" type="submit">
              Зарегистрироваться
            </button>
          </form>
          <div className="form__signup">
            <p>Уже зарегистрированы? Войти</p>
            <Link to="/sign-in" className="form__link">
              Войти
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
