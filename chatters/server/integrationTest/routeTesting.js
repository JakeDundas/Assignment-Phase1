process.env.NODE_ENV = "test";
const assert = require("assert");
const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { isTypedArray } = require("util/types");
const should = chai.should();
chai.use(chaiHttp);

const testUser = {
  _id: "1337",
  username: "test_user",
  email: "test@test.com",
  password: "password",
  role: "user",
  profile_image: "default_profile.png",
};

// Authentication Tests
describe("Authentication Test", () => {
  let insertedId = "";

  before(() => {
    console.log("Before Test");
  });

  afterEach((done) => {
    const query = { user_id: insertedId };
    chai
      .request(app)
      .post("/api/deleteUser")
      .send(query)
      .end((err, res) => {
        done();
      });
  });

  after(() => {
    console.log("After Test");
  });

  describe("/POST register", () => {
    it("Should return a object with success: true and inertedID", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eq(true);
          insertedId = res.body.insertedId;
          done();
        });
    });
  });

  describe("/POST register", () => {
    it("Should return a object with success: false and error message", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          insertedId = res.body.insertedId;
          chai
            .request(app)
            .post("/api/register")
            .send(query)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(false);
              res.body.should.have.property("error");
              done();
            });
        });
    });
  });

  describe("/POST register", () => {
    it("Should return a object with success: false and error message", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          insertedId = res.body.insertedId;
          chai
            .request(app)
            .post("/api/register")
            .send(query)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(false);
              res.body.should.have.property("error");
              done();
            });
        });
    });
  });

  describe("/POST login", () => {
    it("Should return an object with assosciated User with the email and password", (done) => {
      const registerQuery = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      const loginQuery = {
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(registerQuery)
        .end((err, res) => {
          insertedId = res.body.insertedId;
          chai
            .request(app)
            .post("/api/login")
            .send(loginQuery)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("user");
              done();
            });
        });
    });
  });

  describe("/POST login", () => {
    it("Should return a object with with success false and error", (done) => {
      const query = {
        email: "wrongEmail",
        password: "wrongPassword",
      };
      chai
        .request(app)
        .post("/api/login")
        .send(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eq(false);
          res.body.should.have.property("error");
          done();
        });
    });
  });
});

////// Groups Test

