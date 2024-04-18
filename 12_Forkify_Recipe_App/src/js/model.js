import { API_URL, ResultsPerPage } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: ResultsPerPage,
  },
  bookmarks: [],
};

// load recipe from given hash in URL
export const loadRecipe = async function (recipe_hash) {
  try {
    const data = await getJSON(`${API_URL}/${recipe_hash}`);
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === recipe_hash)) {
      state.recipe.bookmarked = true;
    } else state.recipe.bookmarked = false;
    console.log(state.recipe);
  } catch (err) {
    throw err; // throw err to be handled in controller
  }
};

// load search Result on search section
export const loadSearchResult = async function (queryString) {
  try {
    state.search.query = queryString;
    const data = await getJSON(`${API_URL}?search=${queryString}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (newServings / state.recipe.servings) * ingredient.quantity;
  });

  state.recipe.servings = newServings; // update old serving with new servings
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark recipe as bookmarked
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true; // add new field 'bookmarked'
  }
};

export const deleteBookmark = function (recipe_hash) {
  const index = state.bookmarks.findIndex(el => el.id === recipe_hash);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
};
