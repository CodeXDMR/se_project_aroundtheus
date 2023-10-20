import PopupWithForm from "./PopupWithForm.js";

class PopupConfirm extends PopupWithForm {
  constructor(popupSelector, buttonText, handleFormSubmit, loadingButtonText) {
    super(popupSelector, buttonText, handleFormSubmit, loadingButtonText);
    this._loadingButtonText = loadingButtonText;
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }
}

export default PopupConfirm;
