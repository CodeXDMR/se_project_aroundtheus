/* --------------------- IMPORT CLASSES --------------------- */
import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
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

// Find Profile and Add Card buttons.
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#add-card-button");

// Find edit form input elements.
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//  Find form elements.
const profileEditForm = document.forms["edit-card-form"];
const addCardModalForm = document.forms["add-card-form"];

/* ------------------- Form Validation -------------------- */

const addFormValidator = new FormValidator(config, addCardModalForm);
const editFormValidator = new FormValidator(config, profileEditForm);

/* --------------------- Card Handler --------------------- */

let cardSection;

// Create image Popup instance.
const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

// This function creates a new card
function createCard(cardData) {
  const cardElement = new Card(
    {
      cardData,
      handleImageClick: (imageData) => {
        cardPreviewPopup.open(imageData);
      },
    },
    selectors.cardTemplate
  );

  return cardElement.getView();
}

// Create a section of cards
api.getInitialCards().then((cardData) => {
  const cardSection = new Section(
    {
      items: cardData,
      renderer: (cardData) => {
        // Create a new card
        const cardElement = createCard(cardData);

        // Display each card
        cardSection.addItem(cardElement);
      },
    },
    selectors.cardsList
  );
  cardSection.renderItems();
});

/* ------------------- Profile Info ------------------- */

const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  jobSelector: selectors.profileProfession,
});

// api.getUserInfo().then((userData) => console.log(userData));

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    description: userData.about,
  });
});

/* --------------------- Edit Card -------------------- */

// Create the edit form instance
const editFormPopup = new PopupWithForm(
  selectors.editFormPopup,
  ({ name, description }) => {
    // Add the form's input to the profile section
    userInfo.setUserInfo({ name, description });
  }
);

// Open the modal when users click on the edit button
profileEditButton.addEventListener("click", () => {
  // Get profile info and add to the form fields
  const profileInfo = userInfo.getUserInfo();

  // Add the profile info on the page to the form's fields
  profileTitleInput.value = profileInfo.name;
  profileDescriptionInput.value = profileInfo.description;

  // Open modal
  editFormPopup.open();
  editFormValidator.resetForm();
});

// Set edit form event listeners
editFormPopup.setEventListeners();

/* ------------------- Add Card ------------------- */

const addFormPopup = new PopupWithForm(selectors.addFormPopup, (formData) => {
  api.addCard(formData).then((res) => console.log(res));

  // Create a new card
  const newCard = createCard(formData);
  console.log(formData);
  // Add the new card to the section
  cardSection.addItem(newCard);
});
// Open the modal when users click on the add button
addCardButton.addEventListener("click", () => {
  // Open the add card form
  addFormPopup.open();
  // Reset validation for the add card form
  addFormValidator.resetForm();
});

// Set add form event listeners
addFormPopup.setEventListeners();

/* ------------------- Enable Validation ------------------- */

addFormValidator.enableValidation();
editFormValidator.enableValidation();
