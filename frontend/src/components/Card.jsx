import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
export default function Card({onCardLike, onCardDeleteClick, card, cardToBeDeleted, onCardClick}) {
  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    cardToBeDeleted(card)
    onCardDeleteClick();
  }

  function handleLikeClick() {
    onCardLike(card);
  }
  const currentUser = React.useContext(CurrentUserContext);
  const isLike = card.likes.some(like => like === currentUser._id);
  const cardHeartButtonClassName = (`card__heart ${isLike && 'card__heart_active'}`)
  const isOwn = card.owner === currentUser._id;

  return (
    <li className="card">
      <img
        src={card.link}
        onClick={handleClick}
        className="card__image"
        alt={card.name}
      />
      {isOwn && <button type="reset" onClick={handleDeleteClick} className="card__delete" id="delete"/> }
      <div className="card__container">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__heart-container">
          <button  onClick={handleLikeClick} className={cardHeartButtonClassName}></button>
          <p className="card__number-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
