import Popup from "./Popup.js";

export default class PopupWithDeleteForm extends Popup{
  constructor (popupSelector, load, submitFunction) {
    super(popupSelector);
    this._load = load
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__submit');
    this._defaultButtonText = this._submitButton.textContent;
    this.open = this.open.bind(this)
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction({ card: this._card, cardId: this._cadrId })
    })
  }

  setupText(isLoading, loadingText) {
    if (isLoading) {
      this._submitButton.textContent = ''
      this._submitButton.style.backgroundImage = `url(${this._load})`
    } else {
      this._submitButton.style.backgroundImage = 'none'
      this._submitButton.textContent = this._defaultButtonText
    }
  }

  // ловлю объект карточки и её Id
  open({ cardId, card }) {
    super.open()
    this._card = card;
    this._cadrId = cardId;
  }
}
