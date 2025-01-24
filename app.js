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

// Lógica para sintese de voz
function lerTexto(texto){
    if (window.speechSynthesis) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

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
        lerTexto(descJogo.innerHTML);
        return;
    } else if(testeInput && chute >= 1 && chute <= maxNum){
        comparativo = chute > numeroSorteado ? "menor" : "maior";
        tentativas++;
        numerosTentados.push(chute);
        descJogo.innerHTML = gerarMensagemErro();
        lerTexto(descJogo.innerHTML);
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

// Função que irá executar após a página carregar
onload = function(){
    inputChute.min = 1;
    inputChute.max = maxNum;
    descJogo.innerHTML = mensagem;
    lerTexto(mensagem);
    sortearNumero();
}

/*
// Lógica do reconhecimento de voz
const numeros = ["um","dois","três","quatro","cinco","seis","sete","oito","nove","dez","onze","doze","treze","catorze","quinze","dezesseis","dezessete","dezoito","dezenove","vinte","vinte e um","vinte e dois","vinte e três"];
const gramatica = `#JSGF V1.0; grammar numeros; public <numero> = ${numeros.join(" | ")}`;
const numerosDigito = numeros.map((numero) => numeros.indexOf(numero) + 1); // Array com numeros em formato numérico : 1,2,3...
let resultadoVozUsuario;
if(!("webkitSpeechRecognition" in window)){
    alert("Seu navegador não suporta a API de reconhecimento de voz!");
} else {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(gramatica, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    function falarNumero(){
        recognition.start();
    }

    recognition.onresult = (e) => {
        const numero = e.results[0][0].transcript;
        diagnostic.textContent = `Numero recebido: ${numero}.`;
        console.log(`Confidence: ${e.results[0][0].confidence}`);
        alert(numero);
    };
}
*/
