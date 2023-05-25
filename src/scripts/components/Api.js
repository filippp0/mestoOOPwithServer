export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers
    this._authorization = options.headers.authorization
  }

  _checkResponse(res) {return res.ok ? res.json() : Promise.reject}

  _request(url, options) {
    return fetch(`${this._url}${url}`, options)
      .then(this._checkResponse)
  }

  getInfo() {
    return this._request('/users/me', {
      headers: {
        authorization: this._authorization
      }
    })
  }


  setUserInfo(data) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.job,
      })
    })
  }

  getCards() {
    return this._request('/cards', {
      headers: {
        authorization: this._authorization
      }
    })
  }

  addCard(data) {
    return this._request('/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      })
    })
  }

  setNewAvatar(data) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
  }

  deleteLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
  }

  addLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
  }
}
