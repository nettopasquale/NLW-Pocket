## LP

Esse é um markdown.

**Algoritmos**:

## Peças de uma linguagem
-
-
-
-
-

## Fases da resolução de um problema
-
-
-
-
-

## Tipos de dado

# Operadores

# Await / async

- Basicamente, é uma função assíncrona que depende do término de outra função para acontecer

- Inicialmente tinhamos uma função que, ao ser chamada, iniciava um switch/case a partir da referência "opciones";
- como essa referência já tinha um dado bruto, ela sempre retorna o valor dentro do esperado;

- Mas para deixar melhor essa função, queremos que esse switch/case dependa do prompt do usuário.

- A melhor forma para isso é tornar a função assíncrona, pois assim a refência "opciones" só terá um valor atribuido quando
- o prompt do usuário captar um input; Para esse input vamos usar a biblioteca "Inquirer"

- Ou seja, "opciones" precisa ESPERAR que a função SELECT de INQUIRER seja resolvida primeiro;



## Promises

- Await e async são fundamentais para entender Promises (literalmente promessas)
- isso porque, a resposta da função que recebe "await" é chamada de Promise

- No caso acima, se "opciones" não tivesse um await, ou seja, uma promessa de uma resposta, ela n teria atribuição nenhuma