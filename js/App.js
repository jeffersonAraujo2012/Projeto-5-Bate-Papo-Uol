import { Mensagem } from "./models/Mensagem.js";

let areaMensagens = document.querySelector(".area-mensagens");
let nome = prompt("Qual o seu nome?");
let intervalManterConexao;
let intervalAtualizarMensagens;

entrarNaSala(nome);

function entrarNaSala(nome) {
  axios
    .post("https://mock-api.driven.com.br/api/v6/uol/participants", {
      name: nome,
    })
    .then(async (resposta) => {
      if (resposta.status == 200) {
        intervalManterConexao = manterOnline(nome);
        intervalAtualizarMensagens = setInterval(
          () => Mensagem.carregar(areaMensagens),
          3000
        );
      }
    })
    .catch((e) => {
      if (e.response.status == 400) {
        nome = prompt("Usuário já logado, informe outro nome?");
        entrarNaSala(nome);
      }
    });
}

function manterOnline() {
  return setInterval(async () => {
    await axios
      .post("https://mock-api.driven.com.br/api/v6/uol/status", {
        name: nome,
      })
      .catch(() => console.log("Algo de errado ocorreu para se manter online"));
  }, 5000);
}
