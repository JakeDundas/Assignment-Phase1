const fs = require('fs');
const { User } = require('../models/user');
require('./usersList.json')

class DataManager {
    usersListFile = "usersList.json";
    groupsListFile = "groupsList.json";
    usersList = new Map();
    groupsList;
    
    constructor() {
        this.initialiseDataFromFile()
    }

    initialiseDataFromFile() {
        const usersList = this.getUsersFromFile();
        usersList.forEach(userObj => {
            const user = new User(userObj);
            this.usersList.set(user.id, user)
        });
        // this.groupsList = this.getGroupsFromFile();
    }

    getUsersFromFile() {
        const jsonData = fs.readFileSync('./services/usersList.json', "utf8", (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err);
                return;
            }
            try {
                const user = JSON.parse(jsonString, this.reviver);
            } catch (err) {
                console.log("Error parsing JSON string:", err);
            }
        });
        return JSON.parse(jsonData, this.reviver)
    }

    getGroupsFromFile() {
        const jsonData = fs.readFileSync("./services/usersList.json", "utf8", (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err);
                return;
            }
            try {
                const groups = JSON.parse(jsonString, this.reviver);
            } catch (err) {
                console.log("Error parsing JSON string:", err);
            }
        });
        return JSON.parse(jsonData, this.reviver)
    }

    saveUsersToFile(usersList) {
        const jsonString = JSON.stringify(usersList, this.replacer, 2);
        fs.writeFile('./services/usersList.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        });
    }

    saveGroupsToFile(groupsList) {
        const jsonString = JSON.stringify(usersList, this.replacer, 2);
        fs.writeFile('./services/usersList.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        });
    }

    replacer(key, value) {
        if(value instanceof Map) {
            return {
            dataType: 'Map',
            value: Array.from(value.entries()),
            };
        } else {
            return value;
        }
    }
    
    reviver(key, value) {
        if(typeof value === 'object' && value !== null) {
          if (value.dataType === 'Map') {
            return new Map(value.value);
          }
        }
        return value;
    }
}

module.exports = {
    DataManager
}

