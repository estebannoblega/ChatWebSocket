/**Aqui se reliza la conexion a la Base de datos */

import mysql from 'mysql';


const dbConection = ()=>{
    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user_linux',
    password: 'esteban',
    database: 'socketcrud'
});
    return connection;
}
export default dbConection;