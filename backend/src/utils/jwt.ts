import jwt, {JwtPayload}  from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

//Generate token
export const generateToken = (payload : JwtPayload) => {
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '7d'
    })
}

//Verify token
export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded
    } catch {
        return null
    }
}