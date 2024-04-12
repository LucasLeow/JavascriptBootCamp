import { API_URL } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

// load recipe from given hash in URL
export const loadRecipe = async function (recipe_hash) {
  try {
    const data = await getJSON(`${API_URL}/${recipe_hash}`);
    console.log(data);
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
