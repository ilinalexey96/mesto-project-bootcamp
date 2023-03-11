    import '../pages/index.css';
    
    const aboutButtonEdit = document.querySelector('.profile__edit-button');
    const aboutPopupEdit = document.querySelector('.popup_type_edit');
    const aboutButtonAdd = document.querySelector('.profile__add-button');
    const aboutPopupAdd = document.querySelector('.popup_type_new-card');
    const popupEditProfile = document.querySelector('.popup__form-container');
    const userName = document.querySelector('.profile__title');
    const userText = document.querySelector('.profile__subtitle');
    const nameInput = document.querySelector('.popup__item_type_name');
    const textInput = document.querySelector('.popup__item_type_about');
    const popupAddPlace = document.querySelector('.popup_type_new-card');
    const elementsPhotoContainer = document.querySelector('.card__items');
    const placeFormAdd = popupAddPlace.querySelector('.popup__form');
    const placeNameInput = placeFormAdd.querySelector('.popup__item_type_name');
    const placeLinkInput = placeFormAdd.querySelector('.popup__item_type_about');
    const template = document.querySelector('#card-template').content;
    const popupList = Array.from(document.querySelectorAll('.popup'));
    const buttonClosePopupEdit = aboutPopupEdit.querySelector('.popup__close');
    const buttonClosePopupAdd = aboutPopupAdd.querySelector('.popup__close');
    const imagePopup = document.querySelector('.popup_type_image-place');
    const imageTitle = imagePopup.querySelector('.popup__image-tittle');
    const imageFull = imagePopup.querySelector('.popup__image-full');
    const buttonCloseImagePopup = imagePopup.querySelector('.popup__close');

    const initialCards = [
      {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
      },
      {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
      },
      {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
      },
      {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
      },
      {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
      },
      {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
      }
    ];

    popupList.forEach((popup) => {
        popup.addEventListener('click', (event) => {
          if (event.target.classList.contains('popup__close')) {
            closePopup(popup);
          };
          if (event.target.classList.contains('popup_opened')) {
            closePopup(popup);
          };
        });
      });
      
      
      aboutButtonEdit.addEventListener('click', () => {
        nameInput.value = userName.textContent;
        textInput.value = userText.textContent;
        openPopup(aboutPopupEdit);
      });
      
      function openPopup(popup) {
        popup.classList.add('popup_opened');
      }
      
      function closePopup(popup) {
        popup.classList.remove('popup_opened');
      }
      
      function closeEditProfilePopup() {
        closePopup(aboutPopupEdit);
      };
      
      aboutButtonAdd.addEventListener('click', () => {
        openPopup(aboutPopupAdd);
      });
      
      function submitEditProfileForm(evtm) {
        evtm.preventDefault();
        userName.textContent = nameInput.value;
        userText.textContent = textInput.value;
        closeEditProfilePopup();
      };
      
      popupEditProfile.addEventListener('submit', submitEditProfileForm);

      const createPhotos = (photoCard) => {
        const elementItem = template.querySelector('.card__item').cloneNode(true);
        const buttonLike = elementItem.querySelector('.card__item-like-button');
        const elementImage = elementItem.querySelector('.card__item-image');
        elementImage.src = photoCard.link;
        elementImage.alt = photoCard.name;
        elementItem.querySelector('.card__item-title').textContent = photoCard.name;
        elementItem.querySelector('.card__delete-button').addEventListener('click', () => {
            elementItem.remove();
        })

      elementImage.addEventListener('click', () => {
        imageFull.src = photoCard.link;
        imageFull.alt = photoCard.name;
        imageTitle.textContent = photoCard.name;
        openPopup(imagePopup);
      });

      buttonLike.addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__item-like-button_active')
      })

      return elementItem;
    }

    const renderPlace = (photoCard) => {
        elementsPhotoContainer.prepend(createPhotos(photoCard));
    }

    const addPlace = (event) => {
        event.preventDefault();
        const photoCard = {};
        photoCard.name = placeNameInput.value;
        photoCard.link = placeLinkInput.value;
        renderPlace(photoCard);
        closePopup(popupAddPlace);
        placeFormAdd.reset();
      };
    
      const cardsInitial = initialCards.map(photoCard => {
        return createPhotos(photoCard);
      });

      elementsPhotoContainer.append(...cardsInitial);
      placeFormAdd.addEventListener('submit', addPlace);
