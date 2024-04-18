import { Schema, SchemaTypes, model } from "mongoose";

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string,
    password: string;
    role: string;
    accounts: [Schema.Types.ObjectId];
    lastConnection: Date;
    isValid: boolean;
}

const usersSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telephone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "company", "admin"]
    },
    accounts: [{
        type: SchemaTypes.ObjectId,
        ref: "accounts",
    }],
    lastConnection: {
        type: Date,
        required: true,
        default: Date.now
    },
    isValid: {
        type: Boolean,
        required: true,
        default: false
    }
});

export const usersModel = model<IUser>('users', usersSchema);
