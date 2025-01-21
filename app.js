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
let comparativo;
let numerosTentados = [];
let mensagem = `Adivinhe um número entre 1 e ${maxNum}`;


function gerarMensagemErro(){
    let  mensagemErro = `Você errou, o número é ${comparativo}! Tente novamente. números tentados: ${numerosTentados}`;
    return mensagemErro;
}

function gerarMensagemAcerto(){
    let mensagemAcerto = `Parabens! Você acertou e o número era ${(numeroSorteado)}. Você acertou em ${tentativas}  tentativas.`;
    return mensagemAcerto;
}

function sortearNumero(){
    numeroSorteado = Math.floor(Math.random() * maxNum) + 1; // O +1 é p/ desconsiderar o 0 ;)
}

function verificarInput(input){
    if(isNaN(input)){
        return false;
    }
    return true;
}

function verificarChute(){
    botaoReset.disabled = false;
    let chute = parseInt(inputChute.value);
    let testeInput = verificarInput(chute);

    if(numerosTentados.includes(chute)){
        alert("Você já tentou esse número, tente outro!");
        return;
    }

    if(chute == numeroSorteado && testeInput){
        tentativas++;
        descJogo.innerHTML = gerarMensagemAcerto();
        return;
    } else if(testeInput && chute >= 1 && chute <= maxNum){
        comparativo = chute > numeroSorteado ? "menor" : "maior";
        tentativas++;
        numerosTentados.push(chute);
        descJogo.innerHTML = gerarMensagemErro();
        return;
    }
    
    alert(`Digite um número válido! (entre 1 e ${maxNum})`);   
}

function resetGame(){
    sortearNumero();
    numerosTentados = [];
    tentativas = 0;

    descJogo.innerHTML = mensagem;
    inputChute.value = "";
    botaoReset.disabled = true;
}

// Função que irão executar após a página carregar
onload = function(){
    inputChute.min = 1;
    inputChute.max = maxNum;
    descJogo.innerHTML = mensagem;
    sortearNumero();
}
