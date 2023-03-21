import { openModal, closeModal } from "./utils.js";
import {
  usersOnline,
  addCard,
  bigImage,
  popupImage,
  popupDecription,
  newLocation,
  title,
  userId,
  renderLoading,
  link
} from "./index.js";
import { postNewCard, removeApiCard, addLike, handleError, deleteLike } from "./api.js";

export function createCards(newCard) {
  const clonElement = addCard.querySelector(".card__item").cloneNode(true);
  const buttonDelete = clonElement.querySelector(".card__delete-button");
  const cardLike = clonElement.querySelector(".card__item-like-button");
  const allLikes = newCard.likes;
  const likesCounter = clonElement.querySelector(".card__like-counter");
  const cardImg = clonElement.querySelector(".card__item-image");
  clonElement.querySelector(".card__item-title").textContent = newCard.name;
  cardImg.alt = newCard.name;
  cardImg.src = newCard.link;

  clonElement.id = newCard._id;
  const clonElementId = clonElement.id;

  if (newCard.owner._id !== userId) {
    buttonDelete.remove();
  }
  if (allLikes.length > 0) {
    likesCounter.textContent = allLikes.length;
  }
  if (checkLikes(allLikes, userId)) {
    cardLike.classList.add("card__item-like-button_active")
  }
  cardLike.addEventListener('click', () => {
    if (cardLike.classList.contains('card__item-like-button_active')) {
      handleDeleteLike(cardLike, clonElementId, likesCounter);
      return;
    }
    handleAddlike(cardLike, clonElementId, likesCounter);
  });
  removeCard(clonElement, buttonDelete);

  openBigImg(newCard.name, newCard.link, cardImg);
  return clonElement;
}

export function enterCard(newCard) {
  const elementCard = createCards(newCard);
  usersOnline.prepend(elementCard);
}

function openBigImg(name, link, cover) {
  cover.addEventListener('click', () => {
    popupDecription.textContent = name;
    popupImage.alt = name;
    popupImage.src = link;
    openModal(bigImage);
  });
}

export function addNewCards(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button);
  postNewCard(title.value, link.value)
  .then((newCard) => {
    enterCard(newCard);
    evt.target.reset();
    closeModal(newLocation);
  })
  .catch(() => {
    handleError();
    evt.submitter.classList.add(validationData.disabledBtnClass);
    button.setAttrubute('disabled', '');
  })
  .finally(() => {
    renderLoading(false, button);
  });
}

function removeCard(clonElement, button) {
  button.addEventListener('click', () => {
    removeApiCard(clonElement.id)
    .then(() => {
      clonElement.closest('.card__item').remove();
    })
    .catch(handleError);
    button.removeAttribute('disabled', '');
  });
}

function checkLikes(likesList, userId) {
  return likesList.find((userLike) => userLike._id === userId);
}

function handleAddlike(cardLike, clonElementId, likeCounter) {
  return addLike(clonElementId)
  .then((res) => {
    likeCounter.textContent = res.likes.length;
    cardLike.classList.add("card__item-like-button_active")
  })
  .catch(handleError);
}

function handleDeleteLike(cardLike, clonElementId, likeCounter) {
  return deleteLike(clonElementId)
  .then((res) => {
    if (res.likes.length === 0) {
      likeCounter.textContent = "";
    } else {
      likeCounter.textContent = res.likes.length;
    }
    cardLike.classList.remove('card__item-like-button_active');
  })
  .catch(handleError);
}

