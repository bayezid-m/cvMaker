import { User } from "./User"

export interface Project {
    _id?: string
    email: string
    name: string
    description: string
    image: string
    user: User
}