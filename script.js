const perguntas = [
  {
    pergunta: "Qual é o planeta natal de Luke Skywalker em Star Wars?",
    opcoes: ["Naboo", "Tatooine", "Hoth", "Endor"],
    correta: 1,
  },
  {
    pergunta: "Em qual anime o protagonista sonha em se tornar Hokage?",
    opcoes: ["One Piece", "Bleach", "Naruto", "Dragon Ball"],
    correta: 2,
  },
  {
    pergunta: "Qual é o nome verdadeiro do Homem de Ferro?",
    opcoes: ["Bruce Wayne", "Peter Parker", "Steve Rogers", "Tony Stark"],
    correta: 3,
  },
];

const telaPergunta = document.getElementById("tela-pergunta");
const telaResultado = document.getElementById("tela-resultado");
const elProgresso = document.getElementById("progresso");
const elPergunta = document.getElementById("pergunta");
const elOpcoes = document.getElementById("opcoes");
const elFeedback = document.getElementById("feedback");
const btnProxima = document.getElementById("btn-proxima");

let indiceAtual = 0;
let pontuacao = 0;

function mostrarPergunta() {
  const atual = perguntas[indiceAtual];

  elProgresso.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
  elPergunta.textContent = atual.pergunta;
  elFeedback.textContent = "";
  elFeedback.className = "feedback";
  btnProxima.hidden = true;
  elOpcoes.innerHTML = "";

  atual.opcoes.forEach((texto, indice) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "opcao";
    botao.textContent = texto;
    botao.addEventListener("click", () => responder(indice));
    elOpcoes.appendChild(botao);
  });
}

function responder(indiceEscolhido) {
  const atual = perguntas[indiceAtual];
  const botoes = elOpcoes.querySelectorAll(".opcao");

  // Bloqueia novas respostas e marca a correta
  botoes.forEach((botao) => (botao.disabled = true));
  botoes[atual.correta].classList.add("opcao--certa");

  if (indiceEscolhido === atual.correta) {
    pontuacao++;
    elFeedback.textContent = "✅ Acertou! Mandou bem, nerd!";
    elFeedback.classList.add("feedback--certo");
  } else {
    botoes[indiceEscolhido].classList.add("opcao--errada");
    elFeedback.textContent = `❌ Errou! A resposta certa era: ${atual.opcoes[atual.correta]}.`;
    elFeedback.classList.add("feedback--errado");
  }

  const ultima = indiceAtual === perguntas.length - 1;
  btnProxima.textContent = ultima ? "Ver resultado" : "Próxima pergunta";
  btnProxima.hidden = false;
  btnProxima.focus();
}

function mostrarResultado() {
  telaPergunta.hidden = true;
  telaResultado.hidden = false;

  document.getElementById("pontuacao-final").textContent = pontuacao;
  document.getElementById("total").textContent = perguntas.length;

  const mensagens = [
    "Hmm... hora de maratonar uns filmes e animes!",
    "Você está no caminho, jovem Padawan.",
    "Muito bom! Quase um mestre geek.",
    "Perfeito! Você é um verdadeiro mestre geek! 🏆",
  ];
  document.getElementById("resultado-mensagem").textContent = mensagens[pontuacao];
}

btnProxima.addEventListener("click", () => {
  indiceAtual++;
  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
});

document.getElementById("btn-reiniciar").addEventListener("click", () => {
  indiceAtual = 0;
  pontuacao = 0;
  telaResultado.hidden = true;
  telaPergunta.hidden = false;
  mostrarPergunta();
});

mostrarPergunta();
