import { enableValidation, resetForm } from "./validation.js";

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  errorClass: "modal__error_visible",
};

enableValidation(validationConfig);

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const cardsContainer = document.querySelector(".cards__grid");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const editProfileButton = document.querySelector(".profile__edit-btn");
const newPostButton = document.querySelector(".profile__new-post-btn");

const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#new-post-modal");
const previewModal = document.querySelector("#preview-image-modal");

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

  if (modal._handleEscapeKey) {
    document.removeEventListener("keydown", modal._handleEscapeKey);
    delete modal._handleEscapeKey;
  }

  if (modal._handleOverlayClick) {
    modal.removeEventListener("mousedown", modal._handleOverlayClick);
    delete modal._handleOverlayClick;
  }
}

function openPreviewModal(data) {
  const modalImage = previewModal.querySelector(".modal__image-preview");
  const modalCaption = previewModal.querySelector(".modal__caption");

  modalImage.src = data.link;
  modalImage.alt = data.name;
  modalCaption.textContent = data.name;

  openModal(previewModal);
}

function createCard(data) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardImage.addEventListener("click", () => openPreviewModal(data));

  return card;
}

function renderInitialCards() {
  initialCards.forEach((item) => {
    const cardElement = createCard(item);
    cardsContainer.append(cardElement);
  });
}

editProfileButton.addEventListener("click", () => {
  const form = editProfileModal.querySelector(".modal__form");
  resetForm(form, validationConfig);

  const nameInput = form.querySelector("#profile-name__input");
  const descriptionInput = form.querySelector("#profile-description__input");

  nameInput.value = document.querySelector(".profile__name").textContent;
  descriptionInput.value = document.querySelector(
    ".profile__description"
  ).textContent;

  openModal(editProfileModal);
});

newPostButton.addEventListener("click", () => {
  const form = newPostModal.querySelector(".modal__form");
  resetForm(form, validationConfig);
  openModal(newPostModal);
});

document.querySelectorAll(".modal__close-btn").forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const modal = evt.target.closest(".modal");
    closeModal(modal);
  });
});

const newCardForm = newPostModal.querySelector(".modal__form");
newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const imageInput = newCardForm.querySelector("#card-image-input");
  const captionInput = newCardForm.querySelector("#caption-input");

  const newCardData = {
    name: captionInput.value,
    link: imageInput.value,
  };

  const cardElement = createCard(newCardData);
  cardsContainer.prepend(cardElement);

  closeModal(newPostModal);
  resetForm(newCardForm, validationConfig);
});

renderInitialCards();
