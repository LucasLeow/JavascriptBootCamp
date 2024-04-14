import icons from 'url:../../img/icons.svg'; // for parcel 2, static content need to include 'url:'

export default class View {
  _data;

  // render entire page view
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // update view for only changed data instead of re-rendering entire page
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;

    // generateMarkup returns HTML string with updated data
    const newMarkup = this._generateMarkup();

    // converts HTML string to DOM Node for ease of comparison
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // get cur DOM & compare with new DOM + convert Nodelist to Array
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    newElements.forEach((newElement, idx) => {
      const curElement = curElements[idx];
      // firstChild of element is the text node & nodeValue will return text value if its not null
      // update change text
      if (
        !newElement.isEqualNode(curElement) &&
        newElement.firstChild.nodeValue?.trim() !== ''
      ) {
        curElement.textContent = newElement.textContent;
      }

      // update change attribute (data-attribute to correctly show number of servings)
      if (!newElement.isEqualNode(curElement)) {
        Array.from(newElement.attributes).forEach(attribute =>
          curElement.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = ''; // clear any existing placeholder content
  }

  renderSpinner = function () {
    const spinnerMarkup = `
       <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> 
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  };

  renderError(msg = this._errorMessage) {
    const errorMarkup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', errorMarkup);
  }

  renderMessage(msg = this._message) {
    const messageMarkup = `
        <div class="message">
            <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
            </div>
            <p>${msg}</p>
    </div>
    `;
  }
}
