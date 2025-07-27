import request from "supertest";

import app from "../../app";

describe("Api test to synonyms router", () => {
  describe("POST /api/synonyms", () => {
    test("Returns an error if word is incorrect", async () => {
      await request(app)
        .post("/api/synonyms")
        .send({
          word: "",
          synonym: "world",
        })
        .expect(400);

      await request(app)
        .post("/api/synonyms")
        .send({
          synonym: "world",
        })
        .expect(400);
    });

    test("Returns an error if synonym is incorrect", async () => {
      await request(app)
        .post("/api/synonyms")
        .send({
          word: "wash",
          synonym: "w",
        })
        .expect(400);

      await request(app)
        .post("/api/synonyms")
        .send({
          word: "wash",
        })
        .expect(400);
    });

    test("Returns a status 201 if the word and synonym are correct", async () => {
      await request(app)
        .post("/api/synonyms")
        .send({
          word: "wash",
          synonym: "clean",
        })
        .expect(201);
    });
  });

  describe("GET /api/synonyms/:word", () => {
    beforeAll(async () => {
      await request(app)
        .post("/api/synonyms")
        .send({
          word: "happy",
          synonym: "joyful",
        })
        .expect(201);
    });

    test("Returns an error if word is empty", async () => {
      await request(app).get("/api/synonyms/").expect(404);
    });

    test("Returns an error if word is incorrect", async () => {
      await request(app).get("/api/synonyms/w").expect(400);
    });

    test("Returns word with its synonyms", async () => {
      const res = await request(app).get("/api/synonyms/happy");
      expect(res.status).toBe(200);
      expect(res.body.word).toBe("happy");
      expect(res.body.synonyms).toEqual(["joyful"]);
    });
  });
});
