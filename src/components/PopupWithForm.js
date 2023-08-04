import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, buttonText, loadingButtonText) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._button = this._popupElement.querySelector(".modal__button-submit");
    this._handleFormSubmit = handleFormSubmit;
    this._buttonText = buttonText;
    this._loadingButtonText = loadingButtonText;
  }

  showLoading() {
    this._button.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._button.textContent = this._buttonText;
  }

  _getInputValues() {
    const inputList = Array.from(
      this._popupElement.querySelectorAll(".modal__input")
    );
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._popupForm.reset();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
  }
}

export default PopupWithForm;
