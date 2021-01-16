process.env.NODE_ENV = "test";

const request = require("supertest")
const app = require("../app")
const cats = require("../fakeDb")

let rocket = {name: "rocket"}

beforeEach(function() {
    cats.push(rocket);
});

afterEach(function () {
    // instead of cats = [] because we want to make sure it mutates not redefines it
    cats.length = 0;
})

describe("GET /cats", () => {
    test("get all cats", async () =>{
        const resp = await request(app).get('/cats');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({cats:[rocket]});
    })
})

describe("GET /cats", () => {
    test("get cat by name", async () =>{
        const resp = await request(app).get(`/cats/${rocket.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({cat: rocket});
    })
    test("responds 404 for invalid cat", async () =>{
        const resp = await request(app).get('/cats/badname');
        expect(resp.statusCode).toBe(404);
    })
})

describe("POST /cats", () => {
    test("post new cat", async () =>{
        const resp = await request(app).post('/cats').send({name: "Gus"});
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({cat:{name: "Gus"}});
    })
})

describe("PATCH to /cats", () => {
    test("renaming rocket via patch request", async () => {
        const resp = await request(app).patch(`/cats/${rocket.name}`).send({name: "pickles"});
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({cat:{name: "pickles"}});
    })
    test("404 after patch to incorrect name", async () => {
        const resp = await request(app).patch('/cats/nocatnamedthis').send({name: "pickles"});
        expect(resp.statusCode).toEqual(404);
    })
})

describe("DELETE /cats/:name", function() {
    test("Deletes a single a cat", async function() {
      const resp = await request(app).delete(`/cats/${rocket.name}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({ message: "Deleted" });
    });
  });


// remeber "request" is supertest