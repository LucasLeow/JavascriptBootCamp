import View from './View';
import icons from 'url:../../img/icons.svg'; // for parcel 2, static content need to include 'url:'

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it.';
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(searchResult) {
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
           <a class="preview__link ${
             searchResult.id === id ? 'preview__link--active' : ''
           }" href="#${searchResult.id}">
           <figure class="preview__fig">
               <img src="${searchResult.imageUrl}" alt="${
      searchResult.title
    }" />
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

export default new BookmarksView(); // dont allow controller to create new class instances
