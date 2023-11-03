 class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._validateRes = this._validateRes.bind(this)
  }

  _validateRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._validateRes)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(this._validateRes)
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(this._validateRes)
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._validateRes)
  }

  changeLikeCardStatus(cardItem, isLike) {
    return fetch(`${this._baseUrl}/cards/${cardItem}/likes`, {
      method: isLike ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._validateRes)
  }

  removeCard(cardItem) {
    return fetch(`${this._baseUrl}/cards/${cardItem._id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._validateRes)
  }

  changeUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then(this._validateRes)
  }
}


export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-71",
  headers: {
    authorization: "7b17248a-4f40-4b14-bba1-0f66717e7e72",
    "Content-Type": "application/json",
  },
});