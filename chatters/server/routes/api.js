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
          res.send({success: false, error: "Email or username taken."})
        } else {
          const user = { username, email, password, role: 'user', profileImage: 'default_profile.png'} 
          const result = await users.insertOne(user);
          console.log(result)
          // print a message if no documents were found
          res.send({success: true, insertedId: result.insertedId});
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
        const options = { projection: {username: 1, email: 1, role: 1} };
        const doc = await users.findOne(query, options);
        if (!doc) {
          res.send({success: false, error: "Incorrect email or password"})
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
          res.send({success: false, error: "No groups found"})
        } else {
          res.send({success: true, groups: cursor})
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
    console.log("infunc", req.body)
    const _id = ObjectId(req.body.group_id);

    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const groups = database.collection("groups");
        const query = { _id }
        const doc = await groups.findOne(query);
        if (!doc) {
          res.send({success: false, error: "No group found"})
        } else {
          res.send({success: true, group: doc})
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
        const result = await groups.insertOne(group);
        console.log(result)
        res.send({success: true, insertedId: result.insertedId});
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
        res.send({success: true, doc});
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
        res.send({success: true, modifiedCount: doc.modifiedCount});
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  addUserToGroup: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const email = req.body.email;
    const group_id = ObjectId(req.body.group_id);
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const users = database.collection("users");
        const query = { email };
        console.log(query)
        const doc = await users.findOne(query);
        if(!doc) {
          res.send({success: false, error: 'Email not found'})
        } else {
          const groups = database.collection("groups");
          const _id = doc._id;
          const query = { _id: group_id, users: _id };
          const cursor = await groups.find(query);
          if(await cursor.count() === 0) {
            // add to group
            const query = { _id: group_id };
            const update = { $push: { users: _id } };
            const doc = await groups.updateOne(query, update);
            console.log(doc)
            res.send({success: true, doc});
          } else if (await cursor.count() !== 0) {
            res.send({success: false, error: 'User already in group'})
          }
        }
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
        const projection = { name: 1, users: 1 };
        const query = { group_id }
        const cursor = await channels.find(query).project(projection).toArray();
        if (!cursor) {
          res.send({success: false, error: "No channels found"})
        } else {
          res.send({success: true, channels: cursor})
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
        const projection = { name: 1, users: 1 };
        const query = {group_id, users: user_id}
        const cursor = await channels.find(query).project(projection).toArray();
        if (!cursor) {
          res.send({success: false, error: "No channels found"})
        } else {
          res.send({success: true, channels: cursor})
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  addUserToChannel: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const email = req.body.email;
    const channel_id = ObjectId(req.body.channel_id);
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const users = database.collection("users");
        const query = { email };
        const doc = await users.findOne(query);
        if(!doc) {
          res.send({success: false, error: 'Email not found'})
        } else {
          const channels = database.collection("channels");
          const _id = doc._id;
          const query = { _id: channel_id, users: _id };
          const cursor = await channels.find(query);
          if(await cursor.count() === 0) {
            // add to group
            const query = { _id: channel_id };
            const update = { $push: { users: _id } };
            const doc = await channels.updateOne(query, update);
            console.log(doc)
            res.send({success: true, doc});
          } else if (await cursor.count() !== 0) {
            res.send({success: false, error: 'User already in channel'})
          }
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  removeUserFromChannel: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const channel_id = ObjectId(req.body.channel_id);
    const user_id = ObjectId(req.body.user_id);
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const channels = database.collection("channels");
        const query = { _id: channel_id };
        const update = { $pull: { users: user_id } }
        const doc = await channels.updateOne(query, update);
        console.log(doc)
        res.send({success: true, doc});
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  removeUserFromGroupAssis: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const group_id = ObjectId(req.body.group_id);
    const user_id = ObjectId(req.body.user_id);
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const groups = database.collection("groups");
        const query = { _id: group_id };
        const update = { $pull: { groupAssisUsers: user_id } }
        const doc = await groups.updateOne(query, update);
        console.log(doc)
        res.send({success: true, doc});
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
        res.send({success: true, insertedId: result.insertedId});
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
        res.send({success: true, doc});
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  removeUserFromGroup: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const group_id = ObjectId(req.body.group_id);
    const user_id = ObjectId(req.body.user_id);
    
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const groups = database.collection("groups");
        const query = { _id: group_id };
        const update = { $pull: { users: user_id } }
        const doc = await groups.updateOne(query, update);
        console.log(doc)
        res.send({success: true, doc});
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  // Users
  getAllUsers: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const users = database.collection("users");
        const projection = { username: 1, email: 1, role: 1, profileImage: 1 };
        const cursor = await users.find().project(projection).toArray();
        if (!cursor) {
          res.send({ success: false, error: "No users found"})
        } else {
          res.send({ success: true, users: cursor })
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  getUser: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const _id = ObjectId(req.body.user_id);

    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const users = database.collection("users");
        const query = { _id };
        const options = { projection: {username: 1, email: 1, role: 1, profileImage: 1} };
        const cursor = await users.findOne(query, options);
        if (!cursor) {
          res.send({ success: false, error: "No users found"})
        } else {
          res.send({ success: true, user: cursor })
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  getUsersLike: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const user_query = req.body.user_query;

    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const users = database.collection("users");
        const query = { email: { $regex: user_query } };
        const projection = {username: 1, email: 1, role: 1, profileImage: 1}
        const cursor = await users.find(query).project(projection).toArray();
        console.log(query, cursor)
        if (!cursor) {
          res.send({ success: false, error: "No users found"})
        } else {
          res.send({ success: true, users: cursor })
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  getUsersDetails: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const userIdArray = req.body;
    const userObjectIdArray = userIdArray.map(x => ObjectId(x))

    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const users = database.collection("users");
        const query = { _id: { $in: userObjectIdArray } }
        const projection = { username: 1, email: 1, role: 1, profileImage: 1 };
        const cursor = await users.find(query).project(projection).toArray();
        if (!cursor) {
          res.send({ success: false, error: "No users found"})
        } else {
          res.send({ success: true, users: cursor })
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  updateUserProfileImage: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const _id = ObjectId(req.body.user_id);
    const imageName = req.body.imageName;

    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const users = database.collection("users");
        const query = { _id };
        const update = { $set: {profileImage: imageName} }
        const doc = await users.updateOne(query, update);
        console.log(doc)
        res.send({success: true, modifiedCount: doc.modifiedCount});
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  deleteUser: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const _id = ObjectId(req.body.user_id);

    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const users = database.collection("users");
        const query = { _id };
        const result = await users.deleteOne(query);
        if (result.deletedCount === 1) {
          console.log("Successfully deleted one document.");
          res.send({success: true})
        } else {
          console.log("No documents matched the query. Deleted 0 documents.");
          res.send({success: false})
        }
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },
  
  promoteToGroupAdmin: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const _id = ObjectId(req.body.user_id);

    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const users = database.collection("users");
        const query = { _id };
        const update = { $set: {role: "groupAdmin"} }
        const doc = await users.updateOne(query, update);
        console.log(doc)
        res.send({success: true, modifiedCount: doc.modifiedCount});
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

  promoteToSuperAdmin: (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }
    const _id = ObjectId(req.body.user_id);

    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("chatters");
        const users = database.collection("users");
        const query = { _id };
        const update = { $set: {role: "superAdmin"} }
        const doc = await users.updateOne(query, update);
        console.log(doc)
        res.send({success: true, modifiedCount: doc.modifiedCount});
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  },

};
