import React from "react";

// логин - собрать все из форм, сохранить.
function Login(props) {
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
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password);
  }

  return (
    <section className="form">
      <div className="form__content">
        <h2 className="form__title">Вход</h2>
        <form className="form__input" name="form__input" onSubmit={handleSubmit}>
        <input className="form__email" id="email" type="email" placeholder="Email" value={email} onChange={handleChange} name="email" required />
          <span className="form__email-error" id="email-error"></span>
          <input className="form__password" id="password" type="password" placeholder="Пароль" value={password} onChange={handleChange} name="password" required />
          <span className="form__password-error" id="password-error"></span>
          <button className="form__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}


export default Login;
