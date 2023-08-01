class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal__open");
    this.addEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal__open");
    this.removeEventListeners();
  }

  _handleClickClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  addEventListeners() {
    // Closes modal window via close button.
    const closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("click", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);
  }

  removeEventListeners() {
    this._popupElement.removeEventListener("click", this._handleClickClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
export default Popup;
