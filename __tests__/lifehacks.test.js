const request = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")

describe("Lifehack API Endpoint Tests", () => {
  // Cleans up database connection after all tests have been done
  afterAll(() => {
    mongoose.connection.close()
  })
  // Checks that the status returned is 200
  describe("GET /api/lifeHacks", () => {
    it("should return status of 200", (done) => {
      request(app)
        .get("/api/lifeHacks")
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
  // Checks to make sure route returns an array
  describe("GET /api/lifeHacks", () => {
    it("should return an array", (done) => {
      request(app)
        .get("/api/lifeHacks")
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          return done()
        })
    })
  })
})
