const tf = require("@tensorflow/tfjs");

// cenário: queremos descobrir a relação entre celsius e fahrenheit

const xs_dados = tf.tensor1d([
    0, 5, 10, 20, 30
]);

const ys_dados = tf.tensor1d([
    32, 41, 50, 68, 86
]);

const m = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));

function prever(x) {
    return tf.mul(m, x).add(b);
}

function calcularErro(previsoes, reais) {
    const erro = previsoes.sub(reais);
    const erroQuadrado = erro.square();
    const erroMedio = erroQuadrado.mean();
    return erroMedio;
}

const taxaDeAprendizado = 0.001; // números maiores exigem taxas menores
const otimizador = tf.train.sgd(taxaDeAprendizado);

epocasTreinamento = 5000; // taxa menor exige mais épocas
for (let epoca = 0; epoca < epocasTreinamento; epoca++) {
    tf.tidy(() => {
        otimizador.minimize(() => {
            const previsoes = prever(xs_dados);

            const erro = calcularErro(previsoes, ys_dados);

            return erro;
        });
        
    });

    if (epoca === 1) {
        console.log(`Época inicial:`);
        console.log('Valor de m:', m.dataSync()[0]);
        console.log('Valor de b:', b.dataSync()[0]);
    } else if (epoca === epocasTreinamento - 1) {
        console.log(`Época final:`);
        console.log('Valor de m:', m.dataSync()[0]);
        console.log('Valor de b:', b.dataSync()[0]);
    }
}

prever(15).print();  // deve estar perto de 59