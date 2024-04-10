import { API_URL } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
};

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
  } catch (err) {
    throw err; // throw err to be handled in controller
  }
};
