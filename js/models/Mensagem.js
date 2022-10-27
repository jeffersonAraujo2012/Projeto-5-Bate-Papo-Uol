export class Mensagem {
  constructor(msg) {
    this.msg = msg;
  }

  static enviar(msg, remetente, destinatario = "Todos") {
    axios
      .post("https://mock-api.driven.com.br/api/v6/uol/messages", {
        from: remetente,
        to: destinatario,
        text: msg,
        type: destinatario === "Todos" ? "message" : "private-message",
      })
      .then((res) => {
        if (res.status === 200) {
          let areaMensagens = document.querySelector(".area-mensagens");
          this.carregar(areaMensagens);
        }
      })
      .catch(() => {
        alert("Você não está mais conectado");
        window.location.reload();
      });
  }

  static async carregar(areaMensagens) {
    let mensagensRecebidas = await axios
      .get("https://mock-api.driven.com.br/api/v6/uol/messages")
      .then((resposta) => resposta.data);

    let novasMensagens = mensagensRecebidas.map((msg) => new Mensagem(msg));
    areaMensagens.innerHTML = "";
    novasMensagens.forEach((msg) => msg.render(areaMensagens));

    //Rola a tela automaticamente
    const alturaTotal = areaMensagens.scrollHeight;
    areaMensagens.scrollTop = alturaTotal;

    console.log(novasMensagens);
  }

  render(area) {
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
    area.appendChild(view);
  }
}
