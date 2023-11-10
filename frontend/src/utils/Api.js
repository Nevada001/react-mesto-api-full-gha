class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._validateRes = this._validateRes.bind(this);
    this._headers = options.headers;
  }

  _validateRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._validateRes);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._validateRes);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._validateRes);
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._validateRes);
  }

  changeLikeCardStatus(cardItem, isLike) {
    return fetch(`${this._baseUrl}/cards/${cardItem}/likes`, {
      method: isLike ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._validateRes);
  }

  removeCard(cardItem) {
    return fetch(`${this._baseUrl}/cards/${cardItem._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._validateRes);
  }

  changeUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._validateRes);
  }
}

const token = localStorage.getItem("jwt");
export const api = new Api({
  baseUrl: "https://api.nevada.nomoredomainsrocks.ru",
  headers: {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
