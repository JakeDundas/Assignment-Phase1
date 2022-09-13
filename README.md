# Assignment-Phase1
##### Jake Dundas - 3813ICT Software Frameworks - Assignment Phase 1

## Git Repository



## Data Structures

#### User

A user is represented by a User class.
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



