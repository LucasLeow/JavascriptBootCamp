// This class will not render any view. It will just provide the input on search bar
// Good to have separation of roles even if for small functionality like this
class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    return this.#parentEl.querySelector('.search__field').value;
  }

  handleSearch(handlerFn) {
    this.#parentEl.addEventListener('submit', function (ev) {
      ev.preventDefault(); // prevent reload on submit
      handlerFn();
    });
  }
}

export default new SearchView();
