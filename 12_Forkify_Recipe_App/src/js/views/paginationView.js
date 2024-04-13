import View from './View';
import icons from 'url:../../img/icons.svg'; // for parcel 2, static content need to include 'url:'

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerButtonClick(handlerFn) {
    // attach to parent since there are 2 btns (next, prev) (event delegation)
    this._parentElement.addEventListener('click', function (ev) {
      const btn = ev.target.closest('.btn--inline'); // check for closest inline btn element clicked
      if (!btn) return; // surrounding area within parent clicked

      const goToPage = Number(btn.dataset.goto);
      handlerFn(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const totalPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, other pages
    if (curPage === 1 && totalPages > 1) {
      return this._renderNextPageButton(curPage);
    }

    // Last Page
    if (curPage === totalPages && totalPages > 1) {
      return this._renderPrevPageButton(curPage);
    }

    // Interrim Pages
    if (curPage < totalPages) {
      return (
        this._renderNextPageButton(curPage) +
        this._renderPrevPageButton(curPage)
      );
    }

    // Page 1, no other pages
    return ``; // no need to render any buttons
  }

  _renderNextPageButton(curPage) {
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

  _renderPrevPageButton(curPage) {
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
}

export default new PaginationView();
