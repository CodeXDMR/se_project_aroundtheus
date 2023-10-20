class Card {
  constructor(
    { name, link, likes, owner, _id },
    cardSelector,
    handleImageClick,
    handleDeleteCardPopup,
    handleLikeClick,
    userID,
    cardElement,
    cardDeleteButton,
    cardImage,
    cardTitle,
    likeCounter
  ) {
    this._cardId = _id;
    this._cardDeleteButton = cardDeleteButton;
    this._cardElement = cardElement;
    this._cardImage = cardImage;
    this._cardOwnerID = owner._id;
    this._cardSelector = cardSelector;
    this._cardTitle = cardTitle;
    this._handleImageClick = handleImageClick;
    this._imageLink = link;
    this._imageName = name;
    this._handleDeleteCardPopup = handleDeleteCardPopup;
    this._handleLikeClick = handleLikeClick;
    this._likeCounter = likeCounter;
    this._likes = likes;
    this._userID = userID;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );
    this._cardDeleteButton.addEventListener("click", () =>
      this._handleDeleteCardPopup(this)
    );

    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({ link: this._imageLink, name: this._imageName })
    );
    this._fillCardTemplate();
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector("#cards-template-list")
      .cloneNode(true);
  }

  _fillCardTemplate() {
    this._cardImage.alt = this._profName;
    this._cardImage.src = this._imageLink;
    this._cardElement.id = this._userID;
    this._cardTitle.textContent = this._imageName;
    this._renderLikes();
    if (this._userID !== this._cardOwnerID) {
      this._cardDeleteButton.remove();
    }
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userID);
  }
  setLikes(numOfLikes) {
    this._likes = numOfLikes;
    this._renderLikes();
  }

  _renderLikes() {
    this._likeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeCounter = this._cardElement.querySelector("#card-like-counter");
    this._likeButton = this._cardElement.querySelector("#card-like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      "#card-delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
