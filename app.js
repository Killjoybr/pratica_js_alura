// Constantes do jogo
const maxNum = 23;

// Variáveis para manipular os elementos do front-end
let headerJogo = document.querySelector("#headerJogo");
let descJogo = document.querySelector("#descricaoJogo");
let botaoReset = document.querySelector("#reiniciar");
let inputChute = document.querySelector("#chute");

// Variáveis p/ lógica do jogo
let tentativas = 0;
let numeroSorteado;
let numerosTentados = [];
let mensagem = `Adivinhe um número entre 1 e ${maxNum}`;


function sortearNumero(){
    numeroSorteado = Math.floor(Math.random() * maxNum) + 1; // O +1 é p/ desconsiderar o 0 ;)
}

function verificarChute(){
    botaoReset.disabled = false;
    let chute = parseInt(inputChute.value);
    chute == numeroSorteado ? true : false;

    if(chute){
        tentativas++;
        descJogo.innerHTML = mensagemAcerto;
    } else{
        tentativas++;
        numerosTentados.push(chute);
        descJogo.innerHTML = `Você errou! Tente novamente. Números tentados: ${numerosTentados.join(", ")}`;
    }
}

function resetGame(){

}

// Função que irão executar após a página carregar
onload = function(){
    inputChute.min = 1;
    inputChute.max = maxNum;
    descJogo.innerHTML = mensagem;
    sortearNumero();
}
