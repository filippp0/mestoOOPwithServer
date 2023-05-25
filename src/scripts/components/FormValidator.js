/*Класс (шаблон) для валидации формы, в конструктор принимает:
1ым параметром - объект настроек формы (объект с нужными селекторами и классами для стилизации ошибок и кнопки);
2ым параметром - форму для которой будут применяться данные настройки*/
export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._errorSelectorTemplate = config.errorSelectorTemplate;
    this._disableButtonClass = config.disableButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form
    this._button = form.querySelector(config.submitButtonSelector)
    this._inputList = form.querySelectorAll(config.inputSelector)
  }

  _showInputError() {
    this._input.classList.add(this._inputErrorClass);
    this._errorTextElement.textContent = this._input.validationMessage;
  }

  _hideInputError() {
    this._input.classList.remove(this._inputErrorClass);
    this._errorTextElement.textContent = '';
  }

  _enableButton() {
    this._button.classList.remove(this._disableButtonClass);
    this._button.disabled = false;
  }

  _disableButton() {
    this._button.classList.add(this._disableButtonClass);
    this._button.disabled = true;
  }

  _hasValidInput() {
    return Array.from(this._inputList).every(input => input.validity.valid);
  }

  _toggleButtonState() {
    this._hasValidInput() ? this._enableButton() : this._disableButton();
  }

  _checkInputValidity() {
    this._errorTextElement = this._form.querySelector(`${this._errorSelectorTemplate}${this._input.name}`);
    this._input.validity.valid ? this._hideInputError() : this._showInputError();
  }

  _setEventListener() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._input = input;
        this._checkInputValidity()
        this._toggleButtonState()
      })
    })
  }

  // метод актвации живой валидации
  enableValidation() {
    this._setEventListener();
  }

  //метод сброса ошибок и состояния кнопки
  resetErrorForOpenForm() {
    this._inputList.forEach(input => {
      this._input = input;
      this._errorTextElement = this._form.querySelector(`${this._errorSelectorTemplate}${input.name}`);
      if (!input.validity.valid) {
        this._hideInputError();
      }
    })
    this._disableButton()
  }
}
