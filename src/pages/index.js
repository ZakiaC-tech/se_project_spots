// Styles
import "../pages/index.css";

// Utilities/classes
import Api from "../utils/Api.js";
import { enableValidation, resetForm } from "../scripts/validation.js";

// Images

import logo from "../images/Logo.svg";
import editIcon from "../images/Edit_Icon.svg";
import plusIcon from "../images/Plus_icon.svg";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7c666460-301a-4057-87e3-7671726cf224",
    "Content-Type": "application/json",
  },
});
console.log("JS is running");

// ========================
// IMAGE SETUP (SAFE)
// ========================
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".header__logo").src = logo;

  document.querySelector(".edit-icon").src = editIcon;
  document.querySelector(".plus-icon").src = plusIcon;
});

// ========================
// VALIDATION
// ========================
const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  errorClass: "modal__error_visible",
};

enableValidation(validationConfig);

// ========================
// DOM ELEMENTS
// ========================
const cardsContainer = document.querySelector(".cards__grid");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const editProfileButton = document.querySelector(".profile__edit-btn");
const newPostButton = document.querySelector(".profile__new-post-btn");

const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#new-post-modal");
const previewModal = document.querySelector("#preview-image-modal");

const deleteModal = document.querySelector("#delete-card-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

let selectedCard;
let selectedCardId;

function renderUserInfo(user) {
  document.querySelector(".profile__name").textContent = user.name;
  document.querySelector(".profile__description").textContent = user.about;
  document.querySelector(".profile__avatar").src = user.avatar;
}

// ========================
// MODALS
// ========================
function openModal(modal) {
  modal.classList.add("modal_is-opened");

  function handleEscapeKey(evt) {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  }

  function handleOverlayClick(evt) {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  }

  modal._handleEscapeKey = handleEscapeKey;
  modal._handleOverlayClick = handleOverlayClick;

  document.addEventListener("keydown", handleEscapeKey);
  modal.addEventListener("mousedown", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");

  document.removeEventListener("keydown", modal._handleEscapeKey);
  modal.removeEventListener("mousedown", modal._handleOverlayClick);

  delete modal._handleEscapeKey;
  delete modal._handleOverlayClick;
}

// ========================
// PREVIEW MODAL
// ========================
function openPreviewModal(data) {
  const modalImage = previewModal.querySelector(".modal__image-preview");
  const modalCaption = previewModal.querySelector(".modal__caption");

  modalImage.src = data.link;
  modalImage.alt = data.name;
  modalCaption.textContent = data.name;

  openModal(previewModal);
}

// ========================
// CARDS
// ========================
function createCard(data) {
  const card = cardTemplate.cloneNode(true);

  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");

  if (data.isLiked) {
    likeButton.classList.add("card__like-button_active");
  }
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardImage.addEventListener("click", () => openPreviewModal(data));

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("card__like-button_active")) {
      api
        .removeLike(data._id)
        .then(() => {
          likeButton.classList.remove("card__like-button_active");
        })
        .catch(console.error);
    } else {
      api
        .addLike(data._id)
        .then(() => {
          likeButton.classList.add("card__like-button_active");
        })
        .catch(console.error);
    }
  });
  deleteButton.addEventListener("click", () => {
    selectedCard = card;
    selectedCardId = data._id;

    openModal(deleteModal);
  });

  return card;
}

function renderInitialCards(cards) {
  cards.forEach((item) => {
    cardsContainer.append(createCard(item));
  });
}

// ========================
// EVENT LISTENERS
// ========================
editProfileButton.addEventListener("click", () => {
  const form = editProfileModal.querySelector(".modal__form");
  resetForm(form, validationConfig);

  const nameInput = form.querySelector("#profile-name__input");
  const descriptionInput = form.querySelector("#profile-description__input");

  nameInput.value = document.querySelector(".profile__name").textContent;
  descriptionInput.value = document.querySelector(
    ".profile__description",
  ).textContent;

  openModal(editProfileModal);
});

newPostButton.addEventListener("click", () => {
  const form = newPostModal.querySelector(".modal__form");
  resetForm(form, validationConfig);
  openModal(newPostModal);
});

// close buttons
document.querySelectorAll(".modal__close-btn").forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    closeModal(evt.target.closest(".modal"));
  });
});

// edit profile submit
const editProfileForm = editProfileModal.querySelector(".modal__form");

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const nameInput = editProfileForm.querySelector("#profile-name__input");
  const descriptionInput = editProfileForm.querySelector(
    "#profile-description__input",
  );

  const userData = {
    name: nameInput.value,
    about: descriptionInput.value,
  };

  api
    .editUserInfo(userData)
    .then((user) => {
      renderUserInfo(user);
      closeModal(editProfileModal);
    })
    .catch(console.error);
});

// new card submit
const newCardForm = newPostModal.querySelector(".modal__form");

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const imageInput = newCardForm.querySelector("#card-image-input");
  const captionInput = newCardForm.querySelector("#caption-input");

  const newCardData = {
    name: captionInput.value,
    link: imageInput.value,
  };

  api
    .addCard(newCardData)
    .then((card) => {
      cardsContainer.prepend(createCard(card));

      closeModal(newPostModal);
      newCardForm.reset();
      resetForm(newCardForm, validationConfig);
    })
    .catch(console.error);
});

deleteForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error);
});
// ========================
// INIT
// ========================
api
  .getUserInfo()
  .then((user) => {
    renderUserInfo(user);
  })
  .catch(console.error);

api
  .getInitialCards()
  .then((cards) => {
    renderInitialCards(cards);
  })
  .catch(console.error);
