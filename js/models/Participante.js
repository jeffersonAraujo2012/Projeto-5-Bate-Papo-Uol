import { Mensagem } from "./Mensagem.js";

export class Participante {
  static areaContatos = document.querySelector(".enviar-para");
  static participanteSelecionado = document.querySelector(
    ".contato--selecionado"
  );

  elementHTML;

  constructor(nome) {
    this.nome = nome;
    this.elementHTML = document.createElement("span");
  }

  static async carregar() {
    console.log(Participante.participanteSelecionado);
    let participantesRecebidos = await axios
      .get("https://mock-api.driven.com.br/api/v6/uol/participants")
      .then((res) => res.data);

    console.log(participantesRecebidos);
    let pAtivos = participantesRecebidos.map(
      (participante) => new Participante(participante.name)
    );

    console.log(pAtivos);
    Participante.areaContatos.innerHTML = /*HTML*/ `
      <p>Escolha um contato para enviar mensagem:</p>
    `;
    const todos = new Participante("Todos");
    todos.render();

    pAtivos.forEach((participante) => {
      participante.render();
    });

    if (Participante.participanteSelecionado) {
      let p = pAtivos.filter((participante) => {
        return participante.nome === Participante.participanteSelecionado.nome;
      })[0];
      if (!p) {
        p = todos;
        Mensagem.tipo = "message";
      }
      console.log(p);
      Participante.participanteSelecionado = p;
      p.elementHTML.classList.add("contato--selecionado");
    }
  }

  render() {
    const contato = this.elementHTML;
    contato.classList.add("contato");

    if (this.nome === "Todos") {
      contato.innerHTML = /*HTML*/ `
        <img src="./images/user.png" alt="icone usuario"/>
        ${this.nome}
      `;
      if (!Participante.participanteSelecionado) {
        console.log("ooooookkkk")
        Participante.participanteSelecionado === this;
      }
    } else {
      contato.innerHTML = /*HTML*/ `
        <img src="./images/user2.png" alt="icone usuario"/>
        ${this.nome}
      `;
    }

    contato.onclick = () => {
      if (Participante.participanteSelecionado) {
        Participante.participanteSelecionado.elementHTML.classList.remove(
          "contato--selecionado"
        );
        Participante.participanteSelecionado = this;
        this.elementHTML.classList.add("contato--selecionado");
      } else {
        Participante.participanteSelecionado = this;
        this.elementHTML.classList.add("contato--selecionado");
      }
    };
    Participante.areaContatos.appendChild(contato);
  }
}
