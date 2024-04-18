import { generateToken } from '@utils/tokens'
import { hashData, compareData } from '../utils/bcrypt'
import { usersModel } from '@models/usersModel'

type UserData = {
    firstName: string,
    lastName: string, 
    telephone: string,
} & UserLogin

type UserLogin = {
    email: string,
    password: string
}

type UpdateData = {
    firstName?: string,
    lastName?: string, 
    telephone?: string,
    email: string,
    password?: string
}

export const register = async (userData: UserData) => {
    try {
        const hashedPassword = await hashData(userData.password)
        const newUser = {...userData, password:hashedPassword}
        if(newUser.firstName && newUser.lastName && newUser.email && newUser.telephone && newUser.password){
            const exist = await usersModel.findOne({ email: newUser.email })
            if(exist){
                return -1
            }
            await usersModel.create(newUser)
            return 1
        } else {
            return -2
        }
    } catch (error) {
        return error
    }
}

export const validate = async (email: string) => {
    const user = await usersModel.findOne({email: email})
    if(user){
        await usersModel.findOneAndUpdate({email: email}, {isValid: true})
        return 'Validation completed'
    } else {
        return -1
    }    
}

export const loginUser = async (userLogin: UserLogin) => {
    try {
        const user = await usersModel.findOne({email: userLogin.email})
        const validPassword = await compareData(userLogin.password, user.password)
        if(!validPassword) {
            return -1
        } else {
            const token = generateToken(user.email, {expiresIn: '10m'});
            return token;
        }
    } catch (error) {
        return error
    }
}

export const getUserByEmail = async (email: string) => {
    const user = await usersModel.findOne({email: email})
    if(!user){
        return undefined
    } else {
        const { firstName, lastName, email: userEmail, telephone, isValid } = user;
        return { firstName, lastName, email: userEmail, telephone, isValid };
    }
}

export const update = async (updateData: UpdateData) => {
    if(updateData.hasOwnProperty("password")){
        const hashedPassword = await hashData(updateData.password)
        updateData.password = hashedPassword;
    }
    const updatedUser: UpdateData = await usersModel.findOneAndUpdate({email: updateData.email}, { $set: updateData }, {new: true})
    const { firstName, lastName, email: userEmail, telephone } = updatedUser;
    return { firstName, lastName, email: userEmail, telephone };
}

export const deleteOne = async (email: string) => {
    const user = await usersModel.findOne({email: email})
    if(!user){
        return -1
    }
    const deleteUser = await usersModel.findOneAndDelete({email: email})
    if(!deleteUser){
        return -1
    }
    return deleteUser
}