describe("Groups Test", () => {
  const testGroup = {
    _id: "1337",
    name: "test_group",
  };
  let insertedId = "";

  before(() => {
    console.log("Before Test");
  });

  afterEach((done) => {
    const query = { group_id: insertedId };
    chai
      .request(app)
      .post("/api/deleteGroup")
      .send(query)
      .end((err, res) => {
        done();
      });
  });

  after(() => {
    console.log("After Test");
  });

  describe("/GET getAllGroups", () => {
    it("Should return an array of all the groups", (done) => {
      chai
        .request(app)
        .get("/api/getAllGroups")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("groups");
          done();
        });
    });
  });

  describe("/POST addNewGroup", () => {
    it("Should return object with succes and id", (done) => {
      const query = { name: testGroup.name };
      chai
        .request(app)
        .post("/api/addNewGroup")
        .send(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eq(true);
          res.body.should.have.property("insertedId");
          insertedId = res.body.insertedId;
          done();
        });
    });
  });

  describe("/POST getGroup", () => {
    it("Should return success true, Group object", (done) => {
      const addQuery = { name: testGroup.name };
      chai
        .request(app)
        .post("/api/addNewGroup")
        .send(addQuery)
        .end((err, res) => {
          insertedId = res.body.insertedId;
          chai
            .request(app)
            .post("/api/getGroup")
            .send({ group_id: insertedId })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(true);
              res.body.should.have.property("group");
              done();
            });
        });
    });
  });

  describe("/POST getGroup", () => {
    it("Should return success false, error message", (done) => {
      const getQuery = { group_id: "635aaaaaaaaaaaaaaaaaaaaa" };
      chai
        .request(app)
        .post("/api/getGroup")
        .send(getQuery)
        .end((err, res) => {
          // res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eq(false);
          res.body.should.have.property("error");
          done();
        });
    });
  });

  describe("/POST getGroupsForUser", () => {
    it("Should return success false, error message", (done) => {
      const getQuery = { _id: "63536c51805bae86f695c68d" };
      chai
        .request(app)
        .post("/api/getGroupsForUser")
        .send(getQuery)
        .end((err, res) => {
          // res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eq(true);
          res.body.should.have.property("groups");
          done();
        });
    });
  });

  describe("/POST promoteUserToGroupAssis", () => {
    it("Should return success false, error message", (done) => {
      const addQuery = { name: testGroup.name };
      chai
        .request(app)
        .post("/api/addNewGroup")
        .send(addQuery)
        .end((err, res) => {
          insertedId = res.body.insertedId;
          chai
            .request(app)
            .post("/api/promoteUserToGroupAssis")
            .send({
              group_id: insertedId,
              user_id: "63536c51805bae86f695c68d",
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(true);
              res.body.should.have.property("modifiedCount").eq(1);
              done();
            });
        });
    });
  });

  describe("/POST addUserToGroup", () => {
    let user_id = "";
    it("Should return success true, doc", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          user_id = res.body.insertedId;
          const addQuery = { name: testGroup.name };
          chai
            .request(app)
            .post("/api/addNewGroup")
            .send(addQuery)
            .end((err, res) => {
              insertedId = res.body.insertedId;
              chai
                .request(app)
                .post("/api/addUserToGroup")
                .send({
                  group_id: insertedId,
                  email: query.email,
                })
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a("object");
                  res.body.should.have.property("success").eq(true);
                  res.body.should.have.property("doc");
                  const query = { user_id: user_id };
                  chai
                    .request(app)
                    .post("/api/deleteUser")
                    .send(query)
                    .end((err, res) => {
                      done();
                    });
                });
            });
        });
    });
  });

  describe("/POST addUserToGroup", () => {
    it("Should return success false, error message email not found", (done) => {
      const addQuery = { name: testGroup.name };
      chai
        .request(app)
        .post("/api/addNewGroup")
        .send(addQuery)
        .end((err, res) => {
          insertedId = res.body.insertedId;
          chai
            .request(app)
            .post("/api/addUserToGroup")
            .send({
              group_id: insertedId,
              email: "wrongEmail",
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(false);
              res.body.should.have.property("error");
              done();
            });
        });
    });
  });

  describe("/POST addUserToGroup", () => {
    let user_id = "";
    it("Should return success false, error message already in group", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          user_id = res.body.insertedId;
          const addQuery = { name: testGroup.name };
          chai
            .request(app)
            .post("/api/addNewGroup")
            .send(addQuery)
            .end((err, res) => {
              insertedId = res.body.insertedId;
              chai
                .request(app)
                .post("/api/addUserToGroup")
                .send({
                  group_id: insertedId,
                  email: query.email,
                })
                .end((err, res) => {
                  chai
                    .request(app)
                    .post("/api/addUserToGroup")
                    .send({
                      group_id: insertedId,
                      email: query.email,
                    })
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a("object");
                      res.body.should.have.property("success").eq(false);
                      res.body.should.have.property("error");
                      const query = { user_id: user_id };
                      chai
                        .request(app)
                        .post("/api/deleteUser")
                        .send(query)
                        .end((err, res) => {
                          done();
                        });
                    });
                });
            });
        });
    });
  });

  describe("/POST removeUserFromGroup", () => {
    let user_id = "";
    it("Should return success true, removed doc", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          user_id = res.body.insertedId;
          const addQuery = { name: testGroup.name };
          chai
            .request(app)
            .post("/api/addNewGroup")
            .send(addQuery)
            .end((err, res) => {
              insertedId = res.body.insertedId;
              chai
                .request(app)
                .post("/api/addUserToGroup")
                .send({
                  group_id: insertedId,
                  email: query.email,
                })
                .end((err, res) => {
                  chai
                    .request(app)
                    .post("/api/removeUserFromGroup")
                    .send({
                      group_id: insertedId,
                      user_id: user_id,
                    })
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a("object");
                      res.body.should.have.property("success").eq(true);
                      res.body.should.have.property("doc");
                      const query = { user_id: user_id };
                      chai
                        .request(app)
                        .post("/api/deleteUser")
                        .send(query)
                        .end((err, res) => {
                          done();
                        });
                    });
                });
            });
        });
    });
  });

  describe("/POST removeUserFromGroupAssis", () => {
    let user_id = "";
    it("Should return success true, removed doc", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          user_id = res.body.insertedId;
          const addQuery = { name: testGroup.name };
          chai
            .request(app)
            .post("/api/addNewGroup")
            .send(addQuery)
            .end((err, res) => {
              insertedId = res.body.insertedId;
              chai
                .request(app)
                .post("/api/addUserToGroup")
                .send({
                  group_id: insertedId,
                  email: query.email,
                })
                .end((err, res) => {
                  chai
                    .request(app)
                    .post("/api/promoteUserToGroupAssis")
                    .send({
                      group_id: insertedId,
                      user_id: user_id,
                    })
                    .end((err, res) => {
                      chai
                        .request(app)
                        .post("/api/removeUserFromGroupAssis")
                        .send({
                          group_id: insertedId,
                          user_id: user_id,
                        })
                        .end((err, res) => {
                          res.should.have.status(200);
                          res.body.should.be.a("object");
                          res.body.should.have.property("success").eq(true);
                          res.body.should.have.property("doc");
                          const query = { user_id: user_id };
                          chai
                            .request(app)
                            .post("/api/deleteUser")
                            .send(query)
                            .end((err, res) => {
                              done();
                            });
                        });
                    });
                });
            });
        });
    });
  });

  describe("/POST deleteGroup", () => {
    it("Should return success false, error message email not found", (done) => {
      const addQuery = { name: testGroup.name };
      chai
        .request(app)
        .post("/api/addNewGroup")
        .send(addQuery)
        .end((err, res) => {
          insertedId = res.body.insertedId;
          chai
            .request(app)
            .post("/api/deleteGroup")
            .send({
              group_id: insertedId,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(true);
              res.body.should.have.property("doc");
              done();
            });
        });
    });
  });
});

