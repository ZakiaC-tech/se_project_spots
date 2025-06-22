console.log("JavaScript is connected!");

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeEditProfileModal =
  editProfileModal.querySelector(".modal__close-btn");
const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const closeNewPostModal = newPostModal.querySelector(".modal__close-btn");

const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const nameInput = document.querySelector("#profile-name__input");
const descriptionInput = document.querySelector("#profile-description__input");

editProfileBtn.addEventListener("click", function () {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

closeEditProfileModal.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

const profileFormElement = editProfileModal.querySelector(".modal__form");
profileFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;

  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

closeNewPostModal.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

const addCardFormElement = newPostModal.querySelector(".modal__form");
const cardImageInput = newPostModal.querySelector("#card-image-input");
const captionInput = newPostModal.querySelector("#caption-input");

addCardFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();

  console.log("Image link:", cardImageInput.value);
  console.log("Caption:", captionInput.value);

  newPostModal.classList.remove("modal_is-opened");
});
