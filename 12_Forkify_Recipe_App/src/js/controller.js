import 'regenerator-runtime/runtime';
import 'core-js/stable';

import recipeView from './views/recipeView';
import searchResultView from './views/searchResultView';
import getSearchView from './views/getSearchView';
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
    searchResultView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.renderRecipeView(showRecipe);
  getSearchView.handleSearch(showSearchResults);
};

init();
