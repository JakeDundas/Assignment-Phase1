const uuidv4 = require("uuid").v4;
const { User } = require("./user.js");
const { Channel } = require("./channel.js");

class Group {
    channels = new Map();
    users = new Map();
    groupAssisUsers = new Map();

    constructor(groupObject) {
        if(groupObject.id) {
            this.name = groupObject.name;
            this.id = groupObject.id;
            
            groupObject.channels.forEach((channelObject) => {
                const channel = new Channel(channelObject);
                this.channels.set(channel.id, channel);
            });
            
            groupObject.users.forEach((userObject) => {
                const user = new User(userObject);
                this.users.set(user.id, user);
            });

            groupObject.groupAssisUsers.forEach((groupAssisUserObject) => {
                const groupAssisUser = new User(groupAssisUserObject);
                this.users.set(groupAssisUser.id, groupAssisUser);
            });
        } else {
            this.name = groupObject.name;
            this.id = uuidv4();
        }
    }
}

module.exports = {
    Group
}