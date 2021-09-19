class Dados { // classe geral da rolagem de dados
    constructor(selecionados, resRolagem, resRolagemTotal) { 
        this._selecionados = selecionados; // div (array) dos dados selecionados
        this._resRolagem = resRolagem; // div (array) do resultado de cada dado
        this._resRolagemTotal = resRolagemTotal; // resultado dos dados + valor extra
        this._idAtual = 0;
    }


    rolar() {
        this.limpar()
        const dadosSelecionados = this.selecionarDados();
        dadosSelecionados.forEach(dado => {
            const rolagem = document.createElement('img');
            rolagem.src = '../dados/' + dado.getAttribute('name') + '.png';
            rolagem.alt = dado.getAttribute('name') + '.png';
            this._resRolagem.appendChild(rolagem);
        })
    }

    limpar(total = false) {
        if (total) { // irá remover os dados apenas se for verdadeiro
        while (this._selecionados.firstChild) {
            this._selecionados.removeChild(this._selecionados.lastChild);
        }}
        while (this._resRolagem.firstChild) { // remove a rolagem
            this._resRolagem.removeChild(this._resRolagem.lastChild);
        }
    }

    adicionarDado() { // adiona um novo dado
        const dadoId = 'dado' + this._idAtual;
        const dado = document.createElement('button'); // cria o botão para se referir ao dado
        const name = 'D6'

        dado.classList.add('dado');
        dado.id = dadoId;
        this._idAtual += 1;
        dado.textContent = name;
        dado.setAttribute('name', name)

        this._selecionados.appendChild(dado); // insere na div
}

    removerDado(id) { // remover um dado
        const dado = document.getElementById(id); // encontra o node/dado/botão

        this._selecionados.removeChild(dado) // remove
    }

    somar() {

    }

    atualizaDadosBto() { // adiciona um eventlistener para os dados selecionados, chamado quando adicio um dado novo
        const dadosSelecionados = this.selecionarDados();
        dadosSelecionados.forEach(button => {
            if (button.getAttribute('listener') !== 'existe') { // verifica se já existe um eventlistener
                button.addEventListener('click', () => {
                    dados.removerDado(button.id) // dado sera removido ao clicar nele
                })
                button.setAttribute('listener', 'existe'); // atributo para confirmar a existencia do eventlistener
            }
        })
    }

    selecionarDados() {
        return document.querySelectorAll('.selecionados .dado'); // dados dentro da div selecionados
    }
}

// variáveis referentes ao html
const dadoSelecionador = document.querySelectorAll('.seletor .dado'); // combobox
const btoAdicionarDado = document.querySelector('.adicionar-dado'); 
const valorExtra = document.querySelector('#valor-extra'); 
const selecionados = document.querySelector('.selecionados'); // div dos dados selecionados, usado para inserção e remoção
const resRolagem = document.querySelector('.res-rolagem'); 
const resRolagemTotal = document.querySelector('.total-rolagem') 
const btoRolagem = document.querySelector('.rolar'); 
const btoLimpar = document.querySelector('.limpar'); 

const dados = new Dados(selecionados, resRolagem, resRolagemTotal); // cria a classe principal
dados.atualizaDadosBto();

btoAdicionarDado.addEventListener('click', () => { // acionador para adicionar um dado
    dados.adicionarDado(); // adiciona o dado
    dados.atualizaDadosBto(); // atualiza os botões referente aos dados
})

btoRolagem.addEventListener('click', () => {
    dados.rolar();
})

btoLimpar.addEventListener('click', () => {
    dados.limpar(true);
})