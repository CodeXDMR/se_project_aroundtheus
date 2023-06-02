import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input_error",
};

/* ------------------------ VARIABLES ------------------------ */

// // Card Template
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;
// const cardSelector = "#card-template";

// Card Wrapper
const cardsWrap = document.querySelector(".card__list");

// Open Modals
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#add-card-button");

// Profile Edit Card Modal____________________________________________
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalClose = profileEditModal.querySelector(
  "#profile-modal-close"
);

// Inital Text
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Edit Text
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
// Profile Submit Button
const button = document.querySelector("#submit-button");

// Close Button
const closeButtons = document.querySelectorAll(".modal__close");

// Add Card Modal_____________________________________________________
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalClose = addCardModal.querySelector("#add-card-modal-close");

// Add Text
const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardURLInput = document.querySelector("#add-card-modal-URL");

// Modal Form_________________________________________________________
const profileEditForm = document.forms["edit-card-form"];
const addCardModalForm = document.forms["add-card-form"];
// const profileEditForm = profileEditModal.querySelector(".modal__form");
// const addCardModalForm = addCardModal.querySelector(".modal__form");

// Preview Image Modal________________________________________________
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalClose = document.querySelector("#preview-modal-close");
const cardPreviewTitle = document.querySelector("#card-preview-title");
const previewImage = document.querySelector("#card-preview-image");

// Instantiate FormValidator
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardModalForm);

/* ------------------------ FUNCTIONS ------------------------ */

// Generate Card
function createCard(cardData) {
  const newCard = new Card(cardData, "#card-template");
  return newCard;
}

// Render New Card
function renderCard(cardData, wrapper) {
  const card = createCard(cardData);
  wrapper.prepend(card.getView());
}

// Open And Close Modal__________________________________
function openModal(modal) {
  modal.classList.add("modal__open");
  document.addEventListener("keydown", closeModalEscKey);
  modal.addEventListener("mousedown", closeModalClick);
}

function closeModal(modal) {
  modal.classList.remove("modal__open");
  document.removeEventListener("keydown", closeModalEscKey);
  modal.removeEventListener("mousedown", closeModalClick);
}

export { openModal };

/* ------------------------ EVENT HANDLERS ------------------------ */

// Open Edit Profile Card Modal
function handleProfileEditOpen() {
  openModal(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editFormValidator.resetForm();
}

// Hydrate Profile Title And Description And Close Edit Profile Modal
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

// Hydrate New Card Name And Link, Render Card, Close Edit Profile Modal
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardURLInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  addCardModalForm.reset();
}

// Close Modals
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// Close Modal With ESC Key And Mouse Click_______________
function closeModalEscKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal__open");
    closeModal(openModal);
  }
}

function closeModalClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

/* ------------------------ EVENT LISTENERS ------------------------ */

// Open Edit Profile Modal
profileEditButton.addEventListener("click", handleProfileEditOpen);

// Replace Profile Text
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//  Open Add Card Modal
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
  addCardModalForm.reset();
  addFormValidator.resetForm();
});

//  Submit Add Card
addCardModalForm.addEventListener("submit", handleAddCardSubmit);

// Close Preview Image Modal
previewImageModalClose.addEventListener("click", () => {
  closeModal(previewImageModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

editFormValidator.enableValidation();
addFormValidator.enableValidation();
