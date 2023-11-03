import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useContext } from "react";
import { AppContext } from "../contexts/CurrentUserContext";

export default function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const avatarRef = useRef("");

  const isLoading = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      formName={"formAvatar"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      title={"Обновить Аватар"}
      name={"avatar-edit"}
      buttonText={isLoading ? "Обновление" : "Обновить"}
      children={
        <>
          <input
            className="popup__input"
            type="url"
            ref={avatarRef}
            placeholder="Ссылка на картинку"
            name="input"
            id="avatarLink"
            required
          />
          <span className="error avatarLink-error"></span>
        </>
      }
    />
  );
}
