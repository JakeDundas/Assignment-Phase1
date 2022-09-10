import { v4 as uuidv4 } from 'uuid';
import { Channel } from './channel.model';

export class Group {
    id: string;
    channels: Channel[] = [];
    users: string[] = [];
    groupAssisUsers: string[] = [];

    constructor(public name: string) {
        this.name = name;
        this.id = uuidv4();
    }

    addNewChannel(channelName: string) {
        this.channels.push(new Channel(channelName));
    }
    

}