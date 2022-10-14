MongoClient = require("mongodb").MongoClient;
ObjectId = require('mongodb').ObjectId

const uri = "mongodb://localhost:27017/";

module.exports = {
  register: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const users = database.collection("users");

        const query = { $or: [ { username }, { email } ] } 
        const doc = await users.findOne(query);
        if (doc) {
          res.send({error: "Email or username taken."})
        } else {
          const user = { username, email, password, role: 'user'} 
          const result = await users.insertOne(user);
          // print a message if no documents were found
          res.send(doc);
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  login: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const email = req.body.email;
    const password = req.body.password;
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const users = database.collection("users");
        const query = { email, password }  
        const doc = await users.findOne(query);
        if (!doc) {
          res.send({error: "Incorrect email or password"})
        } else {
          res.send({user: doc});
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  getGroupsForUser: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const _id = ObjectId(req.body._id);
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const groups = database.collection("groups");
        const projection = { name: 1 };
        const query = { users: _id }
        const cursor = await groups.find(query).project(projection).toArray();
        if (!cursor) {
          res.send({error: "No groups found"})
        } else {
          res.send({groups: cursor})
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  getAllGroups: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const groups = database.collection("groups");
        const projection = { name: 1 };
        const cursor = await groups.find().project(projection).toArray();
        if (!cursor) {
          res.send({error: "No groups found"})
        } else {
          res.send({groups: cursor})
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  getGroup: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const _id = ObjectId(req.body.group_id);

    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const groups = database.collection("groups");
        const query = { _id }
        const doc = await groups.findOne(query);
        if (!doc) {
          res.send({error: "No group found"})
        } else {
          res.send({group: doc})
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  addNewGroup: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const name = req.body.name;
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const groups = database.collection("groups");
        const group = { name };
        const doc = await groups.insertOne(group);
        console.log(doc)
        res.send(doc);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  deleteGroup: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const _id = ObjectId(req.body.group_id);
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const groups = database.collection("groups");
        const group = { _id };
        const doc = await groups.deleteOne(group);
        console.log(doc)
        res.send(doc);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  promoteUserToGroupAssis: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const _id = ObjectId(req.body.group_id);
    const user_id = ObjectId(req.body.user_id);
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const groups = database.collection("groups");
        const query = { _id };
        const update = { $push: { groupAssisUsers: user_id } };
        const doc = await groups.updateOne(query, update);
        console.log(doc)
        res.send(doc);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  getAllChannelsInGroup: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const group_id = ObjectId(req.body.group_id);
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const channels = database.collection("channels");
        const projection = { name: 1 };
        const query = { group_id }
        const cursor = await channels.find(query).project(projection).toArray();
        if (!cursor) {
          res.send({error: "No channels found"})
        } else {
          res.send({channels: cursor})
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  getAllUserChannelsInGroup: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const group_id = ObjectId(req.body.group_id);
    const user_id = ObjectId(req.body.user_id);
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const channels = database.collection("channels");
        const projection = { name: 1 };
        const query = {group_id, users: user_id}
        const cursor = await channels.find(query).project(projection).toArray();
        if (!cursor) {
          res.send({error: "No channels found"})
        } else {
          res.send({channels: cursor})
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  getMessageHistory: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const channel_id = ObjectId(req.body.channel_id);
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const channels = database.collection("channels");
        const options = { projection: { messages: 1 } };
        const query = { _id: channel_id}
        const cursor = await channels.findOne(query, options);
        if (!cursor) {
          res.send({error: "No channels found"})
        } else {
          res.send({channel: cursor})
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  addNewChannel: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const group_id = ObjectId(req.body.group_id);
    const name = req.body.name;
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const channels = database.collection("channels");
        const channel = { 
          group_id,
          name,
          users: [], 
          messages: [],
        } 
        const result = await channels.insertOne(channel);  
        res.send(result);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  deleteChannel: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const _id = ObjectId(req.body.channel_id);
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const channels = database.collection("channels");
        const channel = { _id };
        const doc = await channels.deleteOne(channel);
        console.log(doc)
        res.send(doc);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

};
