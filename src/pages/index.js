/* --------------------- IMPORT CLASSES --------------------- */
import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirm from "../components/PopupConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { selectors, config } from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "0d34a92c-1da7-4adc-abc0-e2b3b38a4b1f",
    "Content-Type": "application/json",
  },
});

// Find buttons.
const editAvatButton = document.querySelector("#profile-avatar-container");
const editProfButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#add-card-button");

// Find edit form input elements.
const profNameInput = document.querySelector("#profile-title-input");
const profAboutInput = document.querySelector("#profile-about-input");

//  Find form elements.
const profEditForm = document.forms["edit-card-form"];
const addCardForm = document.forms["add-card-form"];
const avatEditForm = document.forms["avatar-edit-form"];

/* ------------------- Form Validation -------------------- */

const addFormValidator = new FormValidator(config, addCardForm);
const editFormValidator = new FormValidator(config, profEditForm);
const avatEditFormValidator = new FormValidator(config, avatEditForm);

/* --------------------- Card Handler --------------------- */

let cardSection;
let card;

/* --------------- Edit Avatar Card --------------- */

// Edit profile Avatar thumbnail imageData {avatURL}
const editAvatPopup = new PopupWithForm(
  selectors.editAvatFormModal,
  handleAvatarSubmit,
  "Save",
  "Saving..."
);

function handleAvatarSubmit(imageData) {
  editAvatPopup.showLoading();
  api
    .setAvatarAPI(imageData.avatURL)
    .then((res) => {
      userInfo.setAvatar(imageData.avatURL);
      editAvatPopup.close();
    })
    .finally(() => {
      editAvatPopup.hideLoading();
    });
}

editAvatButton.addEventListener("click", () => {
  // Open the avatar edit modal form
  editAvatPopup.open();
  // Reset validation for the avatar edit modal form
  avatEditFormValidator.resetForm();
});

editAvatPopup.setEventListeners();

/* ------------------- Profile Info ------------------- */

const userInfo = new UserInfo({
  profNameSelector: selectors.profName,
  profAboutSelector: selectors.profAbout,
  profAvatarSelector: selectors.profAvatar,
});

const editProfInfo = new PopupWithForm(
  selectors.editProfFormModal,
  handleProfEditSubmit,
  "Save",
  "Saving..."
);

function handleProfEditSubmit({ name, about }) {
  editProfInfo.showLoading();
  api
    .setProfileInfoAPI(name, about)
    .then((dataAPI) => {
      userInfo.setProfileInfo({
        name: name,
        about: about,
      });

      editProfInfo.close();
    })
    .finally(() => {
      editProfInfo.hideLoading();
    });
}

editProfButton.addEventListener("click", () => {
  // Open the avatar edit modal form
  editProfInfo.open();

  // Add the profile info from the page to the form's fields
  const profInfo = userInfo.getProfileInfo();
  profNameInput.value = profInfo.name;
  profAboutInput.value = profInfo.about;

  // Reset validation for the avatar edit modal form
  editFormValidator.resetForm();
});

editProfInfo.setEventListeners();

/* -------------------Create Initial Cards --------------------- */

// Receives card data(cardData) from API and renders data to cards.
api.getInfoAPI().then(([cardData, userData]) => {
  cardSection = new Section(
    {
      items: cardData,
      renderer: (cardData) => {
        // Renders a new card
        const cardList = createCard(cardData, userData._id);

        // Filters delete button access based on matching user ID.
        const userID = userData._id;
        const cardOwnerID = cardData.owner._id;

        if (userID !== cardOwnerID) {
          card._removeDeleteButton();
        }
        // Adds each rendered card to the DOM.
        cardSection.addItem(cardList);
      },
    },
    selectors.cardsList
  );

  // Renders each card via Section.js to the DOM.
  cardSection.renderItems();
  const name = userData.name;
  const about = userData.about;
  userInfo.setProfileInfo({ name, about });
  userInfo.setAvatar(userData.avatar);
});

/* -------------------Create Card Handler --------------------- */

// This function creates a new card
// cardData = API data { name, link, likes, owner, _id } from card.
// userID = API data ID from profile user.
function createCard(cardData, userID) {
  const cardSelector = selectors.cardTemplate;

  card = new Card(
    cardData,
    cardSelector,
    handleImageClick,
    handleDeleteCardPopup,
    handleLikeClick,
    userID
  );

  return card.getView();
}
/* ------------------- Preview Popup ------------------- */

// Create image Popup instance.
const cardPrevPopup = new PopupWithImage(selectors.previewImageModal);

// imageData = {link:, name:}
function handleImageClick(imageData) {
  cardPrevPopup.open(imageData);
}

/* ------------------- Add Card ------------------- */

const addCardFormModal = new PopupWithForm(
  selectors.addCardFormModal,
  handleAddCardSubmit,
  "Create",
  "Creating..."
);

function handleAddCardSubmit({ name, link }) {
  addCardFormModal.showLoading();
  api
    .addCardAPI({ name, link })
    .then((card) => {
      // Create a new card
      const newCard = createCard(card, card.owner._id, card._id);
      // Add the new card to the section
      cardSection.addItem(newCard);
      addCardFormModal.close();
    })
    .finally(() => {
      addCardFormModal.hideLoading();
    });
}
// Open the modal when users click on the add button
addCardButton.addEventListener("click", () => {
  // Open the add card form
  addCardFormModal.open();
  // Reset validation for the add card form
  addFormValidator.resetForm();
});

// Set add form event listeners
addCardFormModal.setEventListeners();

/* ----------------- Delete Card ----------------- */

const deleteCardModal = new PopupConfirm(
  selectors.delCardConfirmModal,
  handleDeleteCardPopup,
  "Yes",
  "Deleting..."
);

function handleDeleteCardPopup(card) {
  deleteCardModal.open();
  deleteCardModal.setSubmitAction(() => {
    deleteCardModal.showLoading();
    api
      .deleteCardAPI(card._cardId)
      .then((res) => {
        card.removeDeleteCard(this);
        deleteCardModal.close();
      })
      .finally(() => {
        deleteCardModal.hideLoading();
      });
  });
}

deleteCardModal.setEventListeners();

/* ------------------- Likes ------------------- */

function handleLikeClick(card) {
  if (card.isLiked()) {
    api.removeLikeAPI(card._cardId).then((res) => {
      card.setLikes(res.likes);
    });
  } else {
    api.addLikeAPI(card._cardId).then((res) => {
      card.setLikes(res.likes);
    });
  }
}

/* ------------------- Enable Validation ------------------- */

addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatEditFormValidator.enableValidation();
