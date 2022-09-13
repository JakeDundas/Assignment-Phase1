import { v4 as uuidv4 } from 'uuid';
import { User } from './user.model';

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