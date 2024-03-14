// model/authModel.js
import { dbConfig } from '../config/db.config.js';
import mysql from 'mysql2/promise.js';
import bcrypt from 'bcrypt';

const pool = mysql.createPool(dbConfig);

//función para registrar el usuario
export const registerUser = async (userData) => {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (name, email, password) values (?,?,?)', [name, email, hashedPassword]);
};

//Esta función es para obtener un usuario que ya existe por medio del email
export const getUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
};

//función para inicio de sesión
export const loginUser = async (email, password) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    //if(rows.lenght === 0)
    if (!rows.length){
        throw new Error('Usuario no existe');
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new Error('Contraeña incorrecta');
    }

    return user;
};
