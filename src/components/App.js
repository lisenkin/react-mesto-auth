import React from "react";
import { useState, useEffect } from 'react';
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
//new parts
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';



//попробуем так
//стоило так радостно вспоминать классы что б снова переписывать  на функции(
function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Loading...",
    about: ''
  });
  // + mail + loggedIn
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [cards, setCards] = useState([]);
  //const [isLoading, setIsLoading] = useState(false); выключим на время
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const history = useHistory();
  const [isSuccess, setSuccess] = React.useState(false);

  // загрузим данные
React.useEffect(() => {
  if (loggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData.data)
        setCards(cards.data)
      })
      .catch(err => {
        console.log(`Данные с сервера не получены. Ошибка: ${err}.`)
      })
  }
}, [loggedIn])

React.useEffect(() => {
  if (loggedIn) {
    history.push('/')
  }
}, [loggedIn, history])

  //закрытие всех попапов (установим всем фолс)
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({ isOpen: false });  //сбросим
    setIsInfoTooltipOpen(false);
  }


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
    const isLiked = card.likes.some(item => item === currentUser._id);

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
        const newCards = cards.filter(item => item === card ? null : item);
        setCards(newCards);
      })
      .catch(err => console.log(`Error: ${err}`));
  }
  //обновим юзер инфо на новую
  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then(res => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }
  //обновим аватар
  function handleUpdateAvatar(data) {
    api.editUserAvatar(data)
      .then(avatar => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  //добавить карточку
  function handleAddPlaceSubmit(data) {
    api.setCard(data)
      .then(res => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Error: ${err}`));
  }
//регистрация
  function handleRegister(email, password) {
    auth.register(email, password)
      .then((data) => {
        if (data){
        setSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push("/sign-in");
        }
      })

      .catch((err) => {
        console.error(err);
        setSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }
//логин
  function handleLogin(email, password) {

      auth.authorize(email, password)
      .then((data) => {
        if (data) {
        localStorage.setItem('jwt', data.token);
        setEmail(email);
        setLoggedIn(true);
        history.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
        setIsInfoTooltipOpen(true);
        setSuccess(false);
      });
  }
//логаут
  function handleLogout() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  useEffect(() => {
  function checkToken() {
    //возьмем из jwt
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setEmail(data.email);
            setLoggedIn(true);
            history.push("/");
          } else {
            setSuccess(false);
            setIsInfoTooltipOpen(true);
          }
        })
        .catch((err) => {
          console.error(err);
          setSuccess(false);
          setIsInfoTooltipOpen(true);
        })
    }
  }
  checkToken();
},[history]);


  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={email} onSignout={handleLogout} />
        <Switch>
          <ProtectedRoute exact
            path="/"
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            loggedIn={loggedIn}
          />
          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>
          <Route path='/sign-up'>
            <Register onRegister={handleRegister} />
          </Route>
          <Route> {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
        </Switch>

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
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          success={isSuccess}
          onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>

  );
}

export default App;
