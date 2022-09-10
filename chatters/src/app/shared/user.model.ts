import { v4 as uuidv4 } from 'uuid';

export class User {
    id: string;
    role: Role;

    constructor(public username: string, public email: string) {
        this.username = username;
        this.email = email;
        this.id = uuidv4();
        this.role = Role.User;
    }
}

enum Role {
    User,
    GroupAssis,
    GroupAdmin,
    SuperAdmin
}