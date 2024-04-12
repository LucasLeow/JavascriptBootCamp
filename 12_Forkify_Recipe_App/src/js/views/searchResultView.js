import View from './View';

import icons from 'url:../../img/icons.svg'; // for parcel 2, static content need to include 'url:'

class SearchResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query! Please try again.';
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(searchResult) {
    return `
    <li class="preview">
       <a class="preview__link" href="#${searchResult.id}">
       <figure class="preview__fig">
           <img src="${searchResult.imageUrl}" alt="${searchResult.title}" />
       </figure>
       <div class="preview__data">
           <h4 class="preview__title">${searchResult.title}</h4>
           <p class="preview__publisher">${searchResult.publisher}</p>
           
       </div>
       </a>
   </li>
 `;
  }
}

export default new SearchResultView();
