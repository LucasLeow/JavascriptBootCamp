import 'regenerator-runtime/runtime';
import 'core-js/stable';

import * as model from './model';
import recipeView from './views/recipeView';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
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
    alert(err);
  }
};

showRecipe();

// on initial page load, fetch recipe
// watch for hashchange in url, signifying change in recipe fetch id
['load', 'hashchange'].forEach(evt => window.addEventListener(evt, showRecipe));
