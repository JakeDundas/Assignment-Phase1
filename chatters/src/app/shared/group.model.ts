import { v4 as uuidv4 } from 'uuid';
import { Channel } from './channel.model';
import { User } from './user.model';

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