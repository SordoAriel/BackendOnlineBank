import { Schema, SchemaTypes, model } from "mongoose";

type CurrencyType = "Peso" | "Dolar" | "Euro";
type SymbolType = "$" | "U$S" | "€";

interface ICurrency {
    type: CurrencyType;
    symbol: SymbolType;
}

interface IAccount {
    accountNumber: string;
    owner: Schema.Types.ObjectId;
    amount: Number;
    currency: ICurrency;
    history: Schema.Types.ObjectId[];
}

const accountSchema = new Schema<IAccount>({
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        unique: true
    },
    currency: {
        type: String,
        required: true,
    },
    history: {
        type: [Schema.Types.ObjectId],
        ref: "balances"
    }
});

export const accountModel = model<IAccount>('accounts', accountSchema)