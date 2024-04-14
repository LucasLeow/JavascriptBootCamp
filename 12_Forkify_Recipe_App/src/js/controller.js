import 'regenerator-runtime/runtime';
import 'core-js/stable';

import recipeView from './views/recipeView';
import searchResultView from './views/searchResultView';
import getSearchView from './views/getSearchView';
import paginationView from './views/paginationView';
import * as model from './model';

// parcel functionality
if (module.hot) {
  module.hot.accept();
}

const showRecipe = async function () {
  try {
    const recipe_hash = window.location.hash.slice(1); // get hash id from url
    if (!recipe_hash) return; // if no recipe hash in url
    recipeView.renderSpinner();

    // 1) Load recipe (does not return anything. instead, updates the model.state obj)
    await model.loadRecipe(recipe_hash);

    // 2) Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const showSearchResults = async function () {
  try {
    const query = getSearchView.getQuery();
    getSearchView.clearInput();
    if (!query) return;
    searchResultView.renderSpinner();

    // 1) loadSearchResult does not return anything. Instead, updates model.state.search obj to contain search results
    await model.loadSearchResult(query); // load _data to view

    // 2) Render Search Result
    searchResultView.render(model.getSearchResultsPage());

    // 3) Render Pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  model.state.search.page = goToPage;
  searchResultView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlUpdateServings = function (newServings) {
  model.updateServings(newServings);
  // Update recipe servings (in state)

  // Update recipe view
  // recipeView.render(model.state.recipe); // dont want to re-render entire page
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.renderRecipeView(showRecipe);
  recipeView.addHandlerUpdateServings(controlUpdateServings);

  getSearchView.handleSearch(showSearchResults);
  paginationView.addHandlerButtonClick(controlPagination);
};

init();
