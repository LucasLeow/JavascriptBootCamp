import icons from 'url:../../img/icons.svg'; // for parcel 2, static content need to include 'url:'

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
