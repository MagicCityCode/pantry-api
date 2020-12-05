import express from "express";
import passport from "passport";
import ingredients from "./controllers/ingredients";
import users from "./controllers/users";
import joke from "./controllers/spoonacular"; // Build out rest of Spoonacular API connectivity soon; add auth where applicable; leaving off for now...
import { generateHashSalt } from "./utils/passwords";
import { createToken } from "./utils/tokens";
import { ReqUser } from "./utils/interfaces";

const router = express.Router();

router.post(
  "/ingredients",
  passport.authenticate("jwt"),
  ingredients.handleIngredientsPost
);
router.get("/ingredients/:id?", ingredients.handleIngredientsGet);
router.put(
  "/ingredients/:id",
  passport.authenticate("jwt"),
  ingredients.handleIngredientsPut
);
router.delete(
  "/ingredients/:id",
  passport.authenticate("jwt"),
  ingredients.handleIngredientsDelete
);

router.get("/joke", joke.handleJokeGet); // Build out rest of Spoonacular API connectivity soon; add auth where applicable; leaving off for now...

// router.post("/users", users.handleUsersPost); // Replaced with registration once set up
router.get("/users/:id?", users.handleUsersGet);
router.put("/users/:id", users.handleUsersPut);
router.delete("/users/:id", users.handleUsersDelete);

router.post("/register", async (req, res) => {
  const newUserDTO = req.body;
  try {
    console.log(newUserDTO);
    newUserDTO.password = generateHashSalt(newUserDTO.password);
    const insertRes: any = await users.handleUsersPost;
    const token = createToken({ id: insertRes.rows[0].id });
    res.json({ role: "guest", token });
  } catch (e) {
    console.log(e);
    res.status(500).json("Code not working");
  }
});
router.post(
  "/login",
  passport.authenticate("local"),
  async (req: ReqUser, res) => {
    const userDTO = req.user;
    try {
      const token = createToken({ id: userDTO?.id });
      res.json({
        token,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json("Code not working");
    }
  }
);
router.get("/token", passport.authenticate("jwt"), (req, res) =>
  res.sendStatus(200)
);

export default router;
