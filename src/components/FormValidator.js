export default class FormValidator {
  constructor(config, formEl) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = formEl;

    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputEl) {
    // Generate error for target element
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    // Add input error to input element class list
    inputEl.classList.add(this._inputErrorClass);
    // Change error message text
    errorMessageEl.textContent = inputEl.validationMessage;
    // Add error message to class list.
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _toggleInputError(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  // Check if the input element is invalid
  // _checkValidity(inputElement) {
  //   return !inputElement.validity.valid;
  // }

  _hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  // _hasInvalidInput = () =>
  //   Array.from(this._inputList).some(this._checkValidity);

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        this._toggleInputError(inputEl);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetForm() {
    this._disableButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
