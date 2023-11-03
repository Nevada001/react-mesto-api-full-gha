export default function ImagePopup({ card, onClose, isOpen }) {
  return (
    <div className={`popup popup_image ${isOpen && "popup_opened"}`}>
      <div className="popup__image-container">
        <button
          type="reset"
          onClick={onClose}
          className="popup__closed"
          id="imageclose"
        ></button>
        <img className="popup__picture" alt={card?.name} src={card?.link} />
        <p className="popup__name">{card?.name}</p>
      </div>
    </div>
  );
}
