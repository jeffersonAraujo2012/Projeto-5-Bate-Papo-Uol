import { Mensagem } from "../models/Mensagem.js";
import { Store } from "../Store.js";

const input = document.querySelector(".digitar-mensagem input");
const button = document.querySelector(".digitar-mensagem button");
button.onclick = () => enviarMensagem();

input.addEventListener('keypress', (e) => {
  const teclaDigitada = e.key;
  if (teclaDigitada === 'Enter'){
    enviarMensagem();
  }
})

function enviarMensagem() {
  Mensagem.enviar(input.value, Store.nome);
  input.value = "";
}
