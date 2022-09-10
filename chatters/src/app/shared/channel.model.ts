import { v4 as uuidv4 } from 'uuid';
import { User } from './user.model';

export class Channel {
    id: string;
    public users: User[] = [];
    public messageHistory: string[] = [];

    constructor(public name: string) {
        this.name = name;
        this.id = uuidv4();
    }
}