const buttonEdit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup')
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelectorAll('.popup__input')[0];
const jobInput = document.querySelectorAll('.popup__input')[1];

buttonEdit.addEventListener('click', function() {
    document.querySelector('.popup').classList.add('popup_opened')
})

const popupClosed = document.querySelector('.popup__escape-button');

popupClosed.addEventListener('click', function() {
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened')
    }
})

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.remove('popup_opened')
}

formElement.addEventListener('submit', handleFormSubmit);