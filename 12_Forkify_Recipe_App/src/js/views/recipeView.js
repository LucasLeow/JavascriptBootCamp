import icons from 'url:../../img/icons.svg'; // for parcel 2, static content need to include 'url:'
import { Fraction } from 'fractional';

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;
  #errorMessage = 'Could not find recipe! Please try searching for another.';
  #message = 'Start by searching for a recipe or an ingredient. Have fun!';

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this.#parentElement.innerHTML = ''; // clear any existing placeholder content
  }

  renderSpinner = function () {
    const spinnerMarkup = `
       <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> 
      `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  };

  renderError(msg = this.#errorMessage) {
    const errorMarkup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}</p>
        </div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', errorMarkup);
  }

  renderMessage(msg = this.#message) {
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

  #generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src="${this.#data.imageUrl}" alt="image of ${
      this.#data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this.#data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this.#data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this.#data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this.#data.ingredients
      .map(ing_obj => this.#generateIngredientsMarkup(ing_obj))
      .join('')}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this.#data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this.#data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
`;
  }

  renderRecipeView(handlerFn) {
    // on initial page load, fetch recipe
    // watch for hashchange in url, signifying change in recipe fetch id
    ['load', 'hashchange'].forEach(evt =>
      window.addEventListener(evt, handlerFn)
    );
  }

  #generateIngredientsMarkup(ing_obj) {
    return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            ing_obj.quantity ? new Fraction(ing_obj.quantity).toString() : ''
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing_obj.unit}</span>
            ${ing_obj.description}
          </div>
      </li>
    `;
  }
}

export default new RecipeView(); // dont allow controller to create new class instances
