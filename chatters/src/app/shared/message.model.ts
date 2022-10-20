import { User } from "./user.model"

export interface Message {
    _id: string
    user: User
    message: string
    type: string
}