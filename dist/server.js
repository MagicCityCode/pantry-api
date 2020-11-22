import express from "express";
import routes from "./routes.js";
import morgan from "morgan";
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(routes);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
