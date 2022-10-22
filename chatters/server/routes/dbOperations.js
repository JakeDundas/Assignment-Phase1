MongoClient = require("mongodb").MongoClient;
ObjectId = require('mongodb').ObjectId

const uri = "mongodb://localhost:27017/";

module.exports = {
  getMessageHistory: (channel_id) => {
    return new Promise( (resolve, reject) => {

      const _id = ObjectId(channel_id);
      
      const client = new MongoClient(uri);
      async function run() {
        try {
          const database = client.db("chatters");
          const channels = database.collection("channels");
          const options = { projection: { messages: 1 } };
          const query = { _id }
          const result = await channels.findOne(query, options);
          if (!result) {
            resolve({success: false, error: "Unable to retrieve message history"})
          } else {
            resolve({success: true, channel: result})
          }
        } finally {
          await client.close();
        }
      }
      run().catch(console.dir);
    })
  },

  addMessageToChannel: (channel_message) => {
    return new Promise( (resolve, reject) => {
      const _id = ObjectId(channel_message.channel_id);
      const user_id = ObjectId(channel_message.user_id);
      const message_id = new ObjectId();
      const client = new MongoClient(uri);
      async function run() {
        try {
          const database = client.db("chatters");
          const channels = database.collection("channels");
          const query = { _id };
          const update = { $push: { messages: {_id: message_id, user_id, message: channel_message.message, type: 'text'} } };
          const result = await channels.updateOne(query, update);
          if (result.modifiedCount === 0) {
            resolve({success: false, error: "Message not sent"})
          } else {
            resolve({success: true, message: {_id: message_id, user_id, message: channel_message.message, type: 'text'}})
          }
        } finally {
          await client.close();
        }
      }
      run().catch(console.dir);
    })
  },

  addImageMessageToChannel: (channel_message) => {
    return new Promise( (resolve, reject) => {
      const _id = ObjectId(channel_message.channel_id);
      const user_id = ObjectId(channel_message.user_id);
      const message_id = new ObjectId();
      const client = new MongoClient(uri);
      async function run() {
        try {
          const database = client.db("chatters");
          const channels = database.collection("channels");
          const query = { _id };
          const update = { $push: { messages: {_id: message_id, user_id, message: channel_message.message, type: 'image'} } };
          const result = await channels.updateOne(query, update);
          if (result.modifiedCount === 0) {
            resolve({success: false, error: "Message not sent"})
          } else {
            resolve({success: true, message: {_id: message_id, user_id, message: channel_message.message, type: 'image'}})
          }
        } finally {
          await client.close();
        }
      }
      run().catch(console.dir);
    })
  },

};
