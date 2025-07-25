import request from "supertest";

import app from "../../app";

describe("Api test to synonyms router", () => {
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
