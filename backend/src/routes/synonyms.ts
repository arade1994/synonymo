import { type Request, type Response, Router } from "express";
import { body } from "express-validator";

import { SynonymGraph } from "../data/synoymGraph";
import { validateRequest } from "../utils/middlewares/validateRequest";

const router = Router();

const graph = new SynonymGraph();

router.post(
  "/api/synonyms",
  [
    body("word")
      .isString()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Word must be at least 3 characters long"),
    body("synonym")
      .isString()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Synonym must be at least 3 characters long"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    const { word, synonym } = req.body;
    graph.addSynonymPair(word, synonym);
    res.status(201).json({ message: "Synonyms added successfully" });
  }
);

export default router;
