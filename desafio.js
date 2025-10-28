const { criptografar } = require('./cripto');
const { obterParametros, normalizar, desnormalizar } = require('./normalizar');
const tf = require('@tensorflow/tfjs');

// cenário: queremos decifrar uma mensagem cifrada

const textoPuro = '"Descubra." - JEFF, Big';
const asciiPuro = textoPuro.split('').map(char => char.charCodeAt(0));
const asciiCifrado = criptografar(textoPuro);

const xs_tensor = tf.tensor1d(asciiPuro);
const ys_tensor = tf.tensor1d(asciiCifrado);

// normalizamos os dados para evitar o mínimo local (ler problemas.md)
const xs_params = obterParametros(xs_tensor);
const ys_params = obterParametros(ys_tensor);
const xs_normalizado = normalizar(xs_tensor, xs_params);
const ys_normalizado = normalizar(ys_tensor, ys_params);

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

// com dados normalizados, podemos usar uma taxa maior e menos épocas
const taxaDeAprendizado = 0.1;
const otimizador = tf.train.sgd(taxaDeAprendizado);

epocasTreinamento = 5000;
for (let epoca = 0; epoca < epocasTreinamento; epoca++) {
    tf.tidy(() => {
        otimizador.minimize(() => {
            const previsoes = prever(xs_normalizado);
            const erro = calcularErro(previsoes, ys_normalizado);
            return erro;
        });
    });

    if (epoca % 10 === 0) {
        tf.tidy(() => {
            // normaliza o valor cifrado
            const desafioNorm = normalizar(ys_tensor, ys_params);

            // decifra usando a fórmula: X = (Y - b) / m
            const previsaoAsciiNorm = desafioNorm.sub(b).div(m);

            // desnormaliza e volta para ascii
            const previsaoAscii = desnormalizar(previsaoAsciiNorm, xs_params).round();
            
            // converte array de ascii para string
            const asciiArray = previsaoAscii.dataSync();
            const textoDecifrado = String.fromCharCode(...asciiArray);

            if (textoDecifrado === textoPuro) {
                console.log(`Decifração bem-sucedida na época ${epoca}:\n${textoDecifrado}`);
                process.exit(0);
            } else {
                console.log(`Época: ${epoca} - Tentativa de decifrar ${textoPuro}\n${textoDecifrado}`);
            }
            console.log('------------------------------------');
        });
    }
}