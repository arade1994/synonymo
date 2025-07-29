import { json } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";

import synonymsRouter from "./routes/synonyms";
import { NotFoundError } from "./utils/errors/NotFoundError";
import { errorHandler } from "./utils/middlewares/errorHandler";

dotenv.config();

const app: Express = express();

app.set("trust proxy", true);
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://synonymo.netlify.app"
        : "http://localhost:3000",
    credentials: true,
  })
);
app.options(/.*/, cors());

app.use(json());

app.use(synonymsRouter);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export default app;
