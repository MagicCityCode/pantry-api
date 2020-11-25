import express from "express";
import foods from "./controllers/foods";
import users from "./controllers/users";

const router = express.Router();

router.post("/foods", foods.handleFoodsPost);
router.get("/foods/:id?", foods.handleFoodsGet);
router.put("/foods/:id", foods.handleFoodsPut);
router.delete("/foods/:id", foods.handleFoodsDelete);

router.post("/users", users.handleUsersPost);
router.get("/users/:id?", users.handleUsersGet);
router.put("/users/:id", users.handleUsersPut);
router.delete("/users/:id", users.handleUsersDelete);

export default router;
