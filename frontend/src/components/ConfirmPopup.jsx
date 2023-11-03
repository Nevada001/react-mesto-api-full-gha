import PopupWithForm from "./PopupWithForm";
export default function ConfirmPopup({ isOpen, onClose, cardItem, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(cardItem);
  }

  return (
    <PopupWithForm
      formName={"formDelete"}
      title={"Вы уверены?"}
      name={"delete"}
      buttonText={"Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
