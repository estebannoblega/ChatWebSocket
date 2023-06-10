/**Contiene la conexion y eventos que el servidor Socket puede tener o recibir */
import dbConection from "./db"
export default (io) =>{
    //Aqui se escuchan y envian los eventos del socket
    //el socket que se utiliza aqui esta relacionado solo con la ventana de 1 cliente, el io sería el servidor que es capaz de comunicarse con todas las conexiones
    const conection = dbConection();
    io.on('connection', (socket)=>{
        //Traigo los mensajes
        const emitMsg = ()=> conection.query("SELECT * FROM mensajes",function(error, results, fields){
            if(error){
                throw error;
            }
            const jsonData = JSON.parse(JSON.stringify(results));
            //envio estos datos al cliente
            io.emit('s:loadMessages',jsonData)
        });
        emitMsg();
        socket.on('c:newMessage',(data)=>{
            //console.log(data);
            //Una vez recibidos los almacenamos en la base de datos
            const min = 1;   // Valor mínimo deseado
            const max = 100; // Valor máximo deseado
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            const query = 'INSERT INTO Mensajes VALUES (?,?,?)';
            const nuevoMensaje=conection.query(query,[randomNumber,data.user,data.message],function(error,results,fields){
                if(error) {throw error};

            })    
            //una vez recibido el dato y guardado se debe emitir este cambio a los demas clientes
            //envio así xq si mando nuevoMensaje.values me retorna un un array y no un objeto
            //se utiliza io para mandar a todos los clientes conectados y no solo al que establecio la comuniccacion (socket)
            io.emit('s:newMessage',{
                Id: randomNumber,
                user: data.user,
                mensaje: data.message
            })
        })

        socket.on('c:deleteMessage',id=>{
            //Una vez recibido el ID procedemos a borrarlo de la BD
            conection.query("DELETE FROM Mensajes WHERE Id=?",id,function(error,results,fields){
                if(error) {throw error};
            })
            //Una vez borrado actualizamos la lista de notas traidas desde la bd
            emitMsg();
        })

        socket.on('c:getMessage',id=>{
            //una vez que recibo del cliente el id lo busco en la bd
            const message = conection.query("SELECT * FROM Mensajes WHERE Id=?",id,function(error,results,fields){
                if(error){throw error};
                //console.log(JSON.stringify(results)); una vez que se obtiene el mensaje se lo manda al cliente
                socket.emit('s:selectedMessage',JSON.parse(JSON.stringify(results[0])));   //ahora el cliente debe escuchar este evento
            })
            
        })
        
        socket.on('c:updateMessage',data=>{
            conection.query("UPDATE Mensajes SET mensaje=?,user=? where id=?",[data.mensaje,data.user,data.id],function(error,results,fields){
                if(error){throw error};
            })
            //debemos emitir un evento para los mensajes actualizados
            emitMsg();
        })

    })
    

    
}


/**
 * Este método trae todos los mensajes almacenados en la BD
 * @param {*} conn: Representa la conexion a la BD 
 */
function TraerMensajes(conn){
    conn.query("SELECT * FROM mensajes",function(error, results, fields){
        if(error){
            throw error;
        }
        const jsonData = JSON.stringify(results);
        console.log(jsonData);
    });
}