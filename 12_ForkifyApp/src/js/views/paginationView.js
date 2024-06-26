import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _nextPage(curPage) {
    return `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;
  }

  _prevPage(curPage) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
     <span>Page ${curPage - 1}</span>
    </button>
`;
  }

  addHandlerClick(handlerFn) {
    this._parentElement.addEventListener('click', function (ev) {
      const btn = ev.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto; // + sign to convert dtype to Number

      handlerFn(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // on Page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._nextPage(curPage);
    }
    // on Last page
    if (curPage === numPages && numPages > 1) {
      return this._prevPage(curPage);
    }

    // on other page
    if (curPage < numPages) {
      return this._nextPage(curPage) + this._prevPage(curPage);
    }

    // on Page 1, no other pages
    return '';
  }
}

export default new PaginationView();
