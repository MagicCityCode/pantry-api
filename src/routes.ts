import express from "express";
import foods from "./controllers/foods";
// import users from "./controllers/users";

const router = express.Router();

router.post("/", foods.handleFoodsPost);
router.get("/:id?", foods.handleFoodsGet);
router.put("/:id", foods.handleFoodsPut);
router.delete("/:id", foods.handleFoodsDelete);

// router.post("/", users.handleUsersPost);
// router.get("/:id?", users.handleUsersGet);
// router.put("/:id", users.handleUsersPut);
// router.delete("/:id", users.handleUsersDelete);

export default router;
