class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal__open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal__open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });

    // Closes modal window via close button.
    const closeButton = this._popupElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
export default Popup;
