// import { openModal } from "../utils/utils.js";

// const previewImageModal = document.querySelector("#preview-image-modal");
// const modalImage = previewImageModal.querySelector(".modal__preview-image");
// const modalCaption = previewImageModal.querySelector(".modal__preview-title");

export default class Card {
  constructor({ cardData, handleImageClick }, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__list-item")
      .cloneNode(true);
  }

  _fillCardData() {
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({ link: this._link, name: this._name })
    );
    // this._cardImage.addEventListener("click", () =>
    //   this._handlePreviewPicture()
    // );
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // _handlePreviewPicture() {
  //   openModal(previewImageModal);
  //   modalImage.src = this._cardImage.src;
  //   modalImage.alt = this._cardImage.alt;
  //   modalCaption.textContent = this._cardTitle.textContent;
  // }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");

    this._cardTitle = this._cardElement.querySelector(".card__title");

    this._fillCardData();

    this._setEventListeners();

    return this._cardElement;
  }
}
