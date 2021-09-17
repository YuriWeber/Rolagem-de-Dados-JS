class Dados {
    constructor(dadoSelecionador, valorExtra) {
        this._dadoSelecionador = dadoSelecionador;
        this._valorExtra = valorExtra;
    }
}

const dadoSelecionador = document.querySelectorAll('.seletor .dado');
const valorExtra = document.querySelector('#valor-extra');
const btoAdicionarDado = document.querySelector('.adicionar-dado');
const btoRolagem = document.querySelector('.rolar');
const btoLimpar = document.querySelector('.limpar');
const resRolagem = document.querySelector('.res-rolagem');
const resRolagemTotal = document.querySelector('.total-rolagem')
// const dadosSelecionados

const dados = new Dados(dadoSelecionador, valorExtra);

console.log(dadoSelecionador);
console.log(valorExtra);
console.log(btoAdicionarDado);
console.log(btoRolagem);
console.log(btoLimpar);
console.log(resRolagem);
console.log(resRolagemTotal);