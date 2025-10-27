// o modelo deve descobrir os valores reais abaixo
const m = 3;
const b = 7;

function criptografar(textoPuro) {
    const numerosCifrados = [];
    for (let i = 0; i < textoPuro.length; i++) {
        // pega o código ascii do caractere
        const asciiPuro = textoPuro.charCodeAt(i);

        // cifra o caractere
        const asciiCifrado = (asciiPuro * m) + b; // ascii * m + b é a cifra

        // adiciona no array
        numerosCifrados.push(asciiCifrado);
    }
    return numerosCifrados;
}

function decifrar(numerosCifrados, m, b) {
    let textoPuro = "";
    for (let i = 0; i < numerosCifrados.length; i++) {
        // pega o código ascii cifrado
        const asciiCifrado = numerosCifrados[i];

        // decifra o caractere
        const asciiPuro = (asciiCifrado - b) / m;

        // adiciona ao texto puro
        textoPuro += String.fromCharCode(asciiPuro);
    }
    return textoPuro;
}

module.exports = { criptografar, decifrar };