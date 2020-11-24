import express from "express";
import morgan from "morgan";
import routes from "./routes";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(routes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
