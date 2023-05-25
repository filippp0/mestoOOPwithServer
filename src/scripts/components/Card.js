/*Класс (шаблон) для создания каоточек, в конструктор принимает:
1ым параметром - объект со значениями ссылки на картинку и её заголовка в карточке;
2ым параметром - селектор темплейта по которому будет создан клон разметки для каждой карточки;
3им параметром - примимает ссылку на функцыю для обработки открытия картинки в попапе для картинок
4ым параметром - примимает ссылку на функцыю для обработки открытия попапа удаления карточки
5ым параметром - примимает ссылку на функцыю для обработки клика по лайку*/
export default class Card {
  constructor (cardData, selectorTemlate, openImagePopup, openDelete, changeLike) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._cardId = cardData._id;
    this._myId = cardData.myid;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes
    this._likesLength = cardData.likes.length;
    this._changeLike = changeLike;
    this._openImagePopup = openImagePopup;
    this._openDelete = openDelete;
    this._cloneElement = document.querySelector(selectorTemlate).content.querySelector('.elements__list').cloneNode(true);
    this._imageElement = this._cloneElement.querySelector('.elements__image');
    this._likeIconElement = this._cloneElement.querySelector('.elements__like-icon');
    this._trashElement = this._cloneElement.querySelector('.elements__trash');
    this._subTitle = this._cloneElement.querySelector('.elements__subtitle');
    this._counter = this._cloneElement.querySelector('.elements__counter');
  }

  _handleLike = () => {
    this._changeLike(this._likeIconElement, this._cardId)
  }

  _handleDeleteElement = () => {
    this._openDelete({ cardId: this._cardId, card: this });
  }

  _handleOpenImageInPopupImage = () => {
    this._openImagePopup({ title: this._name, link: this._link });
  }

  _setEventListener() {
    this._likeIconElement.addEventListener('click', this._handleLike);
    this._trashElement.addEventListener('click', this._handleDeleteElement);
    this._imageElement.addEventListener('click', this._handleOpenImageInPopupImage);
  }

  _checkLikeStatus() {
    // const checkMyUser = this._likes.some(user => user._id === this._myId)
    // if (checkMyUser) {
    //   this._likeIconElement.classList.add('elements__like-icon_active')
    // }

    // const myUser = this._likes.find(user => user._id === this._myId)
    // if (myUser !== undefined) {
    //   this._likeIconElement.classList.add('elements__like-icon_active')
    // }

    this._likes.forEach(item => {
      if (item._id === this._myId) {
        this._likeIconElement.classList.add('elements__like-icon_active')
        return
      }
    })
    this._counter.textContent = this._likesLength
  }

  _changeVisibleForTrashButton() {
    this._myId === this._ownerId ? this._trashElement.style.display = 'block' : this._trashElement.style.display = 'none'
  }

  removeCard() {
    this._cloneElement.remove()
    this._cloneElement = null
  }

  toggelLike(likes) {
    this._likeIconElement.classList.toggle('elements__like-icon_active')
    this._counter.textContent = likes.length
  }

  createCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = `Изображение ${this._name}`;
    this._subTitle.textContent = this._name;
    this._checkLikeStatus()
    this._changeVisibleForTrashButton()
    this._setEventListener();
    return this._cloneElement;
  }
}
