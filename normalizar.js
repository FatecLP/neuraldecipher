const tf = require('@tensorflow/tfjs');

// Obtém os parâmetros de normalização
function obterParametros(tensor) {
    return {
        min: tensor.min(),
        max: tensor.max(),
        range: tensor.max().sub(tensor.min())
    };
}

// Normaliza com parâmetros
function normalizar(tensor, params) {
    return tensor.sub(params.min).div(params.range);
}

// Desnormaliza
function desnormalizar(tensorNorm, params) {
    return tensorNorm.mul(params.range).add(params.min);
}

module.exports = { obterParametros, normalizar, desnormalizar };