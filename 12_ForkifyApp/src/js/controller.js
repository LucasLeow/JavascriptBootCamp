import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // guard clause if no id

    recipeView.renderSpinner();
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
    console.log(model.state.search.results);

    // render results view after loading data to model
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err); // error received from model
    // searchView.renderError() // error passed to view to show error to user
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
