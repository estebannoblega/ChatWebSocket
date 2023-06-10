//Socket del cliente, debe tener todas las funciones para interactuar con el backend: guardar, leer, eliminar, modificar TODA INTERACCION CON EL BACKEND
const socket = io()    //con esto intentará conectarse al backend
/**
 * Esta funcion pide los datos al back
 */
export const loadMessages = (callback)=>{
    socket.on('s:loadMessages',callback);
}

export const saveMessages = (user,message)=>{
    //emitimos un evento, para que desde elcliente le enviemos los datos del formulario
    socket.emit('c:newMessage',{
        user,
        message
    })
}
/**
 * Esta funcion sirve para escuchar cuando el servidor envia el evento una vez que se almacena el dato en la DB
 */
export const onNewMessage =(callback) =>{
    socket.on('s:newMessage',callback)  //en este callback realizamos las tareas que hacermos sobre ese nuevo mensaje
}

export const deleteMessage = id =>{
    socket.emit('c:deleteMessage',id);  //con esto enviamos el id al back para que lo elimine de la bd
}

export const getMessageById = id =>{
    socket.emit('c:getMessage',id);
}

export const onSelected = (callback) =>{
    socket.on('s:selectedMessage',callback)
}

export const updateMessage =(id, user, mensaje) =>{
    socket.emit('c:updateMessage',{
        id,
        user,
        mensaje,
    });
}