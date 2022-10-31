import { Mensagem } from "../models/Mensagem.js";
import { Store } from "../Store.js";
import { Sessao } from "../models/Sessao.js"
import { exibirLoading } from "../App.js";
import { Participante } from "../models/Participante.js";

const input = document.querySelector(".digitar-mensagem input");
const button = document.querySelector(".digitar-mensagem button");
const btnEntrar = document.querySelector(".login button");
const btnContatos = document.querySelector("header button");
const fundoPreto = document.querySelector(".fundo-preto");
const vPrivada = document.querySelector(".privada");
const vPublica = document.querySelector(".publica");

input.addEventListener('keypress', (e) => {
  const teclaDigitada = e.key;
  if (teclaDigitada === 'Enter'){
    enviarMensagem();
  }
})

button.onclick = () => enviarMensagem();

btnEntrar.onclick = () => entrar();

btnContatos.onclick = () => showMenuLateral();

fundoPreto.onclick = () => fecharMenuLateral();

vPrivada.onclick = (e) => selecionarTipo(e);

vPublica.onclick = (e) => selecionarTipo(e);

function enviarMensagem() {
  Mensagem.enviar(input.value, Store.nome);
  input.value = "";
}

function entrar() {
  Sessao.nome = document.querySelector('.login input').value;
  exibirLoading();
  Sessao.iniciar();
  Participante.carregar();
  //entrarNaSala(nome)
};

function showMenuLateral() {
  const menuLateral = document.querySelector(".menu-lateral");
  menuLateral.classList.add("menu-lateral--show");
  fundoPreto.classList.add("fundo-preto--show");
}

function fecharMenuLateral() {
  const menuLateral = document.querySelector(".menu-lateral");
  fundoPreto.classList.remove("fundo-preto--show");
  menuLateral.classList.remove("menu-lateral--show");
}

function selecionarTipo(e) {
  if (Mensagem.tipoSelecionado) {
    Mensagem.tipoSelecionado.classList.remove(
      "visibilidade--selecionada"
    );
    Mensagem.tipoSelecionado = e.currentTarget;
    e.currentTarget.classList.add("visibilidade--selecionada");
  } else {
    Mensagem.tipoSelecionado = e.currentTarget;
    e.currentTarget.classList.add("visibilidade--selecionada");
  }

  if (e.currentTarget.classList.contains("privada")){
    Mensagem.tipo = "private_message";
  } else {
    Mensagem.tipo = "message";
  }
}