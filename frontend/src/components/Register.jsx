
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ email, password })
  }
  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login__form">
        <h2 className="login__title">Регистрация</h2>
        <input
          value={email}
          onChange={({ target:{value} }) => setEmail(value)}
          className="login__input"
          placeholder="E-mail"
        />
        <input
        onChange={({target: {value}}) => setPassword(value)}
          value={password}
          type="password"
          className="login__input"
          placeholder="Пароль"
        />
        <button type="submit" className="login__button">
          Зарегистрироваться
        </button>
        <p className="login__caption">
          Уже зарегистрированы?{" "}
          <Link className="login__link" to="../sign-in">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}
