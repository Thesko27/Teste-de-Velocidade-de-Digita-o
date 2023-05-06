const texto = document.querySelector("#texto");
const entrada = document.querySelector("#entrada");
const resultado = document.querySelector("#resultado");
const reiniciar = document.querySelector("#reiniciar");
const historico = document.querySelector("#historico");
const temaBtn = document.querySelector("#alteraTema");

const textos = [
    "Perdoa-me.",
    "Quando dobro os meus joelhos.",
    "Ele ouve o gemido do meu coração.",
    "Porque às vezes não consigo nem falar.",
    "Ó Jesus, a Ti confesso, não dá pra viver.",
    "Neste lugar.",
    "Pra Te servir.",
    "Assim, eles já não são dois, mas sim uma só carne. Portanto, o que Deus uniu, ninguém separe.",
];

const novoTexto = () => {
    const index = Math.floor(Math.random() * textos.length);
    texto.textContent = textos[index];
};

const atualizarTeste = () => {
    iniciar();
    if (entrada.value === texto.textContent) {
        verificar();
    }
};

const iniciar = () => {
    const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAdamento"));
    if (!statusDoTeste) {
        localStorage.setItem("tempoInicial", new Date().getTime());
        localStorage.setItem("testeEmAdamento", true);
    }
};

const verificar = () => {
    const tempoFinal = new Date().getTime();
    const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
    const tempoGasto = (tempoFinal - tempoInicial) / 1000;

    resultado.textContent = `Parabéns! Você levou ${tempoGasto} segundos!`;

    adicionarAoHistorico(texto.textContent, tempoGasto);

    localStorage.setItem("testeEmAndamento", false);
    entrada.value = "";
    novoTexto();
};

const adicionarAoHistorico = (textoDigitado, tempoGasto) => {
    const itemHistorico = document.createElement("p");
    itemHistorico.textContent = `Texto ${textoDigitado} - tempo ${tempoGasto} segundos!`;
    historico.appendChild(itemHistorico);
};

const reiniciarTeste = () => {
    entrada.value = "";
    resultado.textContent = "";
    novoTexto();
    localStorage.setItem("testeEmAndamento", false);
    historico.innerHTML = "";
};

const alteraTema = () => {
    const body = document.body;
    body.classList.toggle("claro");
    body.classList.toggle("escuro");
};

entrada.addEventListener("keyup", atualizarTeste);
reiniciar.addEventListener("click", reiniciarTeste);
temaBtn.addEventListener("click", alteraTema);
novoTexto();
