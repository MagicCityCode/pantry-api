import express from "express";
// import passport from "passport";
import ingredients from "./controllers/ingredients";
import users from "./controllers/users";
import joke from "./controllers/spoonacular"; // Build out rest of Spoonacular API connectivity soon; add auth where applicable; leaving off for now...
// import tokens from "./controllers/tokens";

const router = express.Router();

router.post(
  "/ingredients",
  // passport.authenticate("jwt"),
  ingredients.handleIngredientsPost
);
router.get("/ingredients/:id?", ingredients.handleIngredientsGet);
router.put(
  "/ingredients/:id",
  // passport.authenticate("jwt"),
  ingredients.handleIngredientsPut
);
router.delete(
  "/ingredients/:id",
  // passport.authenticate("jwt"),
  ingredients.handleIngredientsDelete
);

router.get("/joke", joke.handleJokeGet); // Build out rest of Spoonacular API connectivity soon; add auth where applicable; leaving off for now...

// router.post("/users", users.handleUsersPost); // Replaced by registration
router.get("/users/:id?", users.handleUsersGet);
router.put("/users/:id", users.handleUsersPut);
router.delete("/users/:id", users.handleUsersDelete);

// router.post("/register", users.handleRegisterPost);
// router.post("/login", passport.authenticate("local"), users.handleLoginPost);
// router.get("/token", passport.authenticate("jwt"), tokens.handleTokensGet);

export default router;
