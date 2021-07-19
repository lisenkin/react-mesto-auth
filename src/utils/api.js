
// хоть тут не надо все переписывать *ну почти
class Api {

    constructor({ baseUrl, token }) {
      this._baseUrl = baseUrl;
      this._token = token;
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
        headers: {
          authorization: this._token
        }
      })
      .then(this._checkResponse)
    }
    //загрузка юзеринфо
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: this._token
        }
      })
      .then(this._checkResponse)
    }
    //изменение юзеринфо передаем name и job(about)
    setUserInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          about,
        })
      })
      .then(this._checkResponse)
    }
    //добавить карточку  data (name link)  POST
    setCard({ name, link }) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name,
        link
        })
      })
      .then(this._checkResponse)
    }

    removeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
      })
      .then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: {
          authorization: this._token,
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
    editUserAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(avatar)
      })
      .then(this._checkResponse)
    }
  }

  const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    token: '1c58ab56-f6d5-4a78-b0cd-4b039a0e7da3'
    //groupId: 'cohort-24'
  }

  const api = new Api(config);

export default api;
