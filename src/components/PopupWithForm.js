import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._button = this._popupElement.querySelector(".modal__button");
    this._handleFormSubmit = handleFormSubmit;
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
      this.close();
    });
  }

  open() {
    super.open();
    this._button.textContent = "Save";
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;

// index.js
// const newCardPopup = new PopupWithForm("#add-card-modal", () => {});
// newCardPopup.open();

// newCardPopup.close();
