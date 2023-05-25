import './index.css';
import load from '../image/load3.gif'
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithDeleteForm from '../scripts/components/PopupWithDeleteForm.js';
import Api from '../scripts/components/Api.js';
import {
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
} from '../scripts/utils/constants.js'

/*создаю экземпляр класса Api*/
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '9f4d5ff3-f724-49c2-9657-4a12392beeb3',
    'Content-Type': 'application/json'
  }
});

/*создаю экземпляр класса UserInfo*/
const userInfo = new UserInfo(configInfo);

/*создаю экземпляр класса PopupWithImage*/
const popupImage = new PopupWithImage(popupImageSelector);

function creatNewCard(element) {
  const card = new Card(element, selectorTemlate, popupImage.open, popupDelete.open, (likeElement, cardId,) => {
    if (likeElement.classList.contains('elements__like-icon_active')) {
      api.deleteLike(cardId)
        .then(res => {
          card.toggelLike(res.likes)
        })
        .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
    } else {
      api.addLike(cardId)
        .then(res => {
          card.toggelLike(res.likes)
        })
        .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`))
    }
  })
  return card.createCard();
}

/*функция шаблон для обработки сабмита после запроса на сервер*/
function handleSubmit (request, popupInstance, textForCatch = 'Ошибка', lodingText = 'Сохранение...') {
  popupInstance.setupText(true, lodingText)
  request()
    .then(() => {
      popupInstance.close()
    })
    .catch((error) => console.error(`${textForCatch} ${error}`))
    .finally(() => popupInstance.setupText(false))
}

/*создаю экземпляр класса Section с объектом начальных карточек и функцией создания разметки карточки*/
const section = new Section((element) => {
  section.addItemAppend(creatNewCard(element))
  }, listsElementSelector);

/*создаю экземпляр класса PopupWithForm для формы редактирования профиля со своим сабмитом*/
const popupProfile = new PopupWithForm(popupProfileSelector, load, (data) => {
  function makeRequest () {
    return api.setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo({name: res.name, job: res.about, avatar: res.avatar})
    })
  }
  handleSubmit(makeRequest, popupProfile, 'Ошибка при редактировании профиля')
});

/*создаю экземпляр класса PopupWithForm для формы добавления карточек со своим сабмитом*/
const popupAddCard = new PopupWithForm(popupAddCardSelector, load, (data) => {
  function makeRequest () {
    return Promise.all([api.getInfo(), api.addCard(data)])
      .then(([dataUser, dataCard]) => {
        dataCard.myid = dataUser._id
        section.addItemPrepend(creatNewCard(dataCard))
      })
  }
  handleSubmit(makeRequest, popupAddCard, 'Ошибка при добавлении карточки', 'Создание...')
});

/*создаю экземпляр класса PopupWithForm для формы добавления карточек со своим сабмитом*/
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, load, (data) => {
  function makeRequest () {
    return api.setNewAvatar(data)
    .then(res => {
      userInfo.setUserInfo({name: res.name, job: res.about, avatar: res.avatar})
    })
  }
  handleSubmit(makeRequest, popupEditAvatar, 'Ошибка при редактировании аватара')
});

/*создаю экземпляр класс для попапа удаления карточки */
const popupDelete = new PopupWithDeleteForm(popupDeleteSelector, load, ({ card, cardId }) => {
  function makeRequest() {
    return api.deleteCard(cardId)
      .then(() => {
        card.removeCard()
        popupDelete.close()
      })
  }
  handleSubmit(makeRequest, popupDelete, 'Ошибка при удалении карточки', 'Удаление...')
});

/*создаю экземпляры класса FormValidator и сразу активирую валидацию для каждого экземпляра*/
Array.from(document.forms).forEach(item => {
  const form = new FormValidator(validationConfig, item);
  const name = item.getAttribute('name');
  formsValidator[name] = form;
  form.enableValidation()
})

/*Вешаю слушатели для каждого попапа*/
const popups = [popupImage, popupProfile, popupAddCard, popupDelete, popupEditAvatar]
popups.forEach(element => element.setEventListeners())

/*открытие попап редоктирования профиля*/
profileEditButtonElement.addEventListener('click', () => {
  formsValidator.personalData.resetErrorForOpenForm();
  popupProfile.setInputsValue(userInfo.getUserInfo())
  popupProfile.open()
})

/*открытие попап редоктирования карточек*/
profileAddButtonElement.addEventListener('click', () => {
  formsValidator.addCard.resetErrorForOpenForm();
  popupAddCard.open();
})

/*открытие попап редоктирования аватара*/
avatarElement.addEventListener('click', ()=> {
  formsValidator.editAvatar.resetErrorForOpenForm()
  popupEditAvatar.open()
})

Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach(element => element.myid = dataUser._id);
    userInfo.setUserInfo({ name: dataUser.name, job: dataUser.about, avatar: dataUser.avatar });
    section.addCardFromArray(dataCard);
  })
  .catch((error) => console.error(`Ошибка при создании начальных данных страницы ${error}`))
