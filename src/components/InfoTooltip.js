import React from "react";
import failPicture from "./../images/fail.svg";
import successPicture from "./../images/success.svg";

function InfoTooltip(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen && "popup_visible"}`}>
      <div className="popup__content">
      <button
          className="button popup__close-button"
          type="button"
          onClick={props.onClose}>
        </button>
        <div className="popup__tooltip">
          <img className="popup__tooltip-img" alt="успех-не-успех" src={props.success ? successPicture : failPicture} />
          <p className="popup__tooltip-title">{props.success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
