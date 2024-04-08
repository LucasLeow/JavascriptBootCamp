export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipe_hash) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipe_hash}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }
    console.log(res, data);
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
    console.log(state.recipe);
  } catch (err) {
    alert(err);
  }
};
