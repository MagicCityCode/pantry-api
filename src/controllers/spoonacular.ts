import fetch from "node-fetch";

const handleJokeGet = async (req: any, res: any, next: any) => {
  try {
    const API_KEY = String(process.env.REACT_APP_SPOONACULAR_KEY);
    // const separator = "%2C"; // Use this to delineate listings of mult. items from an array, eg list of ingredients
    // const separator = ",+"; // Use this to delineate listings of mult. items from an array, eg list of ingredients
    // let ingredientsList = ["apple", "peach", "grapes"]; // Make dynamic once finalize data model
    // const ingredientsString = ingredientsList.map(
    //   (ingredient) => ingredient + separator
    // );
    // let secondQueryParam = ingredientsString;

    let requestString =
      "https://api.spoonacular.com/food/jokes/random" + "?apiKey=" + API_KEY;
    // + secondQueryParam;
    // console.log(requestString);

    const jokeResponse = await fetch(requestString, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jokeResponseBody = await jokeResponse.json();
    console.log(jokeResponseBody);
    return res.status(200).json(jokeResponseBody);
  } catch (err) {
    console.log("handleJokeGet [add filepath soon]", err);
    res.status(500).json({ msg: "Code not working", err });
    return next(err);
  }
};

export default {
  handleJokeGet,
};
