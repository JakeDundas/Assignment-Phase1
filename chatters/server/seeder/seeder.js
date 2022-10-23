const { faker } = require('@faker-js/faker');
MongoClient = require("mongodb").MongoClient;
ObjectId = require('mongodb').ObjectId
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

let usersIds = [];
let channelsIds = [];
let groupsIds = [];

async function run() {
    try {
        // users
        const database = client.db("chatters");
        const users = database.collection("users");
        const groups = database.collection("groups");
        const channels = database.collection("channels");
        
        const usersDrop = await users.drop();
        const groupsDrop = await groups.drop();
        const channelsDrop = await channels.drop();

        await users.createIndex( { email: "text" } )
        
        const _id = new ObjectId()
        const user = { 
            _id,
            username: 'superAdmin', 
            email: 'super@super.com', 
            password: 'password', 
            role: 'superAdmin',
            profileImage: 'default_profile.png',
        } 
        const result = await users.insertOne(user);
        usersIds.push(_id)
        for(i=0; i<30 ; i++) {
            const _id = new ObjectId()
            const user = { 
                _id,
                username: faker.internet.userName(), 
                email: faker.internet.email(), 
                password: 'password', 
                role: 'user',
                profileImage: 'default_profile.png',
            } 
            const result = await users.insertOne(user);
            usersIds.push(_id)
        }
        
        //groups
        for(i=0; i<5; i++) {
            const _id = new ObjectId()
            const group = { 
                _id,
                name: faker.lorem.word(), 
                channels: [], 
                users: usersIds, 
                groupAssisUsers: []
            } 
            const result = await groups.insertOne(group);
            groupsIds.push(_id)
        }

        //channels
        for(i=0; i<1; i++) {
            const channelId = new ObjectId()
            //messages
            channelMessages = []
            for(i=0; i<10; i++) {
                const _id = new ObjectId()
                const message = { 
                    _id,
                    user_id: usersIds[Math.floor(Math.random() * usersIds.length)],
                    message: faker.lorem.sentence(),
                    type: "text",
                }
                channelMessages.push(message)
            }
            const channel = { 
                _id: channelId,
                group_id: groupsIds[0],
                name: faker.lorem.word(), 
                users: usersIds, 
                messages: channelMessages
            } 
            const result = await channels.insertOne(channel);
            channelsIds.push(channelId)
        }
        const projection = { name: 1 };
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

