import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(newData) {
    if (!newData || (Array.isArray(newData) && newData.length === 0))
      return this.renderError();

    this._data = newData;
    const newMarkup = this._generateMarkup();

    // convert markup string to DOM obj to use DOM compare method
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // Get all elements from DOMs for comparison, convert from Nodelist to Array to use loop method
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update to change Text node
      if (
        !newEl.isEqualNode(curEl) && // only want to change Text nodes, not entire node
        newEl.firstChild?.nodeValue.trim() !== '' // Text is always firstChild in nodes, nodeValue returns null for most except for Text,
        // ?. optional chaining since firstChild not always exist
      ) {
        curEl.textContent = newEl.textContent; // updates entire element node, but only for Text nodes due to above check
      }

      // Update to change attributes
      if (!newEl.isEqualNode(curEl)) {
        // each elementNode have Nodelist of attributes, convert to Array then setAttribute
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear(); // clear existing content
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(msg = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${msg}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(msg = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${msg}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
