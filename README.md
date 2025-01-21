## Sistema de Cadastro de Metas via Terminal - Beta

  Projeto de cadastro de metas feito no terminal, realizado em aulas gratuitas do evento NLW da Rocketseat.
  O projeto consiste em cadastrar, listar, deletar e selecionar metas em aberto e metas realizadas, através do terminal.  
  O projeto foi realizado com:
  - Javascript
  - Node.js versão 20.17
  - Biblioteca Inquirer

ATUALIZAÇÃO(20/01/2025)
-- Typescript foi adicionado ao projeto, com tipificação dos arquivos

  O projeto agora possui a biblioteca Typescript, e possui as tipagens do Node e da Inquirer em suas dependências.
  A adição de Typescript foi feita por conta própria, após estudos recentes sobre a biblioteca. Eu já havia estudado Typescript antes, mas nunca implementei sozinho nos projetinhos.

  Adicionar neste projeto foi relativamente simples, tendo apenas dois problemas: A tipificação do objeto metas, e o retorno da função find() ao verificar a lista de metas 
  cadastradas para checar como "verdadeiras" as metas já realizadas. 
  Resolver o primeiro problema foi relativamente simples: Tipicar metas como um array de objetos. Porém, como cada objeto tem chaves específicas, a biblioteca alertava problemas com 
  a busca dos nomes de cada meta cadastrada. A solução foi desestruturar o objeto em sua tipagem, de forma que metas teria o tipo "{values:string, checked:boolean}[]"

  O segundo problema não foi difícil de resolver, mas foi o mais interessante: Nesses estudos de Typescript, foi dito que a biblioteca, por default, alerta erros sobre possíveis retornos indefinidos.
  Ao verificar o código, e pesquisar na internet, pude notar que as funções "find()" e "forEach()", que estavam alertando esse problema, possuem em seu método de contrução, tipagem "indefinida", 
  então durante a execução de suas callbacks, o typescript não consegue prever a inferência de tipagem em seus retornos. 

  Existem duas soluções para esse problema: adicionar uma "!" no valor de retorno, que força a biblioteca a aceitar os retornos da função, ou criar uma tratativa defensiva que lide com o valor de retorno
  sendo possivelmente "indefinido", e assim retornar uma mensagem de erro apropriada; Escolhi seguir esta segunda opção, pois acredito que é mais completa e pode facilitar na resolução de possíveis futuros bugs.

  Ainda há muito que melhorar, e gostaria de evoluir mais com essa biblioteca!
  

## To-dos

-- Reescrever o código para melhorar técnicas de programação defensiva;
