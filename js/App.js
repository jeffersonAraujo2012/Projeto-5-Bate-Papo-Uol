import { Mensagem } from "./models/Mensagem.js";
import { Store } from "./Store.js";

let areaMensagens = document.querySelector(".area-mensagens");
let intervalManterConexao;
let intervalAtualizarMensagens;

//entrarNaSala(nome);

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

let btnEntrar = document.querySelector(".login button");
btnEntrar.onclick = () => {
  Store.nome = document.querySelector('.login input').value;
  exibirLoading();
  entrarNaSala(Store.nome);
  //entrarNaSala(nome)
};

function entrarNaSala(nome) {
  axios
    .post("https://mock-api.driven.com.br/api/v6/uol/participants", {
      name: nome,
    })
    .then(async (resposta) => {
      if (resposta.status == 200) {
        intervalManterConexao = manterOnline(nome);
        intervalAtualizarMensagens = setInterval(() => {
          Mensagem.carregar(areaMensagens);
        }, 3000);
        setTimeout(() => {
          removerLoginArea();
        }, 3000);
      }
    })
    .catch((e) => {
      if (e.response.status == 400) {
        alert("Usuário já logado, informe outro nome?");
        window.location.reload();
      }
    });
}

function manterOnline() {
  return setInterval(async () => {
    await axios
      .post("https://mock-api.driven.com.br/api/v6/uol/status", {
        name: Store.nome,
      })
      .catch(() => {
        alert("Você foi desconectado. Erro 1: update conection.");
        window.location.reload();
      });
  }, 5000);
}
