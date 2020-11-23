import express from "express";
// import users from "./controllers/users";
import foods from "./controllers/foods";

const router = express.Router();

// router.get("/:id?", users.handleUsersGet);
router.get("/:id?", foods.handleFoodsGet);
// router.post("/", users.handleUsersPost);
router.post("/", foods.handleFoodsPost);
// router.put("/:id", users.handleUsersPut);
router.put("/:id", foods.handleFoodsPut);
// router.delete("/:id", users.handleUsersDelete);
router.delete("/:id", foods.handleFoodsDelete);

export default router;
