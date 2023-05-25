import Popup from './Popup.js';

/*Наследник от Popup для попапа с картинкой*/
export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector)
    this._popupImage = this._popup.querySelector('.image-popup__image');
    this._imagePopupCaption = this._popup.querySelector('.image-popup__image-caption');
  }

  open = (cardData) => {
    this._popupImage.src = cardData.link;
    this._popupImage.alt = `Изображение ${cardData.title}`;
    this._imagePopupCaption.textContent = cardData.title;
    super.open();
  }
}
