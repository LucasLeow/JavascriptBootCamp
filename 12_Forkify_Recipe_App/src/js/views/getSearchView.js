// This class will not render any view. It will just provide the input on search bar
// Good to have separation of roles even if for small functionality like this
class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    return this._parentElement.querySelector('.search__field').value;
  }

  clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  handleSearch(handlerFn) {
    this._parentElement.addEventListener('submit', function (ev) {
      ev.preventDefault(); // prevent reload on submit
      handlerFn();
    });
  }
}

export default new SearchView();
