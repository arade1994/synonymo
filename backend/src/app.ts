import { json } from "body-parser";
import express from "express";

const app = express();
app.use(json);

export default app;
