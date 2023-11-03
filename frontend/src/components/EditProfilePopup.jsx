import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext, CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

export default function EditProfilePopup({ onUpdateUser, onClose, isOpen }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLoading = useContext(AppContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      formName={"formEdit"}
      onClose={onClose}
      isOpen={isOpen}
      title={"Редактировать профиль"}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      name={"edit"}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            className="popup__input"
            minLength="2"
            maxLength="40"
            placeholder="Имя"
            value={name || ""}
            onChange={handleChangeName}
            type="text"
            name="input"
            id="userName"
            required
          />
          <span className="error userName-error"></span>
          <input
            className="popup__input"
            minLength="2"
            maxLength="200"
            placeholder="Вид деятельности"
            onChange={handleChangeDescription}
            value={description || ""}
            type="text"
            name="input"
            id="userInfo"
            required
          />
          <span className="error userInfo-error"></span>
        </>
      }
    />
  );
}
