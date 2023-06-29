/* --------------------- IMPORT CLASSES --------------------- */
import "./index.css";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards, selectors, config } from "../utils/constants.js";

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
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      // Create a new card
      const cardElement = createCard(cardData);

      // Display each card
      cardSection.addItem(cardElement);
    },
  },
  selectors.cardsList
);
cardSection.renderItems(initialCards);

/* ------------------- Profile Info ------------------- */

const userInfo = new UserInfo(
  selectors.profileName,
  selectors.profileProfession
);
/* --------------------- Edit Card -------------------- */

// Create the edit form instance
const editFormPopup = new PopupWithForm(selectors.editFormPopup, (values) => {
  // Add the form's input to the profile section
  userInfo.setUserInfo(values.name, values.description);
});

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
  // Create a new card
  const newCard = createCard(formData);

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
