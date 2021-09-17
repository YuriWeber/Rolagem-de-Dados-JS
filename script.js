class Dados {
    constructor(dadosSelecionados, resRolagem, resRolagemTotal) {
        this._dadosSelecionados = dadosSelecionados;
        this._resRolagem = resRolagem;
        this._resRolagemTotal = resRolagemTotal;
    }

    rolar() {

    }

    limpar() {

    }

    adicionarDado() {

    }

    removerDado() {

    }

    somar() {

    }
}

const dadoSelecionador = document.querySelectorAll('.seletor .dado');
const btoAdicionarDado = document.querySelector('.adicionar-dado');
const valorExtra = document.querySelector('#valor-extra');
const dadosSelecionados = document.querySelector('.selecionados');
const resRolagem = document.querySelector('.res-rolagem');
const resRolagemTotal = document.querySelector('.total-rolagem')
const btoRolagem = document.querySelector('.rolar');
const btoLimpar = document.querySelector('.limpar');

const dados = new Dados(dadosSelecionados, resRolagem, resRolagemTotal);

console.log("teste do git vscode")