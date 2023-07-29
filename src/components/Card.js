class Card {
  constructor(
    { name, link, likes, owner, _id },
    cardSelector,
    handleImageClick,
    handleDeleteCardPopup,
    handleLikeClick,
    userID
  ) {
    this._imageName = name;
    this._imageLink = link;
    this._likes = likes;
    this._cardOwnerID = owner._id;
    this._cardId = _id;
    this._userID = userID;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCardPopup = handleDeleteCardPopup;
    this._handleLikeClick = handleLikeClick;
    // console.log(this._cardOwnerID);
    // console.log(this._cardOwnerID);
    // console.log(this._cardId);
  }

  getMyID() {
    console.log(this.__userID);
    return this._userID;
  }

  setMyID({ userID }) {
    this._userID = userID;
    console.log(userID);
  }
  // _getData() {
  //   const cardToPass = this;
  //   const data = {
  //     name: this.name,
  //     link: this.link,
  //     imageId: this.imageID,
  //     card: cardToPass,
  //   };
  //   return data;
  // }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector("#cards-template-list")
      .cloneNode(true);
  }

  _fillCardData() {
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.alt = this._profName;
    this._cardImage.src = this._imageLink;
    this._cardTitle.textContent = this._imageName;
    this._cardElement.id = this.imageID;

    if (this._userID === this._cardOwnerID) {
      this._cardElement.querySelector(".card__delete-button").remove();
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    this._cardDeleteButton.addEventListener("click", () =>
      this.handleDeleteCard(this)
    );

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick({ link: this._imageLink, name: this._imageName })
    );

    // Filters delete button on the card list.
    if (this._userID !== this._cardOwnerID) {
      this._cardElement
        .querySelector(".card__delete-button")
        .addEventListener("click", () => {
          this._handleDeleteCardPopup(this);
        });
    }
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // setLikes(numOfLikes) {
  //   this._likes = numOfLikes;
  //   this._renderLikes();
  // }

  // _renderLikes() {
  //   this._cardElement.querySelector(".card__like-count").textContent =
  //     this._likes.length;

  //   const cardLikeButton =
  //     this._cardElement.querySelector(".card__like-button");

  //   if (this.isLiked()) {
  //     cardLikeButton.classList.add("card__like-button_active");
  //   } else {
  //     cardLikeButton.classList.remove("card__like-button_active");
  //   }
  // }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector("#card-like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      "#card-delete-button"
    );
    this._cardTitle = this._cardElement.querySelector(".card__title");

    this._fillCardData();
    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
