/**Aqui se reliza la conexion a la Base de datos */

import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();


const dbConection = ()=>{
    const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});
    return connection;
}
export default dbConection;