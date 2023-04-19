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

/* -------------------------------- VARIABLES ------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalClose = profileEditModal.querySelector(
  "#profile-modal-close"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardsWrap = document.querySelector(".card__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Add Card

const addCardButton = document.querySelector("#add-card-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalClose = addCardModal.querySelector("#add-card-modal-close");

const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardURLInput = document.querySelector("#add-card-modal-URL");

const addCardModalForm = addCardModal.querySelector(".modal__form");

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalClose = document.querySelector("#preview-modal-close");
const cardPreviewTitle = document.querySelector("#card-preview-title");
const previewImage = document.querySelector("#card-preview-image");

/* -------------------------------- FUNCTIONS ------------------------------- */

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function closeModal() {
  profileEditModal.classList.remove("modal_opened");
  addCardModal.classList.remove("modal_opened");
  previewImageModal.classList.remove("modal_opened");
}
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  const deleteCard = cardElement.querySelector(".card__delete-button");
  deleteCard.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    previewImageModal.classList.add("modal_opened");
    previewImage.src = cardImageElement.src;
    cardPreviewTitle.textContent = cardTitleElement.textContent;
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  return cardElement;
}

/* ----------------------------- EVENT HANDLERS ----------------------------- */

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal();
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardURLInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal();
}

/* ----------------------------- EVENT LISTENERS ---------------------------- */

// Edit Profile
profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileModalClose.addEventListener("click", closeModal);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//  Add Card
addCardButton.addEventListener("click", () => {
  addCardModal.classList.add("modal_opened");
});

addCardModalClose.addEventListener("click", closeModal);
addCardModalForm.addEventListener("submit", handleAddCardSubmit);

addCardModalClose.addEventListener("click", closeModal);
previewImageModalClose.addEventListener("click", closeModal);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
