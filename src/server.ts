import express from "express";
import routes from "./routes";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(routes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
