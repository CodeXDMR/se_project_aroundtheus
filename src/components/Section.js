class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    // Renders all elements on the page
    this._renderedItems.reverse().forEach(this._renderer);
  }

  addItem(element) {
    // Adds the DOM element to the container
    this._container.prepend(element);
  }
}

export default Section;
