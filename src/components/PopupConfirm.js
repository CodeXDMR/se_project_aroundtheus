import PopupWithForm from "./PopupWithForm.js";

class PopupConfirm extends PopupWithForm {
  constructor(popupSelector, handleFormSubmit, buttonText, loadingButtonText) {
    super(popupSelector, handleFormSubmit, buttonText, loadingButtonText);
  }

  open(data) {
    super.open();
    this.data = data._cardId;
    console.log(data._cardId);
  }

  // close() {
  //   super.close();
  // }

  // setEventListeners() {
  //   this._popupForm.addEventListener("submit", (event) => {
  //     event.preventDefault();
  //     this._handleSubmit();
  //     this.close();
  //   });
  // }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  // _handleSubmit() {
  //   const inputValues = this.data;
  //   this._handleFormSubmit(inputValues);
  // }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    const inputValues = this.data;
    this._handleFormSubmit(inputValues);
    console.log("This worked!");
  };
}

export default PopupConfirm;
