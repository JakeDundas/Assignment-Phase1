import { User } from "./user.model"

export interface Group {
    _id: string
    name: string
    groupAssisUsers: User[]
    users: User[]
}