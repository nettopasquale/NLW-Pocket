const { select, input, checkbox } = require('@inquirer/prompts');

// objeto estrutural da meta
let meta = {
    value: 'Tomar 30L de café',
    checked: false,
};

// array para guardar as metas
let metas = [];

// cadastra metas
const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta: " });
    
    if (meta.length == 0) {
        console.error("A meta não pode ser vazia!");
        return;
    }

    metas.push(
        {value: meta, checked: false}
    )
}

// lista as metas
const listarMeta = async () => {

    //caso o usuário tente listar as metas sem cadastrar antes
    if (metas.length == 0) {
        console.error("Nenhuma meta cadastrada!");
        return;
    }
    
    // checkbox tb depende de mensagens e um array de respostas selecionadas.
    const respostas = await checkbox({
        message: "Use as ARROW KEYS para mudar de meta, o <SPACE> para marcar/desmarcar e o <ENTER> para finalizar a etapa \n",
        choices: [...metas],
        instructions: false,
     });
    
    if (respostas.length == 0) {
        console.error("Nenhuma meta selecionada!");
        return;
    }

    // garante que todas fiquem desmarcadas na chamada de volta!
    metas.forEach((m) => {
        m.checked = false;
    })

    // vai percorrer a lista de respostas
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        // a meta só vai ficar como vERDADEIRA
        //SE eu listar com os comandos
        meta.checked = true;
    });

    console.log("Meta(s) concluída(s)");
}

const start = async () => {

    // Que situação aqui seria falso?
    while (true) {
            // select tem que ser resolvida antes de ser atribuida em opciones
            const opcionies =  await select({
                message: "Menu >", // mensagem simples
                choices: [ // escolhas de input, ARRAY!
                    {
                        name: "Cadastra meta", //mensagem 1
                        value: "cadastrar" // valor da mensagem 1
                    },
                    {
                        name: "Listar metas", 
                        value: "listar" 
                    },
                    {
                        name: "Sair",
                        value: "sair"
                    }
                ]
            });
        
            switch (opcionies) {
                case "cadastrar":
                    // Precisa esperar meta ser cadastrada!
                    await cadastrarMeta();
                    console.log(metas);
                    break;
                
                case "listar":
                    await listarMeta();
                    break;
                
                case "sair":
                    return;
                
            }
        }
    }


start()