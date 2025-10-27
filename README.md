# NeuralDecipher - README

[![Status do Projeto](https://img.shields.io/badge/Status-Concluído-brightgreen)]()
[![GitHub last commit](https://img.shields.io/github/last-commit/FatecLP/neuraldecipher)]() <br />
[![JavaScript](https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square)]()
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=&logo=Node.js&logoColor=white)]()
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=flat&logo=tensorflow&logoColor=white)]()

**NeuralDecipher** é um projeto de Machine Learning desenvolvido na **Fatec Luigi Papaiz** que utiliza regressão linear com **TensorFlow.js** para aprender padrões de criptografia e decifrar mensagens. O modelo treina com pares de caracteres ASCII (puro/cifrado) e descobre os valores de multiplicação (m) e adição (b) usados na cifra.

## 👥 Nomes dos Integrantes
- André Diogo Melchior da Silva
- Juan Pablo Firmino Ferreira
- Michael Akira de Lima Kuwahara
- Murilo de Oliveira Sartori

## 👨🏻‍🏫 Professor
- **PhD - [Bruno Zolotareff dos Santos](https://github.com/bzsantos)** (Desenvolvimento Web II: FATEC Diadema - Luigi Papaiz)

## 📚 Tecnologias Utilizadas

- **JavaScript (Node.js)** - Linguagem principal do projeto
- **TensorFlow.js** - Biblioteca de Machine Learning
- **Regressão Linear** - Algoritmo de aprendizado utilizado
- **Normalização de Dados** - Técnica para evitar o mínimo local

## 🎯 Objetivo do Projeto

O desafio era criar um modelo de ML capaz de:
1. **Aprender a relação** entre algo criptografado e seu valor original
2. **Descobrir os parâmetros** m (multiplicação) e b (adição) da cifra linear
3. **Decifrar textos** usando os parâmetros aprendidos

## 🔐 Como Funciona a Criptografia

A cifra utiliza a fórmula linear: **Y = m × X + b**

```javascript
// Criptografar
const asciiPuro = 'A'.charCodeAt(0);      // 65
const asciiCifrado = (65 * 3) + 7;        // 202
```

O modelo treina para descobrir que **m = 3** e **b = 7** observando múltiplos pares puro/cifrado.

## 🗂️ Arquivos do Projeto

| Arquivo | Descrição |
|---------|-----------|
| **desafio.js** | Arquivo principal - treina o modelo para decifrar |
| **cripto.js** | Implementação da cifra linear (Y = mX + b) |
| **normalizar.js** | Funções utilitárias de normalização de dados |
| **exemplo1.js** | Exemplo básico: horas estudadas vs nota |
| **exemplo2.js** | Exemplo: conversão Celsius para Fahrenheit |
| **sintaxe.md** | Comentários de sintaxe TensorFlow.js |
| **problemas.md** | Registro de problemas e aprendizados |

## 🚀 Como Executar

1. **Clone o repositório**
```bash
git clone https://github.com/FatecLP/neuraldecipher.git
cd neuraldecipher
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o desafio principal**
```bash
node desafio.js
```

4. **Execute os exemplos educacionais**
```bash
node exemplo1.js
node exemplo2.js
```

## 📈 Fluxo de Execução

1. Carrega mensagem em texto puro
2. Converte para array de códigos ASCII
3. Criptografa usando a fórmula Y = 3X + 7
4. Cria tensores com ASCII puro e cifrado
5. **Normaliza dados** para evitar problemas
6. Treina modelo com SGD por 5000 épocas
7. A cada 10 épocas, tenta decifrar a mensagem
8. Quando decifração for 100% correta, para e exibe resultado

## 📜 Licença

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Este projeto está licenciado sob a licença MIT.

**Nota:** Projeto educacional desenvolvido na FATEC Luigi Papaiz. Demonstra conceitos práticos de Machine Learning, regressão linear e otimização de parâmetros aplicados a um problema real de criptoanálise.

---

<div align="center">
  <strong>Desenvolvido com 💙 pela equipe NeuralDecipher</strong><br>
  FATEC Luigi Papaiz - Diadema/SP - 2025
</div>