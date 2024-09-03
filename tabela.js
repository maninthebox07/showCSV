//// Função Principal
const fs = require('fs');
const csv = fs.readFileSync('./oscar_best_pictures.csv').toString();

const linhas = quebraLinhas(csv);
const primeiraLinha = linhas.shift();
const headers = separaColunas(primeiraLinha);
const conteudo = separaConteudo(linhas);

console.log(headers);
console.log(conteudo);
const json = constroiListaObjetos(headers, conteudo);

console.table(json, ["Filme", "Ano", "Gênero"]);

/////////////////////////////

function quebraLinhas(csv) {
    let linhas = csv.trim().split('\n');
    return linhas;
}

function separaColunas(linha) {
    let colunas = linha.trim().split(';')
    return colunas;
}

function separaConteudo(lines) {
    const conteudo = [];

    for(let i=0; i<lines.length; i++) {
        let linha = lines[i];
        let colunas = separaColunas(linha);

        conteudo.push(colunas);
    }

    return conteudo;
}

function constroiObjeto(headers, linha) {
    let obj = {};

    for(let j=0; j<headers.length; j++){
        let titulo = headers[j];
        let coluna = linha[j];

        obj[titulo] = coluna;
    }

    return obj;
}

function constroiListaObjetos(headers, conteudo) {
    const listaObj = [];

    for(let i=0; i<conteudo.length; i++) {
        let linha = conteudo[i];

        const obj = constroiObjeto(headers, linha);

        listaObj.push(obj);
    }

    return listaObj;
}