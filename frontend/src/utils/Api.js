class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._validateRes = this._validateRes.bind(this);
  }

  _validateRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  setUserInfo(name, about) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._validateRes);
  }

  getUserInfo() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._validateRes);
  }

  getInitialCards() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._validateRes);
  }

  addNewCard(name, link) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers:  { 
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json", },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._validateRes);
  }

  changeLikeCardStatus(cardItem, isLike) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards/${cardItem}/likes`, {
      headers:  { 
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json", },
    }).then(this._validateRes);
  }

  removeCard(cardItem) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards/${cardItem._id}`, {
      method: "DELETE",
      headers:  { 
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json", },
    }).then(this._validateRes);
  }

  changeUserAvatar(avatar) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers:  { 
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json", },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._validateRes);
  }
}

export const api = new Api({
  baseUrl: "http://localhost:3000",
});
