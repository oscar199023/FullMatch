import { Router } from "express"
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { register, login,  } from "../controllers/auth.controller"
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.post("/auth/register", 
    body('name')
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio'),

    body('mail')
        .notEmpty()
        .withMessage('El mail de usuario es obligatorio'),

    body('phone')
        .isEmail()
        .withMessage('El telefono de usuario no es valido'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('El password minimo es de 6 caracteres'),
    handleInputErrors,

    register)


router.post('/auth/login',

    body('email')
        .isEmail()
        .withMessage('El email de usuario no es valido'),

    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),

    handleInputErrors,
    login
)

router.get('/user', authenticate)
    export default router