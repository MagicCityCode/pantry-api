import express from "express";
// import users from "./controllers/users";
import foods from "./controllers/foods";

const router = express.Router();

router.get("/", foods.handleFoodsGetAll);
// router.get("/:id", foods.handleFoodsGetOne);
// router.get("/:id?", foods.handleFoodsGet); // Later
// router.post("/", foods.handleFoodsPost);
// router.put("/:id", foods.handleFoodsPut);
// router.delete("/:id", foods.handleFoodsDelete);

// router.get("/:id?", users.handleUsersGetAll);
// router.get("/:id?", users.handleUsersGetOne);
// router.get("/:id?", users.handleUsersGet); // Later
// router.post("/", users.handleUsersPost);
// router.put("/:id", users.handleUsersPut);
// router.delete("/:id", users.handleUsersDelete);

export default router;
