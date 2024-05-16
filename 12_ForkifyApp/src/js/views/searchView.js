class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }

  #clearSearch() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handlerFn) {
    // listen to entire form, so press enter key also registered as submit
    this.#parentElement.addEventListener('submit', ev => {
      ev.preventDefault(); // prevent default of form submission
      handlerFn(); // controlSearchResult() passed from controller
      this.#clearSearch();
    });
  }
}

export default new SearchView();
