import { Mensagem } from "../models/Mensagem.js";
import nome from "../App.js";

const input = document.querySelector(".digitar-mensagem input")
const button = document.querySelector(".digitar-mensagem button");
button.onclick = () => enviarMensagem();

function enviarMensagem() {
  console.log("CLICK!!!")
  Mensagem.enviar(input.value, nome);
}

export default enviarMensagem;