import { Schema, SchemaTypes, model } from "mongoose";

interface ITransfer {
    amount: number;
    sourceAccount: Schema.Types.ObjectId;
    destinationAccount: Schema.Types.ObjectId;
    reason?: string;
    dateOfTransfer: Date;
}

const transfersSchema = new Schema<ITransfer>({
    amount: {
        type: Number,
        required: true,
    },
    sourceAccount: {
        type: SchemaTypes.ObjectId,
        ref: "accounts",
        required: true,
    },
    destinationAccount: {
        type: SchemaTypes.ObjectId,
        required: true,
    },
    reason: {
        type: String,
    },
    dateOfTransfer: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

export const transfersModel = model<ITransfer>("transfers", transfersSchema);
