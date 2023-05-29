export default class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  testMethod() {
    console.log(this._name);
  }

  _setEventListeners() {
    console.log(this._cardElement);
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLikeIcon);
    // const deleteButton = this._cardElement
    //   .querySelector(".card__delete-button")
    //   .addEventListener("click", () => {
    //     this._handleDeleteCard();
    //   });
  }

  _handleLikeIcon() {
    // console.log(this);
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  // _handlePreviewPicture() {}

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__list-item")
      .cloneNode(true);
  }

  getView() {
    // get the card view
    this._cardElement = this._getTemplate();
    // alert("hello");
    // set event listeners
    this._setEventListeners();
    // return the card
    console.log(this._getTemplate());

    // return Card;
  }
}
