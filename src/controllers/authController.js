//controllers/authController

import * as authModel from '../models/authModel.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';

//controlador para registrar un nuevo usuario
export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        //Validamos el formato del email
        if(!validator.isEmail(email)){
            return res.status(400).json({ message : 'Formato de correo inválido' });
        }
        //validar formato de contraseña solicitado
        if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)){
            return res.status(400).json({ message : 'La contraseña debe tener al menos 1 mayúscula y 1 minúscula 1 número y con mínimo 8 caracteres' });
        }
        
        //validar si el email ya esta registrado
        const existingUser = await authModel.getUserByEmail(email);
        if(existingUser) {
            return res.status(400).json({ message : 'El correo electrónico ya esta en uso' });
        }
        
        await authModel.registerUser({ name, email, password });
        res.status(201).json({ message : 'Usuario registrado exitosamente' });        
    } catch (error) {
        return res.status(500).json({ message : error.message });
    }
};

//Función para iniciar sesión
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validamos el formato del email
        if(!validator.isEmail(email)){
        return res.status(400).json({ message : 'Formato de correo inválido' });
        }
        
        const user = await authModel.loginUser(email, password);

        //generar el token de autenticación
        const token = jwt.sign({ userId: user.id, email: user.email }, 'secret_key');
        //asignar el token a una cookie
        res.cookie('token', token, {httpOnly: true });

        res.status(201).json({ message : 'Inicio de sesión exitoso', email, token });

    } catch (error) {
      return res.status(401).json({ message : error.message }); 
    }
}