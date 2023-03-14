import { openModal, closeModal } from "./utils.js";
import {
  usersOnline,
  addCard,
  bigImage,
  popupImage,
  popupDecription,
  newLocation,
  title,
  link,
} from "./index.js";

export function createCards(name, link) {
  const clonElement = addCard.querySelector(".card__item").cloneNode(true);
  clonElement.querySelector(".card__item-title").textContent = name;
  clonElement.querySelector(".card__item-image").alt = name;
  clonElement.querySelector(".card__item-image").src = link;
  openBigImg(name, link, clonElement);
  deleteCard(clonElement);
  return clonElement;
}

export function enterCard(name, link) {
  const elementCard = createCards(name, link);
  usersOnline.prepend(elementCard);
}

export function addNewCards(evt) {
  evt.preventDefault();
  enterCard(title.value, link.value);
  closeModal(newLocation);
  evt.target.reset();
}

function deleteCard(clonElement) {
  clonElement.querySelector(".card__delete-button").addEventListener("click", () => {
    clonElement.closest(".card__item").remove();
  });
}

function openBigImg(name, link, clonElement) {
  clonElement.querySelector(".card__item-image").addEventListener("click", () => {
    popupDecription.textContent = name;
    popupImage.alt = name;
    popupImage.src = link;
    openModal(bigImage);
  });
}
