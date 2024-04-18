import 'dotenv/config'
import jwt from "jsonwebtoken"
import nodemailer from 'nodemailer'

export const generateToken = (user, expiresIn) => {
    const token = jwt.sign({user}, process.env.JWT_SECRET_KEY, expiresIn)
    return token
}

export const verifyActivationCode = (token: string, code: string): Promise<string | -1> => {
    return new Promise((resolve) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded: any) => {
            if (err) {
                resolve(-1);
            } else if(decoded.user.key !== code){
                resolve(-1)
            } else {
                const email = decoded.user.email;
                resolve(email);
            }
        })
    })
}

export const verifyToken = (token): Promise<string> => {
    return new Promise((resolve) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded: any) => {
            if (err) {
                resolve(null);
            } else {
                const email = decoded.user;
                resolve(email);
            }
        });
    });
};

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

export const generateValidationKeyAndSendEmail = async (user) => {
    const key = keyGenerate();
    generateTokenEmail(user, key)
    return {code: key}
}

const generateTokenEmail = async (user, key) => {
    const validationMail = {
        from: process.env.GMAIL_USER,
        to: user.email,
        subject: `FinWish - Validación de cuenta`,
        html: `<h1>Validación de cuenta</h1>
        <h2>Estimado/a ${user.firstName} ${user.lastName}</h2>
                <p>¡Nos complace que pases a formar parte de FinWish!</p>
                <p> A continuación, te compartimos el token de activación de tu cuenta:</p>
                <span>${key}</span>
                <p>Para finalizar el proceso, inserta tu token aquí:</p>
                <a>${process.env.FRONT_URL}/user/activation</a>
                <p>¡Bienvenido, que tengas buen ahorro!</p>
                <p>Atentamente,</p>
                <p>Equipo de FinWish</p>
                `
    }
    await transporter.sendMail(validationMail)
}

export const newPasswordEmail = async (user) => {
    const token = generateToken(user.email, {expiresIn: '5m'})
    const changePasswordEmail = {
        from: process.env.GMAIL_USER,
        to: user.email,
        subject: `FinWish - Cambio de contraseña`,
        html: `<h1>Cambio de contraseña</h1>
                <p>Este es tu código para cambiar la contaseña:</p>
                <span>${token}</span>
                <p>Para finalizar el proceso, inserta tu token aquí:</p>
                <a>${process.env.FRONT_URL}/passwordReset/change</a>
                <p>Atentamente,</p>
                <p>Equipo de FinWish</p>
                `
    }
    await transporter.sendMail(changePasswordEmail)
}

const keyGenerate = () => {
    let key = '';

    for (let i = 0; i < 6; i++) {
        key += Math.floor(Math.random() * 10); 
    }

    return key;
}
