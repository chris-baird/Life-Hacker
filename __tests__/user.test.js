const request = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")

describe("User API Endpoint Tests", () => {
  // Cleans up database connection after all tests have been done
  afterAll(() => {
    mongoose.connection.close()
  })
  // Login with good creds
  describe("POST /api/users/login", () => {
    it("should return 200 With a correct login", (done) => {
      request(app)
        .post("/api/users/login")
        .send("userName=cab3953")
        .send("password=password")
        .set("Accept", "application/json")
        .expect((res) => {
          expect(res.status).toEqual(200)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          done()
        })
    })
  })
  // Login with bad creds
  describe("POST /api/users/login", () => {
    it("should return 400 With a incorrect login", (done) => {
      request(app)
        .post("/api/users/login")
        .send("userName=badused")
        .send("password=badpassword")
        .set("Accept", "application/json")
        .expect((res) => {
          expect(res.status).toEqual(400)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          done()
        })
    })
  })
})
