import { register, validate, loginUser, getUserByEmail, update, deleteOne } from '@controllers/usersController'
import { generateToken, verifyActivationCode, verifyToken, newPasswordEmail, generateValidationKeyAndSendEmail } from '@utils/tokens'


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

export const signup = async (req, res) => {
    const userData: UserData = {...req.body}
    try {
        const response = await register(userData)
        if(!response){
            res.status(400).json({message: "Couldn´t create user"})
        } else if(response === -1) {
            res.status(409).json({message: "User already exists"})
        } else if(response === -2){
            res.status(400).json({message: 'Need to complete all required fields'})
        } else {
            res.status(200).redirect('/api/auth/sendValidationEmail')
        } 
    } catch (error) {
        res.status(500).json({error})
    }
}

export const sendValidationEmail = async (req, res) => {
    try {
        const userData = await getUserByEmail(req.body.email)
        if(userData){
        const validationCredentials = await generateValidationKeyAndSendEmail(userData)
        const token = generateToken({email: userData.email, key: validationCredentials.code}, {expiresIn: '24h'})
        res.status(200).json({message: 'Expecting validation', token: token})
        } else {
            res.status(400).json({message: 'User not found'})
        }        
    } catch (error) {
        res.status(500).json({error})
    }
}

export const validateUser = async (req, res) => {
    const { key, token } = req.body
    try {
            const isValid:string | -1 = await verifyActivationCode(token, key)
        if(isValid === -1){
            res.status(401).json("Invalid token")
        } else {
            await validate(isValid)
            res.status(200).json({message: "Validation successful"})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

export const login = async (req, res) => {
    const userData = {...req.body}
    try {
        const user = await getUserByEmail(userData.email)
        if(!user){
            res.status(400).json({message: 'User doesn´t exists'})
        } else {
            if(!user.isValid) {
                res.status(401).redirect('/api/auth/sendValidationEmail')
            } else {
                const response = await loginUser(userData)
            if(response === -1) {
                res.status(400).json({message: "Couldn´t log in"})
            } else {
                res.status(200).json({token: response})
            }
            }
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

export const getUser = async (req, res) => {
    try {
    if(!req.body.user){
        res.status(400).json({message: 'Can´t search user without email'})
    } else {
        const userData = await getUserByEmail(req.body.email)
        if(!userData){
            res.status(400).json({message: "User not found"})
        } else {
            res.status(200).json({message: "User found", user: userData})
        }
    }
    } catch (error) {
        res.status(500).json({error})
    }
}

export const updateUser = async (req, res) => {
    const newData: UpdateData = {...req.body}
    try {        
        const userData = await update(newData)
        if(!userData){
            res.status(400).json({message: 'Update failed'})
        }
        res.status(200).json({message: "Update successful", user: userData, token: req.newToken})
    } catch (error) {
        res.status(500).json({error})
    }
}

export const updatePassword = async (req, res) => {
    const {token, email, password} = req.body
    try {
        const checkToken = await verifyToken(token)
        if(checkToken === email){
            await update({email, password})
            res.status(200).json({message: 'Updated successfuly'})
        } else {
            res.status(400).json({message: 'Invalid token'})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

export const sendPasswordReset = async (req, res) => {
    try {
        const userData = await getUserByEmail(req.body.email)
        if(userData){
        await newPasswordEmail(userData)
        res.status(200).json({message: 'New Password email sent'})
        } else {
            res.status(400).json({message: 'User not found'})
        }        
    } catch (error) {
        res.status(500).json({error})
    }
}

export const deleteUser = async (req, res) => {
    try {        
        const deleteUser = await deleteOne(req.body.email) 
        if(deleteUser === -1){
            return res.status(400).json({message: "User not found"})
        }
        res.status(200).json({message: "User deleted", token: req.newToken})
    } catch (error) {
        res.status(500).json({error})
    }
}
