import React from "react";
import closeBtn from '../images/Close_Icon.svg'
//если б не вебинар с children вообще не разобраться.
//update
function PopupWithForm(props) {
  return (

    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_visible'}`}>
      <div className="popup__content">
        <img src={closeBtn} alt="закрыть" className="popup__close-button" onClick={props.onClose} />
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={props.name}
          onSubmit={props.onSubmit}>
          {props.children}
          <button
            className="button popup__button-submit"
            type="submit">
            {props.textButton}
          </button>
        </form>

      </div>
    </div>
  );
}

export default PopupWithForm;
