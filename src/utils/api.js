//import { get } from "mongoose";

// хоть тут не надо все переписывать *ну почти
class Api {

    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
    }

  // приватный метод для ошибки что б не было дублирования :)
     _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    // метод загрузки карточек с сервера
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse)
    }
    //загрузка юзеринфо
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse)
    }
    //изменение юзеринфо передаем name и job(about)
    setUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${data.name}`,
          about: `${data.about}`,
        })
      })
      .then(this._checkResponse)
    }
    //добавить карточку  data (name link)  POST
    setCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
       name: `${data.name}`,
        link: `${data.link}`,

        })
      })
      .then(this._checkResponse)
    }

    removeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse)
    }
    /*addLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
      })
      .then(this._checkResponse)
    }

    removeLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
      })
      .then(this._checkResponse)
    }*/
    // avatar = data
    editUserAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {

          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: `${data.avatar}`
        })
      })
      .then(this._checkResponse)
    }
  }

  const config = {
   // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
   // token: '1c58ab56-f6d5-4a78-b0cd-4b039a0e7da3'
    //groupId: 'cohort-24'
    //baseUrl: 'https://api.mesto.lisena.nomoredomains.monster',
    baseUrl: 'http://localhost:3000',
    //baseUrl : `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const api = new Api(config);

export default api;
