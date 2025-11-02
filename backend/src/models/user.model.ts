import mongoose, {Schema, model, Document} from "mongoose"

export type UserRole = "admin" | "team" | "player"

export interface IUser extends Document{
    email: string
    password: string
    role: UserRole
    name: string
    phone: string
    createdAt: Date
    status: "active" | "suspended"
    teamName?: string
    position?: string
    rating?: number
    sanctions?: {
        reason: string,
        matchId: string,
        matchName: string,
        startDate: Date,
        endDate: Date
    }[]
    noShowCount?: number

}

const userSchema = new Schema<IUser>({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String, 
        enum: ["admin", "team", "player"], 
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    phone: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    status: {
        type: String,
        enum: ["active", "suspended"],
        default: "active"
    },
    teamName: {
        type: String
    },
    position: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,    
        max: 10
    },
    sanctions: [
        {
            reason: String,
            matchId: String,
            matchName: String,
            startDate: Date,
            endDate: Date

        },
    ],
    noShowCount:{
        type: Number,
        default: 0
    },
})

const UserModel = mongoose.model<IUser>("User", userSchema)
export default UserModel