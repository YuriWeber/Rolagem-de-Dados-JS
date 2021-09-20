class Dados { // classe geral da rolagem de dados
    constructor(selecionados, resRolagem, resRolagemTotal) { 
        this._selecionados = selecionados; // div (array) dos dados selecionados
        this._resRolagem = resRolagem; // div (array) do resultado de cada dado
        this._resRolagemTotal = resRolagemTotal; // resultado dos dados + valor extra
        this._idAtual = 0;
        this._dadoAtual = "none";
    }


    addRolagem() { // adiciona a rolagem em forma de imagme
        this.limpar() // limpa a rolagem anterior
        const dadosSelecionados = document.querySelectorAll('.selecionados .dado');

        dadosSelecionados.forEach(dado => { // Fara a adição do novo elemento para cada dado rolado
            const rolagem = this.rolar(dado); // armazena o valor do dado
            // criação do html para o dado rolado
            const container = document.createElement('div');
            container.classList.add('dado-container');
            const texto = document.createElement('h2');
            texto.textContent = rolagem
            texto.classList.add('texto-dado');
            texto.setAttribute('value', rolagem);
            const img = document.createElement('img');
            img.src = '../dados/' + dado.getAttribute('name') + '.png'; // imagem a ser utilizada
            img.alt = dado.getAttribute('name') + '.png';

            container.appendChild(texto);
            container.appendChild(img);
            this._resRolagem.appendChild(container); // adiciona na pagina
        })
    }
    
    rolar(dado) { // rolagem do dado com Math.random
        const name = dado.getAttribute('name').replace("D", "");
        if (name !== "extra") {
            const min = 1;
            const max = parseInt(name) + 1;
            const rolagem = Math.floor(Math.random() * (max - min) + min);
            return rolagem
        }
        else {
            return dado.getAttribute('value')
        }
    }
    
    somar() { // soma os valores rolados
        const valores = document.querySelectorAll('.res-rolagem .dado-container');
        let soma = 0;
        valores.forEach(resultado => {
            const valor = resultado.querySelector('h2');
            soma += parseInt(valor.getAttribute('value'))
        })
        // adiciona a soma total na tela
        this._resRolagemTotal.setAttribute('value', soma);
        this._resRolagemTotal.textContent = "TOTAL: " + soma
    }

    limpar(total = false) {
        if (total) { // irá remover os dados apenas se for verdadeiro
            while (this._selecionados.firstChild) {
                this._selecionados.removeChild(this._selecionados.lastChild);
            }
            document.querySelector("#valor-extra").value = 0; // limpa o campo de valor extra
        }
        while (this._resRolagem.firstChild) { // remove a rolagem
            this._resRolagem.removeChild(this._resRolagem.lastChild);
        }
        // limpa o resultado final da rolagem
        this._resRolagemTotal.setAttribute('value', 0)
        this._resRolagemTotal.textContent = "TOTAL: 0";
    }

    adicionarDado() { // adiona um novo dado
        const dadoTipo = this._dadoAtual;
        if (dadoTipo !== "none") {
            const dadoId = 'dado' + this._idAtual;
            const dado = document.createElement('button'); // cria o botão para se referir ao dado
            const name = dadoTipo;

            dado.classList.add('dado');
            dado.id = dadoId;
            this._idAtual += 1;
            dado.textContent = name;
            dado.setAttribute('name', name)

            this._selecionados.appendChild(dado); // insere na div
        }
    }

    adicionaValorExtra(value) { // adiciona o valor extra toda vez que ele for atualizado
        this.removerDado("extra");
        if (parseInt(value) !== 0) {
            const extra = document.createElement('button');
    
            extra.setAttribute('name', 'extra');
            extra.id = "extra";
            extra.classList.add('dado');
            if (value > 0) {
                extra.textContent = "+" + value;
            }
            else {
                extra.textContent = value;
            }
            extra.setAttribute('value', value);
    
            this._selecionados.appendChild(extra);
            this.atualizaDadosBto();
        }
    }

    removerDado(id) { // remover um dado
        if (document.getElementById(id)) {
            const dado = document.getElementById(id); // encontra o node/dado/botão

            this._selecionados.removeChild(dado) // remove
        }
    }

    pegarDado(value) {
        this._dadoAtual = value;
        console.log(this._dadoAtual)
    }

    atualizaDadosBto() { // adiciona um eventlistener para os dados selecionados, chamado quando adicio um dado novo
        const dadosSelecionados = document.querySelectorAll('.selecionados .dado');
        dadosSelecionados.forEach(button => {
            if (button.getAttribute('listener') !== 'existe') { // verifica se já existe um eventlistener
                button.addEventListener('click', () => {
                    dados.removerDado(button.id) // dado sera removido ao clicar nele
                })
                button.setAttribute('listener', 'existe'); // atributo para confirmar a existencia do eventlistener
            }
        })
    }
}

// variáveis referentes ao html
const dadoSelecionador = document.querySelectorAll('.seletor .dado'); // combobox
const btoAdicionarDado = document.querySelector('.adicionar-dado'); 
const selecionados = document.querySelector('.selecionados'); // div dos dados selecionados, usado para inserção e remoção
const resRolagem = document.querySelector('.res-rolagem'); 
const resRolagemTotal = document.querySelector('.total-rolagem #total') 
const btoRolagem = document.querySelector('.rolar'); 
const btoLimpar = document.querySelector('.limpar'); 

const dados = new Dados(selecionados, resRolagem, resRolagemTotal); // cria a classe principal
dados.atualizaDadosBto();

btoAdicionarDado.addEventListener('click', () => { // acionador para adicionar um dado
    dados.adicionarDado(); // adiciona o dado
    dados.atualizaDadosBto(); // atualiza os botões referente aos dados
})

btoRolagem.addEventListener('click', () => {
    dados.addRolagem();
    dados.somar();
})

btoLimpar.addEventListener('click', () => {
    dados.limpar(true);
})