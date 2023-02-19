const buttonEdit = document.querySelector('.profile__edit-button');

buttonEdit.addEventListener('click', function() {
    document.querySelector('.popup').classList.add('popup_opened')
})

const popupClosed = document.querySelector('.popup__escape-button');

popupClosed.addEventListener('click', function() {
    const popup = document.querySelector('.popup')
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened')
    } else {
        alert("class popup_opened not found");
    }
})