import { Schema, model } from "mongoose";

type BalanceType = "extraccion" | "transferencia" ;
interface IBalance {
    id: Number;
    baseAccount: String;
    amount: Number;
    targetAccount?: String;
    balance: BalanceType;
}

const balanceSchema = new Schema<IBalance>({
    id:{
        type:Number,
        unique: true,
    },
    baseAccount: {
        type: String,
        ref: "accounts",
        required: true,
    },
    targetAccount: {
        type: String,
        ref: "accounts", 
    },
    amount: {
        type: Number,
        required: true,
    },
    balance:{
        type: String,
        required:true,
    }
});
export const balanceModel = model<IBalance>('balances', balanceSchema);


