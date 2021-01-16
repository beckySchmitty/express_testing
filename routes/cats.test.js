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
        const resp = await request(app).get('/cats')
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({cats:[rocket]})
    })
})

describe("POST /cats", () => {
    test("post new cat", async () =>{
        const resp = await request(app).post('/cats').send({name: "Gus"})
        expect(resp.statusCode).toBe(201)
        expect(resp.body).toEqual({cat:{name: "Gus"}})
    })
})

// remeber "request" is supertest