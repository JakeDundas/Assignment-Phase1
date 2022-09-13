# Assignment-Phase1
##### Jake Dundas - 3813ICT Software Frameworks - Assignment Phase 1

## Git Repository
    
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



## 3. Angular Architecture 


