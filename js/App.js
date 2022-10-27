let nome = prompt("Qual o seu nome?");
let intervalManterConexao;

entrarNaSala(nome);

function entrarNaSala(nome) {
  axios
    .post("https://mock-api.driven.com.br/api/v6/uol/participants", {
      name: nome,
    })
    .then(async (resposta) => {
      if (resposta.status == 200) {
        intervalManterConexao = await manterOnline(nome);
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
      .then((resposta) => console.log(resposta));
  }, 5000);
}
