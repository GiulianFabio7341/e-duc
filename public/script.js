function enviar(){

let cidade = document.getElementById("cidadeSelect").value
let ano = document.getElementById("anoSelect").value



// IDEB e SAEB(N)
fetch(`https://e-duc.onrender.com/ideb?id=${cidade}&ano=${ano}`)
.then(res => res.json())
.then(dados => {

const dadosManuais = {

"2900702": { // Alagoinhas

"2023": {
municipal: 3.1,
publico: 3.9,
aprmunicipal: 4.28,
aprpublico: 4.33
},

"2021": {
municipal: 4.5,
publico: 4.2,
aprmunicipal: 5.6,
aprpublico: 4.6
}

},

"2907509": { // Catu

"2023": {
municipal: 4.0,
publico: 4.0,
aprmunicipal: 4.47,
aprpublico: 4.47
},

"2021": {
municipal: 4.8,
publico: 4.8,
aprmunicipal: 4.91,
aprpublico: 4.91
}

},

"2902203": { // Aramari

"2023": {
municipal: 3.6,
publico: 3.6,
aprmunicipal: 3.97,
aprpublico: 3.97
},

"2021": {
municipal: "Sem dados até o momento",
publico: "Sem dados até o momento",
aprmunicipal: "Sem dados até o momento",
aprpublico: "Sem dados até o momento"
}

},

"2927408": { // Salvador

"2023": {
municipal: 4.2,
publico: 3.9,
aprmunicipal: 4.59,
aprpublico: 4.28
}

,

"2021": {
municipal: 4.5,
publico: 4.7,
aprmunicipal: 4.80,
aprpublico: 4.69
} },

"2925204": { // Pojuca

"2023": {
municipal: 4.1,
publico: 4.1,
aprmunicipal: 4.53,
aprpublico: 4.53
},

"2021": {
municipal: 4.8,
publico: 4.8,
aprmunicipal: 5.02,
aprpublico: 5.02
}

},

"2910503": { // Entre Rios

"2023": {
municipal: 2.8,
publico: 2.8,
aprmunicipal: 4.08,
aprpublico: 4.08
},

"2021": {
municipal: 3.7,
publico: 3.7,
aprmunicipal: 4.53,
aprpublico: 4.50
}


},

"2913705": { // Inhambupe

"2023": {
municipal: 3.5,
publico: 3.5,
aprmunicipal: 4.34,
aprpublico: 4.34
},

"2021": {
municipal: 3.6,
publico: 3.6,
aprmunicipal: 4.27,
aprpublico: 4.27
}


},

"2910800": { // Feira De Santana

"2023": {
municipal: 3.5,
publico: 3.7,
aprmunicipal: 4.52,
aprpublico: 4.39
},

"2021": {
municipal: "Sem dados até o momento",
publico: 4.2,
aprmunicipal: "Sem dados até o momento",
aprpublico: 4.73
}


},

"2902054": { // Araças

"2023": {
municipal: 3.8,
publico: 3.8,
aprmunicipal: 4.44,
aprpublico: 4.44
},

"2021": {
municipal: "Sem dados até o momento",
publico: "Sem dados até o momento",
aprmunicipal: "Sem dados até o momento",
aprpublico: "Sem dados até o momento"
}


}



}


// se existir dado manual para a cidade e ano
if (dadosManuais[cidade] && dadosManuais[cidade][ano]) {

dados = dadosManuais[cidade][ano]

}


document.getElementById("idebMunicipal").innerText =
"IDEB: " + (dados.municipal ?? "Não disponível")

document.getElementById("idebPublico").innerText =
"IDEB: " + (dados.publico ?? "Não disponível")

document.getElementById("aprMunicipal").innerText =
"(N): " + (dados.aprmunicipal ?? "Não disponível")

document.getElementById("aprPublico").innerText =
"(N): " + (dados.aprpublico ?? "Não disponível")

})
.catch(erro => {

console.log("Erro IDEB:", erro)

})


// CENSO
fetch(`https://e-duc.onrender.com/censo?id=${cidade}&ano=${ano}`)
.then(res => res.json())
.then(dados => {

document.getElementById("censoMunicipal").innerText =
"Matrículas: " + dados.censomunicipal

document.getElementById("censoPublico").innerText =
"Matrículas: " + dados.censopublica

})
.catch(erro => {

console.log("Erro Censo:", erro)

})


// TAXA
fetch(`https://e-duc.onrender.com/indicador?id=${cidade}&ano=${ano}`)
.then(res => res.json())
.then(dados => {

document.getElementById("taxaMunicipalapr").innerText =
"Rendimento: " + dados.taxa_aprmunicipal.toFixed(2)+"%"

document.getElementById("taxaMunicipalrep").innerText =
"Rendimento: " + dados.taxa_repmunicipal.toFixed(2)+"%"

document.getElementById("taxaMunicipalaba").innerText =
"Rendimento: " + dados.taxa_abamunicipal.toFixed(2)+"%"

document.getElementById("taxaPublicoapr").innerText =
"Rendimento: " + dados.taxa_aprpublica.toFixed(2) + "%"

document.getElementById("taxaPublicorep").innerText =
"Rendimento: " + dados.taxa_reppublica.toFixed(2) + "%"

document.getElementById("taxaPublicoaba").innerText =
"Rendimento: " + dados.taxa_abapublica.toFixed(2) + "%"

})
.catch(erro => {

console.log("Erro taxa:", erro)

})

const tabela = document.getElementById('tabela')
tabela.style.display = "block";
}