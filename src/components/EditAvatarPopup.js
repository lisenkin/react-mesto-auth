import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {


  const avatarRef = React.useRef('')

  function handleSubmit(e) {
    e.preventDefault()

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }


  return (
    <PopupWithForm
      name="popup-add-avatar"
      title="Обновить аватар"
      textButton="Обновить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_photo"
        type="url"
        placeholder="Ссылка на аватар"
        name="popup-input-url-avatar"
        ref={avatarRef}
        required
      />
      <span className="popup__error popup-input-url-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
