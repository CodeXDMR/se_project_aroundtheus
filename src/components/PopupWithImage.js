import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._imageCaption = this._popupElement.querySelector(
      ".modal__preview-title"
    );

    super.setEventListeners();
  }

  open(imageData) {
    this._imageElement.src = imageData.link;
    this._imageElement.alt = `Image ${imageData.name}`;
    this._imageCaption.textContent = imageData.name;
    super.open();
  }
}

export default PopupWithImage;
