# Anotações

## Importação
```javascript
const tf = require('@tensorflow/tfjs');
```
- Importa a biblioteca TensorFlow.js

## Criação de Tensores

### Tensor 1D
```javascript
const xs_dados = tf.tensor1d([1, 2, 3, 4]);
```
- `tf.tensor1d()` cria um tensor unidimensional (array simples)
- Representa uma lista de valores

### Escalar
```javascript
const m = tf.variable(tf.scalar(Math.random()));
```
- `tf.scalar()` cria um tensor com um único valor
- `Math.random()` gera um número aleatório entre 0 e 1

## Variáveis Treináveis

```javascript
const m = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
```
- `tf.variable()` marca um tensor como treinável
- Seus valores serão ajustados pelo otimizador durante o treinamento

## Operações com Tensores

### Multiplicação
```javascript
tf.mul(m, x)
```
- Multiplica dois tensores elemento a elemento

### Adição
```javascript
.add(b)
```
- Soma tensores elemento a elemento

### Subtração
```javascript
previsoes.sub(reais)
```
- Subtrai tensores elemento a elemento

### Potência/Quadrado
```javascript
erro.square()
```
- Eleva cada elemento ao quadrado

### Média
```javascript
erroQuadrado.mean()
```
- Calcula a média de todos os elementos

## Encadeamento de Operações

```javascript
function prever(x) {
    return tf.mul(m, x).add(b);
}
```
- O tensorflow permite encadeamento de operações com `.` (method chaining)
- Exemplo: `tf.mul(m, x).add(b)` é equivalente a `mX + b`

## Otimizador

```javascript
const taxaDeAprendizado = 0.05;
const otimizador = tf.train.sgd(taxaDeAprendizado);
```
- `tf.train.sgd()` cria um otimizador Stochastic Gradient Descent
- Taxa de aprendizado controla o tamanho do passo nas atualizações

## Treinamento

### Minimize
```javascript
otimizador.minimize(() => {
    const previsoes = prever(xs_dados);
    const erro = calcularErro(previsoes, ys_dados);
    return erro;
});
```
- `minimize()` ajusta as variáveis para reduzir o erro retornado
- Passa uma função que retorna o valor a ser minimizado
- O otimizador calcula gradientes automaticamente

### tidy()
```javascript
tf.tidy(() => {
    // ...
});
```
- Libera automaticamente tensores intermediários
- Evita vazamento de memória em loops de treinamento

## Extração de Valores

### dataSync()
```javascript
m.dataSync()[0]
```
- `.dataSync()` extrai o valor JavaScript do tensor
- Retorna um array tipado
- `[0]` acessa o primeiro elemento

### print()
```javascript
prever(15).print();  // exibe o valor na console
```
- `.print()` exibe o tensor e seu valor na console
- Útil para debug e visualização rápida de resultados
- Trabalha diretamente com o tensor (não precisa extrair com `.dataSync()`)

## Loop de Treinamento

```javascript
for (let epoca = 0; epoca < epocasTreinamento; epoca++) {
    tf.tidy(() => {
        otimizador.minimize(() => {
            // ...
            return erro;
        });
    });
}
```
- **Época**: uma passagem completa pelos dados

## Mean Squared Error (MSE)

```javascript
const erro = previsoes.sub(reais);
const erroQuadrado = erro.square();
const erroMedio = erroQuadrado.mean();
```
- Diferença: `previsão - valor real`
- Quadrado: elimina negativos e amplifica erros grandes
- Média: normaliza para o número de amostras
- Usado como métrica de qualidade do modelo