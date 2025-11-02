import { Request, Response } from 'express'
import  User  from '../models/user.model'
import { hashPassword, comparePassword } from '../utils/hash'
import { generateToken } from '../utils/jwt'

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name, phone, role, teamName, position } = req.body
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const error = new Error('El usuario ya existe con ese mail ya existe')
            return res.status(400).json({ error: error.message } )
        }
        // Hashear la contraseña
        const hashedPassword = await hashPassword(password)
        // Crear el nuevo usuario
        const user = new User({
            email,
            password: hashedPassword,
            name,
            phone,
            role,
            teamName,
            position
        })
        await user.save()
        // Generar token JWT
        const token = generateToken({ id: user._id, role: user.role })

        res.status(201).json({ message: 'Usuario registrado exitosamente', token, user})
    } catch (e) {
        const error = new Error('Error en el Registro')
        res.status(500).json({  error: error.message  } );
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        // Buscar el usuario si existe
        const user = await User.findOne({ email })
        if (!user) {
            const error = new Error('El usuario no existe ')
            return res.status(400).json({ error: error.message })
        }

        // Comparar contraseñas
        const isValid = await comparePassword(password, user.password)
        if (!isValid) {
            const error = new Error('Credenciales inválidas')
            return res.status(400).json({ error: error.message })
        }
        // Generar token JWT
        const token = generateToken({ id: user._id, role: user.role })
        // Enviar respuesta con el token y datos del usuario
        res.json({ token, user })
    } catch (e) {
        const error = new Error('Credenciales inválidas')
        res.status(500).json({ error: error.message  } )
    }
}
