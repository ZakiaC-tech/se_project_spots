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

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", function () {
  nameInput.value = profileNameDisplay.textContent;
  descriptionInput.value = profileDescriptionDisplay.textContent;
  openModal(editProfileModal);
});

closeEditProfileBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  profileNameDisplay.textContent = nameInput.value;
  profileDescriptionDisplay.textContent = descriptionInput.value;

  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

closeNewP;
