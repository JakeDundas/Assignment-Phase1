const uuidv4 = require("uuid").v4;

class User {
    constructor(userObject) {
        if(userObject.id) {
            this.username = userObject.username;
            this.email = userObject.email;
            this.id = userObject.id;
            this.role = userObject.role;
        } else {
            this.username = userObject.username;
            this.email = userObject.email;
            this.id = uuidv4();
            this.role = "user";
        }
    }
}

module.exports = {
    User
}