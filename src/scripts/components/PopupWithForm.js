import Popup from './Popup.js';

/*Наследник от Popup для попапов с формой*/
export default class PopupWithForm extends Popup {
  constructor (popupSelector, load, submitFunction) {
    super(popupSelector);
    this._load = load
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__submit');
    this._defaultButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputsValue())
    })
  }

  _getInputsValue() {
    this._values = {};
    this._inputList.forEach(input => {
      this._values[input.name] = input.value
    })
    return this._values
  }
/*метод setInputsValue не описан в тз, но необходим для установки value инпутов со страницы*/
  setInputsValue(dataUser) {
    this._inputList.forEach(input => {
      input.value = dataUser[input.name];
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

  close() {
    super.close();
    this._form.reset();
  }
}
