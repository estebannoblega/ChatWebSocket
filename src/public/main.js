import {loadMessages, onNewMessage, onSelected} from './socket.js'
import { onHandleSubmit,renderMsg, addMessage, fillForm } from './ui.js';
/**Esto es donde estará todo la funcionalidad del cliente */

onNewMessage(addMessage);
loadMessages(renderMsg);
onSelected(fillForm);
//Aqui manejamos el formulario
const messageForm=document.querySelector('#messageForm');

messageForm.addEventListener('submit',onHandleSubmit)
