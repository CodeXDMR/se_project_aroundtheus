// const initialCards = [
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },
//   {
//     name: "Yosemite Valley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },
// ];

const selectors = {
  cardTemplate: "#card-template",
  cardsList: "#cards-list",

  editAvatFormModal: "#profile-avatar-modal",
  editProfFormModal: "#profile-edit-modal",
  addCardFormModal: "#add-card-modal",
  delCardConfirmModal: "#delete-card-modal",
  previewImageModal: "#preview-image-modal",

  profAvatar: "#profile-avatar",
  profName: "#profile-name",
  profAbout: "#profile-about",

  formModalContainer: ".modal__container",
  imageModalContainer: ".modal__popup",
  formInputName: "#name",
  formInputAbout: "#profession",
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-submit",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input_error",
};

export { selectors, config };
