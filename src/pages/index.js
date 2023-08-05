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
const addCardButton = document.querySelector("#profile-add-card-button");

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
editAvatPopup.setEventListeners();
function handleAvatarSubmit(imageData) {
  editAvatPopup.showLoading();
  api
    .setAvatarAPI(imageData.avatURL)
    .then((res) => {
      userInfo.setAvatar(imageData.avatURL);
    })
    .then(() => {
      editAvatPopup.close();
    })
    .catch((err) => {
      alert("Unexpected error, please try again.");
      console.error("There was an error -", err);
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

/* ------------------- Profile Info ------------------- */

const userInfo = new UserInfo({
  profAvatarSelector: selectors.profAvatar,
  profNameSelector: selectors.profName,
  profAboutSelector: selectors.profAbout,
});

const editProfInfo = new PopupWithForm(
  selectors.editProfFormModal,
  handleProfEditSubmit,
  "Save",
  "Saving..."
);
editProfInfo.setEventListeners();
function handleProfEditSubmit({ name, about }) {
  editProfInfo.showLoading();
  api
    .setProfileInfoAPI(name, about)
    .then((dataAPI) => {
      userInfo.setProfileInfo({
        name: name,
        about: about,
      });
    })
    .then(() => {
      editProfInfo.close();
    })
    .catch((err) => {
      alert("Unexpected error, please try again.");
      console.error("There was an error -", err);
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
});

/* -------------------Create Initial Cards --------------------- */

// Receives card data(cardData) from API and renders data to cards.
api
  .getInfoAPI()
  .then(([cardData, userData]) => {
    cardSection = new Section(
      {
        items: cardData,
        renderer: (cardData) => {
          // Renders a new card
          const cardElement = createCard(cardData, userData._id);

          // Adds each rendered card to the DOM.
          cardSection.addItem(cardElement);
        },
      },
      selectors.cardsList
    );

    // Renders each card via Section.js to the DOM.
    cardSection.renderItems();
    userInfo.setProfileInfo(userData);
    userInfo.setAvatar(userData.avatar);
  })
  .catch((err) => {
    alert("Unexpected error, please try again.");
    console.error("There was an error -", err);
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
addCardFormModal.setEventListeners();
function handleAddCardSubmit({ name, link }) {
  addCardFormModal.showLoading();
  api
    .addCardAPI({ name, link })
    .then((card) => {
      // Create a new card
      const newCard = createCard(card, card.owner._id, card._id);
      // Add the new card to the section
      cardSection.addItem(newCard);
    })
    .then(() => {
      addCardFormModal.close();
    })
    .catch((err) => {
      alert("Unexpected error, please try again.");
      console.error("There was an error -", err);
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

/* ----------------- Delete Card ----------------- */

const deleteCardModal = new PopupConfirm(
  selectors.delCardConfirmModal,
  handleDeleteCardPopup,
  "Yes",
  "Deleting..."
);
deleteCardModal.setEventListeners();
function handleDeleteCardPopup(card) {
  deleteCardModal.open();
  deleteCardModal.setSubmitAction(() => {
    deleteCardModal.showLoading();
    api
      .deleteCardAPI(card._cardId)
      .then((res) => {
        card.deleteCard();
      })
      .then(() => {
        deleteCardModal.close();
      })
      .catch((err) => {
        alert("Unexpected error, please try again.");
        console.error("There was an error -", err);
      })
      .finally(() => {
        deleteCardModal.hideLoading();
      });
  });
}

/* ------------------- Likes ------------------- */

function handleLikeClick(card) {
  if (card.isLiked()) {
    api
      .removeLikeAPI(card._cardId)
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => {
        alert("Unexpected error, please try again.");
        console.error("There was an error -", err);
      });
  } else {
    api
      .addLikeAPI(card._cardId)
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => {
        alert("Unexpected error, please try again.");
        console.error("There was an error -", err);
      });
  }
}

/* ------------------- Enable Validation ------------------- */

addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatEditFormValidator.enableValidation();
