import { Sessao } from "../models/Sessao.js";
import { Participante } from "./Participante.js";

export class Mensagem {
  static _areaMensagens = document.querySelector(".area-mensagens");
  static tipo = "message";
  static tipoSelecionado = document.querySelector(".publica");

  constructor(msg) {
    this.msg = msg;
  }

  static get areaMensagens() {
    return Mensagem._areaMensagens;
  }

  static _removerPrivadasAlheias(mensagens) {
    return mensagens.filter((msg) => {
      const ehParaMim = msg.to == Sessao.nome || msg.to == "Todos";
      const ehMinha = msg.from == Sessao.nome;
      return (
        msg.type !== "private_message" ||
        ehParaMim ||
        ehMinha
      );
    });
  }

  static enviar(msg, remetente = Sessao.nome, destinatario = "Todos") {
    const data = {
      from: remetente,
      to: destinatario,
      text: msg,
      type: Mensagem.tipo,
    };
    axios
      .post("https://mock-api.driven.com.br/api/v6/uol/messages", data)
      .then((res) => {
        if (res.status === 200) {
          this.carregar();
        }
      })
      .catch((e) => {
        console.log(data);
        alert("Você não está mais conectado");
        window.location.reload();
      });
  }

  static async carregar() {
    let mensagensRecebidas = await axios
      .get("https://mock-api.driven.com.br/api/v6/uol/messages")
      .then((resposta) => resposta.data);

    mensagensRecebidas = this._removerPrivadasAlheias(mensagensRecebidas);

    let novasMensagens = mensagensRecebidas.map((msg) => new Mensagem(msg));
    Mensagem.areaMensagens.innerHTML = "";
    novasMensagens.forEach((msg) => msg.render());

    //Rola a tela automaticamente
    const alturaTotal = Mensagem.areaMensagens.scrollHeight;
    Mensagem.areaMensagens.scrollTop = alturaTotal;
  }

  render() {
    const view = document.createElement("div");
    view.classList.add("msg", `msg--${this.msg.type}`);
    view.innerHTML = /*html*/ `
      <p>
        <span class="msg__momento">(${this.msg.time})&nbsp</span> 
        <strong>${this.msg.from}&nbsp</strong>para&nbsp
        <strong>${this.msg.to}&nbsp</strong> 
        <span>${this.msg.text}</span>
      </p>
    `;
    Mensagem.areaMensagens.appendChild(view);
  }
}
