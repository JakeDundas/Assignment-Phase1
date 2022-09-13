const uuidv4 = require("uuid").v4;
const { User } = require("./user.js");

class Channel {
    users = new Map();
    messageHistory = [];
    active = false;

    constructor(channelObject) {
        if(channelObject.id) {
            this.name = channelObject.name;
            this.id = channelObject.id;
            this.messageHistory = channelObject.messageHistory;
            this.active = channelObject.active;

            channelObject.users.forEach((userObject) => {
                const user = new User(userObject);
                this.users.set(user.id, user);
            });
        } else {
            this.name = channelObject.name;
            this.id = uuidv4();
        }
    }
}

module.exports = {
    Channel
}