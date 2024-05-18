import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // guard clause if no id

    recipeView.renderSpinner();

    // Update results view to mark active results if recipe on active view
    resultsView.update(model.getSearchResultsPageData());

    // Loading Recipe
    await model.loadRecipe(id); // no need to store results in variable, "state" in model updated

    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err); // error received from model
    recipeView.renderError(); // error passed to view to show user on front-end
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return; // guard clause if no query in search bar

    await model.loadSearchResult(query); // don't need to save to variable becuz this updates the model state directly

    // render results view after loading data to model
    resultsView.render(model.getSearchResultsPageData()); // getSearchResults

    // render pagination button after rendering results
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err); // error received from model
    // searchView.renderError() // error passed to view to show error to user
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPageData(goToPage)); // render new results
  paginationView.render(model.state.search); // update pagination buttons
};

const controlServings = function (newServings) {
  // Update recipe servings in model.state
  model.updateServings(newServings);

  // Update recipe view to show latest ingredients
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
