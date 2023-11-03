
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import React from "react";

export default function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          onClick={onEditAvatar}
          className="profile__buttonAvatar"
        >
          <img
            className="profile__avatar"
            alt="Аватар профиля"
            src={currentUser.avatar}
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            onClick={onEditProfile}
            className="profile__button-edit"
          ></button>
          <p className="profile__info-text">{currentUser.about}</p>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          className="profile__button-add"
        ></button>
      </section>
      <section className="elements">
        <ul className="cards">
        {cards}
        </ul>
      </section>
    </main>
  );
}
