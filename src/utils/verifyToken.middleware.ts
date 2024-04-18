import { verifyToken, generateToken } from "@utils/tokens"

export const verifyTokenMid = async (req, res, next) => {
    try {
        if (!req.body.token) {
            return res.status(403).json({ message: 'Token missing' });
        }
        const verification = await verifyToken(req.body.token);
        if (!verification) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        const token = generateToken(verification, {expiresIn: '10m'})
        req.newToken = token
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error });
    }
};
