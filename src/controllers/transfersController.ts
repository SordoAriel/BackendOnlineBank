import { transfersModel } from "@models/transfersModel"
import { accountModel } from "@models/accountModel";


export const get = async (sourceAccount: string) => {

    const foundTransfers = await accountModel.find({sourceAccount: sourceAccount})
    if(!foundTransfers/*._id*/){
        return -1
    } else {
        return await transfersModel.find({sourceAccount: foundTransfers/*._id*/});
    }
}

export const getByDestinationAccount = async (destinationAccount: string) => {
    const foundTransfers = await accountModel.find({destinationAccount: destinationAccount})
    if(!foundTransfers/*._id*/){
        return -1
    } else {
        return await transfersModel.find({sourceAccount: foundTransfers/*._id*/});
    }
}

export const create = async (data) => {
    if(data.amount && data.sourceAccount && data.destinationAccount) {
        const transfer = transfersModel.create(data)
        return transfer
    } else {
        return -1
    }
}
