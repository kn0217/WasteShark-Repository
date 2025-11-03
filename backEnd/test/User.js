const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, loadApiRoutes } = require("../server");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

chai.use(chaiHttp);
const { expect } = chai;

let mongo;

before(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);

  loadApiRoutes(); // load your routes AFTER DB is ready
});

after(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

describe("API tests", () => {
  const testUser = {
    first_name: "colin",
    last_name: "lou",
    email: "cjlou45@icloud.com",
    password: "test123",
  };

  it("POST /api/users/signup should create a new user (success)", async () => {
    const res = await chai
      .request(app)
      .post("/api/users/signup")
      .send(testUser);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token");
  });

  it("POST /api/users/signup should fail for duplicate email", async () => {
    const res = await chai
      .request(app)
      .post("/api/users/signup")
      .send(testUser);
    expect(res).to.have.status(409);
    expect(res.body).to.have.property("error");
  });

  it("POST /api/users/login should authenticate the user (success)", async function() {
    const res = await chai
      .request(app)
      .post("/api/users/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token");
    // Save refresh cookie for later
    this.refreshCookie = res.header['set-cookie'] && res.header['set-cookie'].find(c => c.startsWith('jwt='));
    expect(this.refreshCookie).to.exist
  });

  it("POST /api/users/login should fail with wrong password", async () => {
    const res = await chai
      .request(app)
      .post("/api/users/login")
      .send({
        email: testUser.email,
        password: "wrongpassword",
      });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property("error");
  });

  it("POST /api/users/login should fail with non-existent email", async () => {
    const res = await chai
      .request(app)
      .post("/api/users/login")
      .send({
        email: "notfound@example.com",
        password: "irrelevant",
      });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property("error");
  });

  it("POST /api/users/refresh should return new access token with valid cookie", async function() {
    // Login to get refresh cookie
    const loginRes = await chai
      .request(app)
      .post("/api/users/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });
    const refreshCookie = loginRes.header['set-cookie'] && loginRes.header['set-cookie'].find(c => c.startsWith('jwt='));
    expect(refreshCookie).to.exist;
    // Call refresh endpoint with cookie
    const res = await chai
      .request(app)
      .post("/api/users/refresh")
      .set('Cookie', refreshCookie)
      .send();
    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token");
  });

  it("POST /api/users/refresh should fail with no cookie", async () => {
    const res = await chai
      .request(app)
      .post("/api/users/refresh")
      .send();
    expect(res).to.have.status(401);
    expect(res.body).to.have.property("error");
  });

  it("POST /api/users/logout should clear cookie and return 200 if cookie present", async function() {
    // Login to get refresh cookie
    const loginRes = await chai
      .request(app)
      .post("/api/users/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });
    const refreshCookie = loginRes.header['set-cookie'] && loginRes.header['set-cookie'].find(c => c.startsWith('jwt='));
    expect(refreshCookie).to.exist;
    // Call logout endpoint with cookie
    const res = await chai
      .request(app)
      .post("/api/users/logout")
      .set('Cookie', refreshCookie)
      .send();
    expect(res).to.have.status(200);
  });

  it("POST /api/users/logout should return 204 if no cookie present", async () => {
    const res = await chai
      .request(app)
      .post("/api/users/logout")
      .send();
    expect(res).to.have.status(204);
  });

});