// Channel Tests
describe("Channels Test", () => {
  let insertedId = "";

  before(() => {
    console.log("Before Test");
  });

  afterEach((done) => {
    const query = { channel_id: insertedId };
    chai
      .request(app)
      .post("/api/deleteChannel")
      .send(query)
      .end((err, res) => {
        done();
      });
  });

  after(() => {
    console.log("After Test");
  });

  describe("/POST getAllChannelsInGroup", () => {
    it("Should return a object with success: true and channelArray", (done) => {
      query = { group_id: "635375dcaaaa94d2503315aa" };
      chai
        .request(app)
        .post("/api/getAllChannelsInGroup")
        .send(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eq(true);
          res.body.should.have.property("channels");
          done();
        });
    });
  });

  describe("/POST getAllUserChannelsInGroup", () => {
    it("Should return a object with success: true and channelArray", (done) => {
      query = {
        group_id: "635375dcaaaa94d2503315aa",
        user_id: "635375dcaaaa94d2503315aa",
      };
      chai
        .request(app)
        .post("/api/getAllUserChannelsInGroup")
        .send(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eq(true);
          res.body.should.have.property("channels");
          done();
        });
    });
  });

  describe("/POST addNewChannel", () => {
    let user_id = "";
    let group_id = "";
    it("Should return success false, error message already in group", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          user_id = res.body.insertedId;
          const addQuery = { name: "test_group" };
          chai
            .request(app)
            .post("/api/addNewGroup")
            .send(addQuery)
            .end((err, res) => {
              group_id = res.body.insertedId;
              chai
                .request(app)
                .post("/api/addNewChannel")
                .send({
                  group_id: group_id,
                  name: "test_channel",
                })
                .end((err, res) => {
                  insertedId = res.body.insertedId;
                  res.should.have.status(200);
                  res.body.should.be.a("object");
                  res.body.should.have.property("success").eq(true);
                  res.body.should.have.property("insertedId");
                  chai
                    .request(app)
                    .post("/api/deleteGroup")
                    .send({ group_id })
                    .end((err, res) => {
                      chai
                        .request(app)
                        .post("/api/deleteUser")
                        .send({ user_id })
                        .end((err, res) => {
                          done();
                        });
                    });
                });
            });
        });
    });
  });

  describe("/POST addUserToChannel", () => {
    let user_id = "";
    let group_id = "";
    it("Should return success false, error message already in group", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          user_id = res.body.insertedId;
          const addQuery = { name: "test_group" };
          chai
            .request(app)
            .post("/api/addNewGroup")
            .send(addQuery)
            .end((err, res) => {
              group_id = res.body.insertedId;
              chai
                .request(app)
                .post("/api/addNewChannel")
                .send({
                  group_id: group_id,
                  name: "test_channel",
                })
                .end((err, res) => {
                  insertedId = res.body.insertedId;
                  chai
                    .request(app)
                    .post("/api/addUserToChannel")
                    .send({ email: "wrongEmail", channel_id: insertedId })
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a("object");
                      res.body.should.have.property("success").eq(false);
                      res.body.should.have.property("error");
                      chai
                        .request(app)
                        .post("/api/deleteGroup")
                        .send({ group_id })
                        .end((err, res) => {
                          chai
                            .request(app)
                            .post("/api/deleteUser")
                            .send({ user_id })
                            .end((err, res) => {
                              done();
                            });
                        });
                    });
                });
            });
        });
    });
  });

  describe("/POST addUserToChannel", () => {
    let user_id = "";
    let group_id = "";
    it("Should return success false, error message already in group", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          user_id = res.body.insertedId;
          const addQuery = { name: "test_group" };
          chai
            .request(app)
            .post("/api/addNewGroup")
            .send(addQuery)
            .end((err, res) => {
              group_id = res.body.insertedId;
              chai
                .request(app)
                .post("/api/addNewChannel")
                .send({
                  group_id: group_id,
                  name: "test_channel",
                })
                .end((err, res) => {
                  insertedId = res.body.insertedId;
                  chai
                    .request(app)
                    .post("/api/addUserToChannel")
                    .send({ email: query.email, channel_id: insertedId })
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a("object");
                      res.body.should.have.property("success").eq(true);
                      res.body.should.have.property("doc");
                      chai
                        .request(app)
                        .post("/api/deleteGroup")
                        .send({ group_id })
                        .end((err, res) => {
                          chai
                            .request(app)
                            .post("/api/deleteUser")
                            .send({ user_id })
                            .end((err, res) => {
                              done();
                            });
                        });
                    });
                });
            });
        });
    });
  });

  describe("/POST addUserToChannel", () => {
    let user_id = "";
    let group_id = "";
    it("Should return success false, error message already in group", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          user_id = res.body.insertedId;
          const addQuery = { name: "test_group" };
          chai
            .request(app)
            .post("/api/addNewGroup")
            .send(addQuery)
            .end((err, res) => {
              group_id = res.body.insertedId;
              chai
                .request(app)
                .post("/api/addNewChannel")
                .send({
                  group_id: group_id,
                  name: "test_channel",
                })
                .end((err, res) => {
                  insertedId = res.body.insertedId;
                  chai
                    .request(app)
                    .post("/api/addUserToChannel")
                    .send({ email: query.email, channel_id: insertedId })
                    .end((err, res) => {
                      chai
                        .request(app)
                        .post("/api/addUserToChannel")
                        .send({ email: query.email, channel_id: insertedId })
                        .end((err, res) => {
                          res.should.have.status(200);
                          res.body.should.be.a("object");
                          res.body.should.have.property("success").eq(false);
                          res.body.should.have.property("error");
                          chai
                            .request(app)
                            .post("/api/deleteGroup")
                            .send({ group_id })
                            .end((err, res) => {
                              chai
                                .request(app)
                                .post("/api/deleteUser")
                                .send({ user_id })
                                .end((err, res) => {
                                  done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
  });

  describe("/POST removeUserFromChannel", () => {
    let user_id = "";
    let group_id = "";
    it("Should return success false, error message already in group", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          user_id = res.body.insertedId;
          const addQuery = { name: "test_group" };
          chai
            .request(app)
            .post("/api/addNewGroup")
            .send(addQuery)
            .end((err, res) => {
              group_id = res.body.insertedId;
              chai
                .request(app)
                .post("/api/addNewChannel")
                .send({
                  group_id: group_id,
                  name: "test_channel",
                })
                .end((err, res) => {
                  insertedId = res.body.insertedId;
                  chai
                    .request(app)
                    .post("/api/addUserToChannel")
                    .send({ email: query.email, channel_id: insertedId })
                    .end((err, res) => {
                      chai
                        .request(app)
                        .post("/api/removeUserFromChannel")
                        .send({ user_id, channel_id: insertedId })
                        .end((err, res) => {
                          res.should.have.status(200);
                          res.body.should.be.a("object");
                          res.body.should.have.property("success").eq(true);
                          res.body.should.have.property("doc");
                          chai
                            .request(app)
                            .post("/api/deleteGroup")
                            .send({ group_id })
                            .end((err, res) => {
                              chai
                                .request(app)
                                .post("/api/deleteUser")
                                .send({ user_id })
                                .end((err, res) => {
                                  done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
  });

  describe("/POST deleteChannel", () => {
    let group_id = "";
    it("Should return success false, error message already in group", (done) => {
      chai
        .request(app)
        .post("/api/addNewGroup")
        .send({ name: "test_group" })
        .end((err, res) => {
          group_id = res.body.insertedId;
          chai
            .request(app)
            .post("/api/addNewChannel")
            .send({
              group_id: group_id,
              name: "test_channel",
            })
            .end((err, res) => {
              insertedId = res.body.insertedId;
              chai
                .request(app)
                .post("/api/deleteChannel")
                .send({ email: query.email, channel_id: insertedId })
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a("object");
                  res.body.should.have.property("success").eq(true);
                  res.body.should.have.property("doc");
                  chai
                    .request(app)
                    .post("/api/deleteGroup")
                    .send({ group_id })
                    .end((err, res) => {
                      done();
                    });
                });
            });
        });
    });
  });
});

// User Tests
describe("Users Test", () => {
  let insertedId = "";
  before(() => {
    console.log("Before Test");
  });

  afterEach((done) => {
    const query = { user_id: insertedId };
    chai
      .request(app)
      .post("/api/deleteUser")
      .send(query)
      .end((err, res) => {
        done();
      });
  });

  after(() => {
    console.log("After Test");
  });

  describe("/GET getAllUsers", () => {
    it("Should return a object with success: true and channelArray", (done) => {
      chai
        .request(app)
        .get("/api/getAllUsers")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eq(true);
          res.body.should.have.property("users");
          done();
        });
    });
  });

  describe("/POST getUser", () => {
    it("Should return a object with success: true and channelArray", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          insertedId = res.body.insertedId
          chai
            .request(app)
            .post("/api/getUser")
            .send({user_id: insertedId})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(true);
              res.body.should.have.property("user");
              done();
            });
        });
    });
  });
  
  describe("/POST getUser", () => {
    it("Should return a object with success: true and channelArray", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          insertedId = res.body.insertedId
          chai
            .request(app)
            .post("/api/getUser")
            .send({user_id: "63537d3d675f20aaaaaaaaaa"})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(false);
              res.body.should.have.property("error");
              done();
            });
        });
    });
  });
  
  describe("/POST getUsersLike", () => {
    it("Should return a object with success: true and channelArray", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          insertedId = res.body.insertedId
          chai
            .request(app)
            .post("/api/getUsersLike")
            .send({user_query: "test"})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(true);
              res.body.should.have.property("users");
              done();
            });
        });
    });
  });

  describe("/POST getUsersDetails", () => {
    it("Should return a object with success: true and channelArray", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          insertedId = res.body.insertedId
          chai
            .request(app)
            .post("/api/getUsersDetails")
            .send([insertedId])
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(true);
              res.body.should.have.property("users");
              done();
            });
        });
    });
  });
  
  describe("/POST updateUserProfileImage", () => {
    it("Should return a object with success: true and channelArray", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          insertedId = res.body.insertedId
          chai
            .request(app)
            .post("/api/updateUserProfileImage")
            .send({user_id: insertedId, imageName: "test_image"})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(true);
              res.body.should.have.property("modifiedCount").eq(1);
              done();
            });
        });
    });
  });
  
  describe("/POST promoteToGroupAdmin", () => {
    it("Should return a object with success: true and channelArray", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          insertedId = res.body.insertedId
          chai
            .request(app)
            .post("/api/promoteToGroupAdmin")
            .send({user_id: insertedId})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(true);
              res.body.should.have.property("modifiedCount").eq(1);
              done();
            });
        });
    });
  });

  describe("/POST promoteToSuperAdmin", () => {
    it("Should return a object with success: true and channelArray", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          insertedId = res.body.insertedId
          chai
            .request(app)
            .post("/api/promoteToSuperAdmin")
            .send({user_id: insertedId})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(true);
              res.body.should.have.property("modifiedCount").eq(1);
              done();
            });
        });
    });
  });

  describe("/POST deleteUser", () => {
    it("Should return a object with success: true and channelArray", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          insertedId = res.body.insertedId
          chai
            .request(app)
            .post("/api/deleteUser")
            .send({user_id: insertedId})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(true);
              done();
            });
        });
    });
  });
  
  describe("/POST deleteUser", () => {
    it("Should return a object with success: true and channelArray", (done) => {
      const query = {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      };
      chai
        .request(app)
        .post("/api/register")
        .send(query)
        .end((err, res) => {
          insertedId = res.body.insertedId
          chai
            .request(app)
            .post("/api/deleteUser")
            .send({user_id: "6353806c75a7c9aaaaaaaaaa"})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              res.body.should.have.property("success").eq(false);
              done();
            });
        });
    });
  });

});
