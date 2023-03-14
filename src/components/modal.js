import { closeModal } from './utils.js'

export function handleEscape(event) {
  if (event.key === 'Escape') {
    const addModal = document.querySelector('.popup_opened')
    closeModal(addModal);
  };
};

export function handleOutside(event) {
  const addModal = document.querySelector('.popup_opened');
  if(!event.target.closest('.popup__form-container')) {
    closeModal(addModal);
  };
};

export const validationData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error-message_active'
};
