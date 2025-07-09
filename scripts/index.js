console.log("Page script loaded and JavaScript is connected.");

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

// DOM Elements
const cardsContainer = document.querySelector(".cards__grid");
const cardTemplate = document.querySelector("#card-template").content;

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeEditProfileBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const profileNameDisplay = document.querySelector(".profile__name");
const profileDescriptionDisplay = document.querySelector(
  ".profile__description"
);
const nameInput = document.querySelector("#profile-name__input");
const descriptionInput = document.querySelector("#profile-description__input");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const closeNewPostBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const cardImageInput = newPostModal.querySelector("#card-image-input");
const captionInput = newPostModal.querySelector("#caption-input");

const previewModal = document.querySelector("#preview-image-modal");
const closePreviewBtn = previewModal.querySelector(".modal__close-btn");
const previewImage = previewModal.querySelector(".modal__image-preview");
const previewCaption = previewModal.querySelector(".modal__caption");

// Modal functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// Create card element
function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_active");
  });

  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// Edit profile
editProfileBtn.addEventListener("click", () => {
  nameInput.value = profileNameDisplay.textContent;
  descriptionInput.value = profileDescriptionDisplay.textContent;
  openModal(editProfileModal);
});

closeEditProfileBtn.addEventListener("click", () =>
  closeModal(editProfileModal)
);

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileNameDisplay.textContent = nameInput.value;
  profileDescriptionDisplay.textContent = descriptionInput.value;
  closeModal(editProfileModal);
});

// New post
newPostBtn.addEventListener("click", () => openModal(newPostModal));
closeNewPostBtn.addEventListener("click", () => closeModal(newPostModal));

newPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = getCardElement({
    name: captionInput.value,
    link: cardImageInput.value,
  });
  cardsContainer.prepend(newCard);
  newPostForm.reset();
  closeModal(newPostModal);
});

// Preview modal
closePreviewBtn.addEventListener("click", () => closeModal(previewModal));

// Load initial cards
initialCards.forEach((cardData) => {
  const card = getCardElement(cardData);
  cardsContainer.append(card);
});
