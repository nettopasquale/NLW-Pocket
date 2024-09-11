--npm init -y 

--npm i typescript -D -> instala Typecript

-- npx tsc --init -> instala tsconfig.json

## Para este projeto!

- Procurar no github de tsconfigbases a config baseada na versão do Node
- nesse caso é em Node 20, para devs pode ser outro

- copiar o json de tsconfigNode20 em cima do padrão do projeto!

## Encerra obs

-- npm i @types/node tsx -D -> dependencias de typecript para Node
tsx -> permite executar o projeto sem converte-lo

## Para este projeto!

- criar um script "dev" dentro da chave de scripts em package.json
- "dev" deve conter o comando tsx.
- o comando -> tsx src/http/server.ts

PARA EXECUTAR -> npm run dev

- o comando -> tsx watch src/http/server.ts
- watch permite o código ser executado sempre q ele tiver mudanças e ser salvo

## Encerra obs

-- npm i fastify -> framework de portas de http

-- npm i -D --save-exact @biomejs/biome -> ferramenta que ajuda na formatação do código
- necessário criar um arquivo config json!
- necessário configurar o settings json desse projeto!
- instalar extensão do biome!
