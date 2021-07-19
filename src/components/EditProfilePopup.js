import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }


  return (
    <PopupWithForm
      name="popup-edit-card"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text" placeholder="Ваше имя"
        name="popup-input-name"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName}
        required
      />
     <span className="popup__error popup-input-name-error"></span>
      <input
        className="popup__input popup__input_type_status"
        type="text" placeholder="Расскажите о себе"
        name="popup-input-status"
        minLength="2"
        maxLength="200"
        value={about}
        onChange={handleChangeAbout}
        required
      />
      <span className="popup__error popup-input-status-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
