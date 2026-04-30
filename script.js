const BotaoMenu = document.querySelector(".btn-menu");
const menuEscondido = document.querySelector(".menu-lateral");
BotaoMenu.addEventListener("click",function(){
    menuEscondido.classList.toggle("ativo");
    BotaoMenu.classList.toggle("girar")
})

//agarrando o botao chaveamento
/*
const btnBrasil = document.querySelector('#time1');
const btnChile = document.querySelector('#time2');
const vagaSemi1 = document.querySelector('#vencedor-q1');

btnBrasil.addEventListener("click", function(){
    if(vagaSemi1.innerText === "?"){
        vagaSemi1.innerText = btnBrasil.innerText;
        btnBrasil.classList.add("brilho-vencedor")
    }
    else{
        console.log("Atenção: Este jogo já foi decidido.")
    }
})*/

async function carregartimes(){
    try{
        let response = await fetch("https://api.npoint.io/16dabd225edb99c41fcc")
        let timesDaApi = await response.json();
        console.log("Dados Recebidos:",timesDaApi);
        const tabuleiro = document.getElementById("tabuleiro-copa");
        const primeiraSemi = document.getElementById("vencedor-q1");
        timesDaApi.forEach(function(time){
            let novoBotao = document.createElement("button");
            novoBotao.innerText = time.nome;
            novoBotao.dataset.destino = time.destino;
            novoBotao.classList.add("jogo", "quartas")
            tabuleiro.insertBefore(novoBotao, primeiraSemi);
        })
        console.log("Botões Criados na Tela!");
        ativarMaquinaCliques();
    }
    catch(erro){
        console.log("Erro ao buscar as seguintes coisas:", erro)
    }
}
function ativarMaquinaCliques(){
    const todosOsJogos = document.querySelectorAll(".jogo");
    todosOsJogos.forEach(function(botao){
        botao.addEventListener("click", function(event){
            let nomeDoTime = event.target.innerText;
            let idDoDestino = event.target.dataset.destino;
            if(nomeDoTime.trim() === "?" || !idDoDestino){
                return;
            }
            let espacoDestino = document.getElementById(idDoDestino);
            if(espacoDestino.innerText.trim() === "?" ||espacoDestino.innerText === "A Grande Final"){
                if(espacoDestino.innerText === "A Grande Final"){
                    espacoDestino.innerText = nomeDoTime + "CAMPEÃO!!!";
                } else{
                    espacoDestino.innerText = nomeDoTime;
                }
                event.target.classList.add("brilho-vencedor");
            } else{
                console.log("O juiz ja apitou o fim desse confronto");
            }
        })
    })
}
carregartimes();