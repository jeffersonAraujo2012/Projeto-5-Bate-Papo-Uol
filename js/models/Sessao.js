import { Mensagem } from "./Mensagem.js";
import { removerLoginArea } from "../App.js";
import { Participante } from "./Participante.js";

export class Sessao {
  static nome;
  static intervalAtualizarMensagens;
  static intervalManterConexao;
  static intervalAtualizarParticipantes;

  constructor() {
    throw "Você não pode instanciar objetos desta classe."
  }

  static iniciar() {
    axios
      .post("https://mock-api.driven.com.br/api/v6/uol/participants", {
        name: this.nome,
      })
      .then(async (resposta) => {
        if (resposta.status == 200) {
          this.intervalManterConexao = this._manterOnline(this.nome);
          this.intervalAtualizarMensagens = setInterval(() => {
            Mensagem.carregar();
          }, 3000);
          this.intervalAtualizarParticipantes = setInterval(() => {
            Participante.carregar();
          }, 10000);
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

  static _manterOnline() {
    return setInterval(async () => {
      await axios
        .post("https://mock-api.driven.com.br/api/v6/uol/status", {
          name: this.nome,
        })
        .catch(() => {
          alert("Você foi desconectado. Erro 1: update conection.");
          window.location.reload();
        });
    }, 5000);
  }
}
