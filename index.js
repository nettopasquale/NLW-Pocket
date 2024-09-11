const { select, input, checkbox } = require('@inquirer/prompts');

// objeto estrutural da meta
let meta = {
    value: 'Tomar 30L de café',
    checked: false,
};

const verificaMetasCadastradas = () => {
    //caso o usuário tente fazer qualquer coisa sem cadastrar tarefas!
    try {
        if (metas.length == 0) {
            console.error("Nenhuma meta cadastrada!");
            return;
        }
    } catch (error) {
        error.message("UIA!");
    }

}

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

    verificaMetasCadastradas();
    
    // checkbox tb depende de mensagens e um array de respostas selecionadas.
    const respostas = await checkbox({
        message: "Use as ARROW KEYS para mudar de meta, o <SPACE> para marcar/desmarcar e o <ENTER> para finalizar a etapa \n",
        choices: [...metas],
        instructions: false,
    });
    
     // garante que todas fiquem desmarcadas na chamada de volta!
     metas.forEach((m) => {
        m.checked = false;
    })
    
    if (respostas.length == 0) {
        console.error("Nenhuma meta selecionada!");
        return;
    }

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

// function paras as metas realizadas
const metasRealizadas = async () => {

    verificaMetasCadastradas();

    // retornar apenas as metas com check de true
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        console.error("Não existem metas realizadas!");
        return;
    }

    await select({
        message: `Metas realizadas: ${realizadas.length}`,
        choices: [...realizadas]
    });

    console.log(realizadas);
}

// function paras as metas em aberto
const metasAbertas = async () => {
    verificaMetasCadastradas();

    // retornar apenas as metas com check de false
    const abertas = metas.filter((meta) => {
        return meta.checked != true;
    });

    if (abertas.length == 0) {
        console.error("Não existem metas abertas!");
        return;
    }

    await select({
        message: `Metas abertas: ${abertas.length}`,
        choices: [...abertas]
    });

    console.log(abertas);
}

// function paras deletar metas
const deletarMetas = async () => {
    verificaMetasCadastradas();

    // Eu quero criar uma nova lista APENAS com metas NÃO marcadas!
    // map serve para criar uma nova lista com valores modificados!
    const metasDesmarcadas = metas.map((meta) => {
        // forçar que o checked fique em falso
        // evitar que venha algum item marcado
        return {value: meta.value, checked: false};
    })

    const itemsADeletar = await checkbox({
        message: "Selecione um item para deletar \n",
        choices: [...metasDesmarcadas],
        instructions: false,
    });

    if (itemsADeletar == 0) {
        console.error("Nenhum item para deletar!");
        return;
    };

    // filtra os items que não serão deletados
    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
    
    console.log(itemsADeletar);

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
                        name: "metas realizadas", 
                        value: "realizadas" 
                    },
                    {
                        name: "metas abertas", 
                        value: "abertas" 
                    },
                    {
                        name: "Deletar metas", 
                        value: "deletar" 
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
                
                case "realizadas":
                    await metasRealizadas();
                    break;
                
                case "abertas":
                    await metasAbertas();
                    break;
                
                case "deletar":
                    await deletarMetas();
                    break;
                
                case "sair":
                    console.log("Bye Bye :)");
                    return;
                
            }
        }
    }


start()