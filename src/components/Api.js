class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  // API callback.
  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`).catch((err) => {
      alert("Unexpected error, please try again.");
      console.log("There was an error", err);
    });
  }

  getInfoAPI() {
    return Promise.all([this.getInitialCardsAPI(), this.getProfileInfoAPI()]);
  }

  // Populate page initially with cards.
  getInitialCardsAPI() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._response);
  }

  // Get profile info.
  getProfileInfoAPI() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._response);
  }

  setProfileInfoAPI(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._response);
  }
  // Allows user to change profile picture.
  setAvatarAPI(imgLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: imgLink,
      }),
    }).then(this._response);
  }

  addCardAPI({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._response);
  }

  deleteCardAPI(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._response);
  }

  addLikeAPI(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._response);
  }

  removeLikeAPI(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._response);
  }
}

export default Api;
