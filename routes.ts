import express from "express";
import foods from "./controllers/foods";

const router = express.Router();

router.get("/", foods.handleFoodsGetAll);

export default router;
