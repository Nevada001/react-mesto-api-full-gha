export default function PopupWithForm({
  title,
  name,
  children,
  onSubmit,
  isOpen,
  onClose,
  buttonText,
  formName,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button onClick={onClose} type="reset" className="popup__closed" />
        <form
          onSubmit={onSubmit}
          className={`popup__form popup__form_type_${name}`}
          name={formName}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
