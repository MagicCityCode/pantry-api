import express from "express";
import routes from "./routes.js";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
// cors
app.use(compression());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
