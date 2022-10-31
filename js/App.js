import { Mensagem } from "./models/Mensagem.js";
import { Store } from "./Store.js";
import { Sessao } from "./models/Sessao.js"

let areaMensagens = document.querySelector(".area-mensagens");
let intervalManterConexao;
let intervalAtualizarMensagens;

//Uncaught ReferenceError: exibirLoading is not defined.
//VOCÊ PRECISA CORRIGIR ISTO EXPORTANDO A FUNÇÃO PARA ALLCONTROLLERS.JS LINHA 27

function exibirLoading() {
  const telaLogin = document.querySelector(".login");
  telaLogin.querySelector('input').remove();
  telaLogin.querySelector('button').remove();

  let loading = document.createElement('div');
  loading.classList.add("spinner");

  let spin = document.createElement("img");
  spin.setAttribute("src", "./images/spinner.svg");

  let texto = document.createElement('p');
  texto.innerHTML = "Entrando..."

  loading.appendChild(spin);
  loading.appendChild(texto);

  telaLogin.appendChild(loading);
}

function removerLoginArea() {
  const loginArea = document.querySelector(".login");
  loginArea.remove();
}

export {exibirLoading, removerLoginArea};

