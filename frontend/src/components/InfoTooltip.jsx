import confirmImage from "../images/Confirm.svg";
import erorrImage from "../images/errorConfirm.svg";
export default function InfoTooltip({ isOpen, isConfirm, onClose }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button type="reset" onClick={onClose} className="popup__closed" />
        {isConfirm ? (
          <>
            <img className="popup__image" src={confirmImage} alt="" />
            <p className="popup__caption">Вы успешно зарегистрировались!</p>
          </>
        ) : (
          <>
            <img className="popup__image" src={erorrImage} alt="" />
            <p className="popup__caption">Что-то пошло не так!
Попробуйте ещё раз.</p>
          </>
        )}
      </div>
    </div>
  );
}
