import fetch from 'node-fetch';

const apiKey = String(process.env.SPOONACULAR_KEY);

/* Notes for structuring url strings for Spoonacular API calls:
   const separator = '%2C'; // Use this to delineate listings of mult. items from an array, eg list of ingredients
   const separator = ',+'; // Use this to delineate listings of mult. items from an array, eg list of ingredients
   let ingredientsList = ['apple', 'peach', 'grapes']; // Make dynamic once finalize data model
   const ingredientsString = ingredientsList.map(
     (ingredient) => ingredient + separator
   );
   let secondQueryParam = ingredientsString;
*/

const handleJokeGet = async (req: any, res: any, next: any) => {
  try {
    const requestString = `https://api.spoonacular.com/food/jokes/random?apiKey=${apiKey}`;
    const response = await fetch(requestString, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseBody = await response.json();
    return res.status(200).json(responseBody);
  } catch (err) {
    return next(err);
  }
};

const handleFindRecipesByIngredientsGet = async (req: any, res: any, next: any) => {
  try {
    const maxResults = 5; // Specify how many results Spoonacular will return
    const ingredientsListFromUser = 'apples'; // Soon change this to map user's inputs from frontend, delineated by ',+'
    const requestString = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredientsListFromUser}&number=${maxResults}`;
    const response = await fetch(requestString, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseBody = await response.json();
    console.log(responseBody);
    return res.status(200).json(responseBody);
  } catch (err) {
    return next(err);
  }
};

export default {
  handleJokeGet,
  handleFindRecipesByIngredientsGet,
};
