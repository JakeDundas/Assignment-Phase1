# Assignment-Phase1
##### Jake Dundas - 3813ICT Software Frameworks - Assignment Phase 1

## Git Repository
   
Throughout development, Git was used primarily through the desktop app GitHub Desktop. Regular commits were made using the following message templates:
-	feat: added X to Y
-	refactor: have X use add()
I found this method provided a more insightful view into the commit history. Branching was also performed when attempting a more significant development addition.
   
The rest of this README provides insights into the following project aspects:
   1. Data Structures
   2. REST API
   3. Angular Architecture


## 1. Data Structures

### User

A user is represented by a User class. This decision was due to the fact each User required an ID. The if statement in the constructor provides the flexibility to generate a brand new User, or to generate a User instance based on an Object representation of a User (like what output from a JSON file). 

When creating a new User, the constructor generates a UUID for the User. This is from the npm package 'uuid'. The role property that consists of the User, Group Admin, and Super Admin predfined constants.
```
import { v4 as uuidv4 } from 'uuid';

export class User {
    username: string;
    email: string
    id: string;
    role: Role;

    constructor(public userObject: any) {
        if(userObject.id) {
            this.username = userObject.username;
            this.email = userObject.email;
            this.id = userObject.id;
            this.role = userObject.role;
        } else {
            this.username = userObject.username;
            this.email = userObject.email;
            this.id = uuidv4();
            this.role = Role.User;
        }
    }
}

export enum Role {
    User = "user",
    GroupAdmin = "groupAdmin",
    SuperAdmin = "superAdmin"
}
```
### Channel

A channel is represented by a Channel class for similar reasons as User. 

The users within a channel are structured within a Map<string, User> type. Each user can be accessed through its id variable.
```
export class Channel {
    name: string;
    id: string;
    users = new Map<string, User>;
    messageHistory: string[] = [];
    active: boolean = false;

    constructor(public channelObject: any) {
        if(channelObject.id) {
            this.name = channelObject.name;
            this.id = channelObject.id;
            this.messageHistory = channelObject.messageHistory;
            this.active = channelObject.active;

            channelObject.users.forEach((userObject: any) => {
                const user = new User(userObject);
                this.users.set(user.id, user);
            });
        } else {
            this.name = channelObject.name;
            this.id = uuidv4();
        }
    }
}
```

### Group

A group is represented by a Group class for similar reasons as User. 

The users within a group are structured within a Map<string, User> type. Each user can be accessed through its id variable. And similarly with the Channels and Group Assis Users within a group. 
```
export class Group {
    name: string;
    id: string;
    channels = new Map<string, Channel>;
    users = new Map<string, User>;
    groupAssisUsers = new Map<string, User>;

    constructor(public groupObject: any) {
        if(groupObject.id) {
            this.name = groupObject.name;
            this.id = groupObject.id;
            
            groupObject.channels.forEach((channelObject: any) => {
                const channel = new Channel(channelObject);
                this.channels.set(channel.id, channel);
            });
            
            groupObject.users.forEach((userObject: any) => {
                const user = new User(userObject);
                this.users.set(user.id, user);
            });

            groupObject.groupAssisUsers.forEach((groupAssisUserObject: any) => {
                const groupAssisUser = new User(groupAssisUserObject);
                this.users.set(groupAssisUser.id, groupAssisUser);
            });
        } else {
            this.name = groupObject.name;
            this.id = uuidv4();
        }
    }
}
```

## 2. REST API

There are currently two routes for communication between the Angular front end and Node.js server:

### Verify User
```
routeFunc: (app, usersList) =>
 app.post("/auth", (req, res) => {
   if (!req.body) {
     return res.sendStatus(400);
   }
   usersList.forEach(user => {
     if (req.body.username == user.username && req.body.email == user.email) {
       return res.send({valid: true, user});
     }
   });

   res.send({valid: false});
 })
```
When a user attempts to log in with their username and email, a post request is made to the server's /auth route. This route takes as input, the list of all users that have been created. If the request body contains a username and email that matches any of the user list users, it responds with an object containing a 'valid: true' property, as well as the user details (to currently store in the browsers local storage). Otherwise responds with {valid: false}

### New User
```
routeFunc: (app, dataManager) =>
 app.post("/newUser", (req, res) => {
   if (!req.body) {
     return res.sendStatus(400);
   }
   dataManager.usersList.forEach(user => {
     if (req.body.username == user.username) {
       return res.send({valid: false});
     }
   })
   const newUser = new User({username: req.body.username, email: req.body.email})
   dataManager.usersList.set(newUser.id, newUser);
   dataManager.saveUsersToFile(dataManager.usersList);
   console.log(dataManager.usersList)
   console.log(newUser)
   res.send({valid: true, newUser});
 })
```
When a user attempts to create a new user with a username and email, a post request is made to the server's /newUser route. This route takes as input, a dataManagement object. If the request body contains a username that matches any of the user list users, it responds with an object containing {valid: false}. Otherwise it creates a new User using the username and email provided, adds it to the global list of users and saves that list to file, and responds with a {valid: true, newUser} as well as the new user (to be displayed on the front end).

## 3. Angular Architecture 

### Components

#### Login Component

![image](https://user-images.githubusercontent.com/103618540/190098571-9c1345e2-121e-44a6-b738-024972700220.png)

The login component is responsible for taking the username and email input, sending a post request to the server to verify user, and .

#### Groups Component

![image](https://user-images.githubusercontent.com/103618540/190093798-a7797096-8d70-4b71-93d3-618ee470f360.png)

The groups component is responsible for displaying all of the appropriate Group instances for a given user. A regular user will only see the groups that they have been added to, where as a "Super Admin" or "Group Admin" has access to all groups. Only a "Super Admin" or "Group Admin" will have the Add Group section displayed to them. This section allows new groups to be created.

#### Groups Component

![image](https://user-images.githubusercontent.com/103618540/190093798-a7797096-8d70-4b71-93d3-618ee470f360.png)

The groups component is responsible for displaying all of the appropriate Group instances for a given user. A regular user will only see the groups that they have been added to, where as a "Super Admin" or "Group Admin" has access to all groups. Only a "Super Admin" or "Group Admin" will have the Add Group section displayed to them. This section allows new groups to be created.

#### Groups Component

![image](https://user-images.githubusercontent.com/103618540/190093798-a7797096-8d70-4b71-93d3-618ee470f360.png)

The groups component is responsible for displaying all of the appropriate Group instances for a given user. A regular user will only see the groups that they have been added to, where as a "Super Admin" or "Group Admin" has access to all groups. Only a "Super Admin" or "Group Admin" will have the Add Group section displayed to them. This section allows new groups to be created.


