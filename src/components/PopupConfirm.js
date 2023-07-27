import PopupWithForm from "./PopupWithForm.js";

class PopupConfirm extends PopupWithForm {
  constructor(popupSelector, handleFormSubmit, buttonText, loadingButtonText) {
    super(popupSelector, handleFormSubmit, buttonText, loadingButtonText);
  }

  open(data) {
    super.open();
    this.data = data;
    // console.log(card.cardID, card);
  }

  close() {
    super.close();
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  _handleSubmit = () => {
    const inputValues = this.data;
    this._handleFormSubmit(inputValues);
  };
}

export default PopupConfirm;
