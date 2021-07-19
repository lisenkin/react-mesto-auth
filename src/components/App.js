import React from "react";
import { useState, useEffect } from 'react';
import logo from '../images/Vector.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import '../index.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import api from '../utils/api.js'

//сорри за прошлую итерацию, почему-то не загрузилось на гит :(
//update

//попробуем так
//стоило так радостно вспоминать классы что б снова переписывать  на функции(
function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Loading...",
    about: ''
  });

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  //загрузим карточки
  useEffect(() => {
    setIsLoading(true)
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch(err => console.log(`Error: ${err}`))
      .finally(() => setIsLoading(false))
  }, []);

  //загрузим юзер инфо дернув апи
  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(`Error: ${err}`));
  }, []);
  //обновим юзер инфо на новую
  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }
  //обновим аватар
  function handleUpdateAvatar(avatar) {
    api.editUserAvatar(avatar)
      .then(res => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  //закрытие всех попапов (установим всем фолс)
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({ isOpen: false });  //сброси
  }

  //кто вообще сказал что реакт легче 9 спринта?
  // upd после 11 спринта вроде не так плохо

  //эдит профиль
  const handleEditProfileClick = () => { setIsEditProfilePopupOpen(true) }
  //добавить место
  const handleAddPlaceClick = () => { setIsAddPlacePopupOpen(true) }
  //аватарка
  const handleEditAvatarClick = () => { setIsEditAvatarPopupOpen(true) }
  // большая картинка
  const handleCardClick = (data) => { setSelectedCard({ isOpen: true, ...data }) }

  //лайк с переделанным апи
  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(res => {
        const newCards = cards.map(item => item._id === card._id ? res : item);
        setCards(newCards);
      })
      .catch(err => console.log(`Error: ${err}`));
  }
  //удалить карточку (свою)
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(res => {
        const newCards = cards.filter(item => item._id === card._id ? null : item);
        setCards(newCards);
      })
      .catch(err => console.log(`Error: ${err}`));
  }
  //добавить карточку
  function handleAddPlaceSubmit({ name, link }) {
    api.setCard({ name, link })
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }
  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          srcLogo={logo}
          altLogo="лого место"
        />


        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />


        <Footer text="2021 mesto lisenkin" />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="popup-remove-card"
          title="Вы уверены?"
          textButton="Да"
        />

        <ImagePopup
          isOpen={selectedCard}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>

  );
}

export default App;
