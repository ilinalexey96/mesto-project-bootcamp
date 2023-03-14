    import '../pages/index.css';

    import { initialCards } from "./initialCards";
    import { openModal, closeModal } from "./utils.js";
    import { enterCard, addNewCards } from "./card.js";
    import { enableValidation, resetErrors } from "./validate.js"
    import { validationData } from "./modal.js"

    export const usersOnline = document.querySelector(".card__items");
    export const addCard = document.querySelector("#card-template").content;
    export const bigImage = document.querySelector("#bigImage");
    export const popupImage = document.querySelector(".popup__image-full");
    export const popupDecription = document.querySelector(".popup__image-tittle");
    const profileName = document.querySelector(".profile__title");
    const profileAbout = document.querySelector(".profile__subtitle");
    const editBtnProfile = document.querySelector("#editButton");
    const modalEdit = document.querySelector("#typeEdit");
    export const newLocation = document.querySelector("#newCard");
    const newLocationBtn = document.querySelector("#addButton");

    const btnClosePopup = document.querySelectorAll(".popup__close");

    export const popupContainer = document.querySelector("#profileForm");
    export const popupTitle = popupContainer.querySelector("#profileName");
    export const popupDescription = popupContainer.querySelector("#profileAbout");

    export const formNewLocation = document.querySelector("#addPlace");
    export const title = document.querySelector("#newCardTitle");
    export const link = document.querySelector("#newCardLink");

    initialCards.forEach((item) => {
    enterCard(item.name, item.link);
  });

    editBtnProfile.addEventListener("click", function () {
    const formElement = modalEdit.querySelector('.popup__form')
    resetErrors(formElement, validationData);
    openModal(modalEdit);
    setformDefault();
  });

    newLocationBtn.addEventListener("click", function () {
    const formElement = newLocation.querySelector('.popup__form')
    resetErrors( formElement, validationData);
    openModal(newLocation);
    });

    btnClosePopup.forEach(function (element) {
    element.addEventListener("click", () =>
    closeModal(element.closest(".popup_opened"))
    );
  });

    usersOnline.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__item-like-button")) {
    evt.target.classList.toggle("card__item-like-button_active");
    }
  });

    formNewLocation.addEventListener("submit", addNewCards);

    popupContainer.addEventListener("submit", editProfile);

    function setformDefault() {
      popupTitle.value = profileName.textContent;
      popupDescription.value = profileAbout.textContent;
  };

    function editProfile(evt) {
      evt.preventDefault();
      profileName.textContent = popupTitle.value;
      profileAbout.textContent = popupDescription.value;
      closeModal(modalEdit);
    };

    enableValidation(validationData);
 