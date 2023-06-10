import {saveMessages,deleteMessage,getMessageById, updateMessage} from './socket.js'
//aqui contrendremos las funciones que interactuan con la interfaz de usuario: click en un formulario, etc. Esto esta relacionado con la logica de la interfaz
const messagesList = document.querySelector('#msg');
const user = document.querySelector('#user');
const message = document.querySelector('#message');
let saveId = "";//esta variable se utilizará para saber si un formulario ya existe o no


export const onHandleSubmit = (e)=>{
    e.preventDefault();
    // console.log('datos enviados');
    if(saveId){
        //quiere actualizar 
        // console.log('Actualizando');
        updateMessage(saveId,user.value,message.value)
    }else{
        //console.log('Creando');
        saveMessages(user.value,message.value);
    }
    //PARA QUE NO QUEDEN LOS CAMPOS QUE SE MODIFICARON EN EL FORMULARIO PODEMOS HACER
    saveId="";
    user.value="";
    message.value="";
}
//Funcion que renderiza 1 mensaje
export const messageUI = msg =>{
    const div = document.createElement('div');
    
    // console.log(msg);
    div.innerHTML= `
            <div class="card card-body rounded-0 mb-2 animate__animated animate__pulse">
                <div class="d-flex justify-content-between ">
                <h1>${msg.user}</h1>
                <div>
                    <button class="btn btn-danger delete" data-id="${msg.Id}">Delete</button>
                    <button class="btn btn-secundary update" data-id="${msg.Id}">Update</button>
                </div>
                </div>
                <p>${msg.mensaje}</p>
            </div>
    `
    const btnDelete = div.querySelector(".delete")  //obtengo la lista de botones
    const btnUpdate = div.querySelector(".update")
    btnDelete.addEventListener('click', e => deleteMessage(btnDelete.dataset.id))   //trae el id del mensaje al hacer click sobre el boton
    btnUpdate.addEventListener('click', e => getMessageById(btnUpdate.dataset.id))
    return div;
}


export const renderMsg = (messages)=>{
    // console.log(messages);
    //el problema de esto es que al enviar nuevamente la lista de mensajes desde el back se concatenará con lo que ya esta anteriormente
    // messages.forEach(msg => messagesList.append(messageUI(msg)));   //al elemento html messagesList se le añade una porcion de mensaje, el mensaje es el que se esta recorriendo en el mismo momento en el foreach
    //para evitar eso, creamos un html vacio y a eso le pasammos la nueva lista de mensajes
    messagesList.innerHTML = '';
    messages.forEach(msg => messagesList.append(messageUI(msg)));
}


export const addMessage = msg =>{
    messagesList.append(messageUI(msg))
}

/**Funcion para llenar el formulario */
export const fillForm = msg =>{
    user.value = msg.user;
    message.value = msg.mensaje;
    saveId = msg.Id;   
}