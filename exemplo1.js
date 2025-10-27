const tf = require('@tensorflow/tfjs');

// cenário: queremos descobrir a relação entre horas estudadas e nota

// horas estudadas: 1h, 2h, 3h, 4h
const xs_dados = tf.tensor1d([1, 2, 3, 4]); // cria um tensor unidimensional

// notas que um aluno tirou após estudar x horas:
// 4, 6, 8, 10
const ys_dados = tf.tensor1d([4, 6, 8, 10]);

// cruzamos os dados, e fica:
// 1h estudando -> nota 4
// 2h estudando -> nota 6
// 3h estudando -> nota 8
// 4h estudando -> nota 10

// m (slope/peso)
// representa o quanto a nota aumenta para cada hora estudada
const m = tf.variable(tf.scalar(Math.random()));

// b (bias/viés)
// representa a nota inicial (sem estudar)
const b = tf.variable(tf.scalar(Math.random()));

// iniciamos m e b com valores aleatórios, pois o modelo tem
// que descobrir os valores corretos durante o treinamento

// ele tem que achar o equilíbrio entre m e b na base
// do chute para conseguir fazer previsões corretas

// equação de previsão: Y = mX + b
// xs_dados representam X (horas estudadas)
// ys_dados representam Y (notas tiradas)
// m e b são os valores que o modelo vai ajustar para que
// a equação seja a mais precisa possível
function prever(x) {
    // mX + b
    return tf.mul(m, x).add(b);
}

// o cálculo do erro é feito usando mean squared error (mse)
// é importante pois é assim que o otimizador vai saber se
// o modelo está melhorando ou não
function calcularErro(previsoes, reais) {
    // a diferença entre as previsões e o valor real
    const erro = previsoes.sub(reais);
    // erro ^ 2
    const erroQuadrado = erro.square();
    // média de todos os erros
    const erroMedio = erroQuadrado.mean();
    return erroMedio;
}

// o learning rate define o tamanho do "passo" que 
// o otimizador dá a cada tentativa.
// quanto maior o valor, mais rápido o modelo aprende
// mas quanto menor, mais estável/preciso ele é
const taxaDeAprendizado = 0.05;
const otimizador = tf.train.sgd(taxaDeAprendizado);

// treinar por 1000 épocas
epocasTreinamento = 1000;
for (let epoca = 0; epoca < epocasTreinamento; epoca++) {
    // tf.tidy() ajuda a limpar a memória de tensores
    tf.tidy(() => {
        otimizador.minimize(() => {
            // prevê normalmente
            const previsoes = prever(xs_dados);
            
            // vê o quão errado a previsão está
            const erro = calcularErro(previsoes, ys_dados);

            // retorna o erro (o otimizador vai usar isso
            // para descobrir como ajustar 'm' e 'b')
            return erro;
        });
        
    });

    if (epoca === 1) {
        console.log(`Época inicial:`);
        // .dataSync() para extrair o valor do tensor
        // (normalmente, viria como um objeto)
        console.log('Valor de m:', m.dataSync()[0]);
        console.log('Valor de b:', b.dataSync()[0]);
    } else if (epoca === epocasTreinamento - 1) {
        console.log(`Época final:`);
        console.log('Valor de m:', m.dataSync()[0]);
        console.log('Valor de b:', b.dataSync()[0]);
    }
}

// tenta prever a nota de um aluno que estudou 3.5 horas
prever(3.5).print();  // deve estar perto de 9