import { agent as request } from "supertest";
import { createApp } from "../../../../../app";

describe("Ping Controller", () => {
  let app: Express.Application;
  beforeAll(async () => {
    app = await createApp();
  });

  test("Ping succeful", (done) => {
    request(app)
      .get("/ping")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("pong 2.0");
        expect(response.body.status).toBeTruthy();
        done();
      })
      .catch((err) => done(err));
  });
});
