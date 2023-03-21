    import '../pages/index.css';
    
    import { openModal, closeModal } from "./utils.js";
    import { enterCard, addNewCards } from "./card.js";
    import { enableValidation, resetErrors, toggleButtonState } from "./validate.js"
    import { validationData } from "./modal.js"
    import { getInitialCards, updateProfileData, getProfileData, updateProfileAvatar, handleError } from './api';

    //карточка клонирования
    export const usersOnline = document.querySelector(".card__items");
    export const addCard = document.querySelector("#card-template").content;
    export const bigImage = document.querySelector("#bigImage");
    export const popupImage = document.querySelector(".popup__image-full");
    export const popupDecription = document.querySelector(".popup__image-tittle");

    // попап редактирования профиля
    const modalEdit = document.querySelector("#typeEdit");
    const editBtnProfile = document.querySelector("#editButton");
    export const popupContainerForm = document.forms["editProfile"];
    export const popupTitle = document.querySelector("#profileName");
    export const popupDescription = document.querySelector("#profileAbout");

    //попап новое место
    export const newLocation = document.querySelector("#newCard");
    const newLocationBtn = document.querySelector("#addButton");
    const buttonLocationBtn = document.querySelector('#newLocationbtnSave');
    export const formNewLocation = document.querySelector("#addPlace");
    export const title = document.querySelector("#newCardTitle");
    export const link = document.querySelector("#newCardLink");
    const popupSaveButton = document.querySelector('.popup__save-button_inactive');

    //попап обновления аватара
    const updateAvatar = document.querySelector('#updateAvatar');
    const editAvatarBtn = document.querySelector('.profile__avatar-edit');
    const buttonAvatarBtn = document.querySelector('#updateAvatarButton');
    export const formUpdateAvatar = document.forms["formUpdateAvatar"];
    const editAvatarInput = document.querySelector('#updateAvatarInput');

    //others
    const profileName = document.querySelector(".profile__title");
    const profileAbout = document.querySelector(".profile__subtitle");
    const profileAvatar = document.querySelector('.profile__avatar');
    const btnClosePopups = document.querySelectorAll(".popup__close");

    export let userId;

    btnClosePopups.forEach((element) => {
      element.addEventListener('click', () => {
        const buttonPopup = element.closest('.popup');
        closeModal(buttonPopup);
      })
    });

    editBtnProfile.addEventListener("click", function () {
      resetErrors(popupContainerForm, validationData);
      openModal(modalEdit);
      setformDefault();
    });
    
    newLocationBtn.addEventListener("click", function () {
    resetErrors(formNewLocation, validationData);
    openModal(newLocation);
    toggleButtonState(formNewLocation, buttonLocationBtn, validationData);
    });

    editAvatarBtn.addEventListener('click', () => {
      resetErrors(formUpdateAvatar, validationData);
      openModal(updateAvatar);
      toggleButtonState(formUpdateAvatar, buttonAvatarBtn, validationData);
    });

    formNewLocation.addEventListener("submit", addNewCards);

    popupContainer.addEventListener("submit", editProfile);

    formUpdateAvatar.addEventListener("submit", editAvatar);

    function editProfile(evt) {
      evt.preventDefault();
      const button = evt.submitter;
      renderLoading(true, button);
      updateProfileData(popupTitle.value, popupDescription.value)
      .then((newData) => {
        profileName.textContent = newData.name;
        profileAbout.textContent = newData.about;
        evt.target.reset(); 
        closeModal(modalEdit);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, button);
      });
    }

    function setformDefault() {
      popupTitle.value = profileName.textContent;
      popupDescription.value = profileAbout.textContent;
  };

    function editAvatar(evt) {
      evt.preventDefault();
      const button = evt.submitter;
      renderLoading(true, button);
      updateProfileAvatar(editAvatarInput.value)
      .then((newData) => {
        profileAvatar.src = newData.avatar;
        evt.target.reset();
        closeModal(updateAvatar);
      })
      .catch(handleError)
      .finally(() => {
        renderLoading(false, button);
      });
    }

    function insertDataProfile(obj) {
      profileName.textContent = obj.name;
      profileAbout.textContent = obj.about;
      profileAvatar.src = obj.avatar;
    }

    Promise.all([getInitialCards(), getProfileData()])
    .then(([cards, profileData]) => {
      insertDataProfile(profileData);
      userId = profileData._id;
      const cardList = Array.from(cards).reverse();
      cardList.forEach(enterCard);
    })
    .catch(handleError);

    export function renderLoading(isLoading, button) {
      if (isLoading) {
        button.textContent = "Сохранение...";
        button.setAttribute("disabled", "");
        return;
      }
      button.textContent = "Сохранить"; 
      button.classList.add(validationData.disabledBtnClass);
      button.removeAttribute("disabled", "");
    }

    enableValidation(validationData);
 