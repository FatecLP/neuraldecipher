# Problemas Durante o Desenvolvimento

## 🔴 Problema 1: NaN no exemplo2.js

### 📝 Descrição
Durante a execução do `exemplo2.js` (conversão Celsius → Fahrenheit), o modelo apresentava valores `NaN` durante o treinamento, impossibilitando o aprendizado correto.

### 🔍 Causa Identificada
O problema ocorria devido à **combinação de fatores**:
- **Valores de entrada**: A conversão de temperatura trabalha com números maiores referentes ao exemplo 1 (0-30 Celsius → 32-86 Fahrenheit)
- **Taxa de aprendizado**: Uma taxa de aprendizado elevada faz o otimizador dar "passos" muito grandes
- **Épocas de treinamento**: Diminuindo a taxa de aprendizado, devemos aumentar as iterações para convergência adequada

### ✅ Solução

1. **Reduzir a taxa de aprendizado**
```javascript
const taxaDeAprendizado = 0.001;  // 50x menor
```

2. **Aumentar o número de épocas**
```javascript
epocasTreinamento = 5000;  // 50x mais iterações
```

---

## 🔴 Problema 2: Mínimo Local (Local Minimum)

### 📝 Descrição
Após implementar a descriptografia baseada em padrões criptográficos, o modelo ficou "preso" em um ponto:

```
Texto: "Descubra." - JEFF, Big
Predição: #Derctbqa/#!.!JEFF-!Big
```

O modelo parava de evoluir e repetia o mesmo padrão incorreto nas iterações seguintes, nunca melhorando a predição apesar de continuar treinando.

### 🔍 Causa Identificada
O modelo convergiu para um **mínimo local** da função de erro:

```
         global minimum (verdadeira solução)
              ↓
         _____|_____
        /           \
       /             \
      /               \___
     /                     \___
    /                           \ ← local minimum (onde ficou preso)
```

- A função de erro encontrou uma solução "aceitável" que não melhora mais
- O gradiente naquele ponto é zero, então o otimizador não consegue encontrar direção de melhora
- O modelo não explora outras regiões do espaço de soluções

### ✅ Solução

1. **Normalização de Dados**
```javascript
const xs_min = xs_tensor.min();
const xs_max = xs_tensor.max();
const xs_range = xs_max.sub(xs_min);

const ys_min = ys_tensor.min();
const ys_max = ys_tensor.max();
const ys_range = ys_max.sub(ys_min);

const xs_normalizado = xs_tensor.sub(xs_min).div(xs_range);
const ys_normalizado = ys_tensor.sub(ys_min).div(ys_range);
```