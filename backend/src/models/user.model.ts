import mongoose, {Schema, model, Document} from "mongoose"

export type UserRole = "admin" | "team" | "player"

export interface IUser extends Document{
    email: string
    password: string
    role: UserRole
    name: string
    phone: string
    createdAt: Date
    
}