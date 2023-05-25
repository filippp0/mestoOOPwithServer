/*кнопки для открытия форм*/
const profileEditButtonElement = document.querySelector('.profile__edit');
const profileAddButtonElement = document.querySelector('.profile__add-button');
const avatarElement = document.querySelector('.profile__avatar-overlay')

/*Объект для хранения всех экземпляров FormValidator со страницы*/
const formsValidator = {};

/*константы с селекторами нужными для создания экземпляров(можно сделать из них конфиг и брать их по свойству конфига)*/
const selectorTemlate = '#cardElement';
const listsElementSelector = '.elements__lists';
const popupProfileSelector = '.profile-popup';
const popupAddCardSelector = '.card-popup';
const popupImageSelector = '.image-popup';
const popupDeleteSelector = '.delete-popup';
const popupEditAvatarSelector = '.edit-avatar-popup';

/*конфиг(объект) для UserInfo*/
const configInfo = {
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__job',
  profileAvatarSelector: '.profile__avatar',
};

/*конфиг(объект) для валидации*/
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  errorSelectorTemplate: '.popup__error_type_',
  disableButtonClass: 'popup__submit_disable',
  inputErrorClass: 'popup__input_invalid',
};

export {
  profileEditButtonElement,
  profileAddButtonElement,
  avatarElement,
  formsValidator,
  selectorTemlate,
  listsElementSelector,
  popupProfileSelector,
  popupAddCardSelector,
  popupImageSelector,
  popupDeleteSelector,
  popupEditAvatarSelector,
  configInfo,
  validationConfig,
};
