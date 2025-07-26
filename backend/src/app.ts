import { json } from "body-parser";
import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import synonymsRouter from "./routes/synonyms";
import { NotFoundError } from "./utils/errors/NotFoundError";
import { errorHandler } from "./utils/middlewares/errorHandler";

const app = express();

app.set("trust proxy", true);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(json());

app.use(synonymsRouter);

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export default app;
