import { useState } from "react";


export default function Login({onLogin}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({email, password})

  }
  return (
    <div className="login login_type_login">
      <form onSubmit={handleSubmit} className="login__form">
        <h2 className="login__title">Вход</h2>
        <input
          value={email}
          onChange={({target: {value}}) => setEmail(value)}
          className="login__input"
          placeholder="E-mail"
        />
        <input
          value={password}
          onChange={({target:{value}}) => setPassword(value)}
          type="password"
          className="login__input"
          placeholder='Пароль'
        />
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
}
