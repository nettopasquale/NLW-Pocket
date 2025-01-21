import { select, input, checkbox } from '@inquirer/prompts';

const fs = require("fs").promises; 

let mensagem:string = "Seja bem vindo, mas venha na maciota";

let metas: {value: string, checked: boolean} [];

const carregarMetas = async ():Promise<void> => {
    try {
        //promise para ler o arquivo json das metas salvas
        const dados = await fs.readFile("metas.json", "utf-8");

        // cria um array com as metas salvas
        metas = JSON.parse(dados)
    } catch (error) {
        metas = [];
    }
}

const salvarMetas = async ():Promise<void> => {

    // promise de escrita de arquivos em JSON
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

// cadastra metas
const cadastrarMeta = async ():Promise<void> => {
    const meta = await input({ message: "Digite a meta: " });
    
    if (meta.length == 0) {
        mensagem = "A meta não pode ser vazia!";
        return;
    }

    metas.push(
        {value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso!"
}

// lista as metas
const listarMeta = async () => {

    if (metas.length == 0) {
        mensagem = "Nenhuma meta cadastrada!";
        return;
    }
    
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
        mensagem = "Nenhuma meta selecionada!";
        return;
    }


    // vai percorrer a lista de respostas
    for (let resposta of respostas) {
        const meta = metas.find(m => {
            return m.value == resposta
        })

        if (meta === undefined) {
            throw new Error(`A mensagem tem tipo indefinida!`)
        }

        meta.checked = true;
    }

    mensagem = "Meta(s) marcadas como concluída(s)";
}

// function paras as metas realizadas
const metasRealizadas = async () => {

    if (metas.length == 0) {
        mensagem = "Nenhuma meta cadastrada!";
        return;
    }
    

    // retornar apenas as metas com check de true
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        mensagem = "Não existem metas realizadas!";
        return;
    }

    await select({
        message: `Metas realizadas: ${realizadas.length}`,
        choices: [...realizadas]
    });

    mensagem = "Metas realizadas com sucesso!"
}

// function paras as metas em aberto
const metasAbertas = async () => {
    
    if (metas.length == 0) {
        mensagem = "Nenhuma meta cadastrada!";
        return;
    }

    // retornar apenas as metas com check de false
    const abertas = metas.filter((meta) => {
        return meta.checked != true;
    });

    if (abertas.length == 0) {
        mensagem = "Não existem metas abertas!";
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
    
    if (metas.length == 0) {
        mensagem = "Nenhuma meta cadastrada!";
        return;
    }
    

    // criar uma nova lista APENAS com metas NÃO marcadas!
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

    if (itemsADeletar.length == 0) {
        mensagem = "Nenhum item para deletar!";
        return;
    };

    // filtra os items que não serão deletados
    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
    
    mensagem = "Meta(s) deletada(s) com sucesso!";

}

// mensagens de cada etapa
const mostrarMensagem = () => {
    console.clear();

    if (mensagem != "") {
        console.log(mensagem);
        console.log("");
        mensagem = "";
    }
}

const start = async () => {
    await carregarMetas();

    while (true) {
        mostrarMensagem();
        await salvarMetas();

        // select tem que ser resolvida antes de ser atribuida em opciones
        const opcionies =  await select({
            message: "Menu >", 
            choices: [ 
                {
                    name: "Cadastra meta", 
                    value: "cadastrar" 
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