import { Education } from './Education';
import { Project } from './Project';
import { User } from "./User"

export interface UserCV {
    _id?: string
    user: User
    Education: Education[]
    project: Project[]
}