# Assignment-Phase1
##### Jake Dundas - 3813ICT Software Frameworks - Assignment Phase 1

## Git Repository



## Data Structures

#### User

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
#### Channel

#### Group

## REST API



