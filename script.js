const botaoAlternarMenu = document.querySelector(".btn-menu");
const painelMenuLateral = document.querySelector(".menu-lateral");

botaoAlternarMenu.addEventListener("click", () => {
    painelMenuLateral.classList.toggle("ativo");
    botaoAlternarMenu.classList.toggle("girar");
});

async function inicializarTorneio() {
    const elementoMensagem = document.getElementById("mensagem-estado");
    const tabuleiroPrincipal = document.getElementById("tabuleiro-copa");
    const espacoPrimeiraSemi = document.getElementById("vencedor-q1");

    try {
        
        const timesRecebidos = [
            { "nome": "Brasil", "destino": "vencedor-q1" },
            { "nome": "Chile", "destino": "vencedor-q1" },
            { "nome": "Holanda", "destino": "vencedor-q2" },
            { "nome": "México", "destino": "vencedor-q2" }
        ];
        elementoMensagem.style.display = "none";
        tabuleiroPrincipal.style.display = "grid";

        timesRecebidos.forEach(time => {
            let botaoCriado = document.createElement("button");
            botaoCriado.innerText = time.nome;
            botaoCriado.dataset.destino = time.destino;
            botaoCriado.classList.add("jogo", "quartas");
            
            tabuleiroPrincipal.insertBefore(botaoCriado, espacoPrimeiraSemi);
        });

        ativarRegrasDoCampeonato();

    } catch (erro) {
        console.error("Falha na comunicação com o servidor:", erro);
        elementoMensagem.innerText = "Lamentamos, ocorreu um erro ao carregar os dados do torneio. Tente recarregar a página.";
        elementoMensagem.classList.add("estado-erro");
    }
}

function ativarRegrasDoCampeonato() {
    const todosOsBotoesJogo = document.querySelectorAll(".jogo");

    todosOsBotoesJogo.forEach(botao => {
        
        botao.addEventListener("click", (evento) => {
            const timeClicado = evento.target;
            const nomeDoTime = timeClicado.innerText.trim();
            const idVagaDestino = timeClicado.dataset.destino;
            
            if (nomeDoTime === "?" || !idVagaDestino) return;

            const espacoDestino = document.getElementById(idVagaDestino);

            if (espacoDestino.innerText.trim() === "?" || espacoDestino.innerText.trim() === "A Grande Final") {

                if (espacoDestino.innerText.trim() === "A Grande Final") {
                    espacoDestino.innerText = `${nomeDoTime} CAMPEÃO! 🏆`;
                    espacoDestino.classList.add("vencedor-final");
                    
                    dispararConfetes();

                } else {
                    espacoDestino.innerText = nomeDoTime;
                }
                
                timeClicado.classList.add("brilho-vencedor");
                
            } else {
                console.warn("Aviso: O lugar para este jogo já foi preenchido!");
            }
        });
    });
}
function dispararConfetes() {
    // Função disponibilizada pelo script carregado no HTML
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#27ae60', '#f1c40f', '#e74c3c', '#3498db']
    });
}
inicializarTorneio();
