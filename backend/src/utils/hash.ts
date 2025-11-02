import bcrypt from 'bcryptjs'

//Hash password
export const hashPassword =async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

//Compare password
export const comparePassword = async ( password: string, hashed: string) => {
    const result = await bcrypt.compare(password, hashed)
    return result
}