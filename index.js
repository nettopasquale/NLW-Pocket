const { select, input } = require('@inquirer/prompts');

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
    const meta = await input({ message: "Digite a meta: " });
    
    if (meta.length == 0) {
        console.error("A meta não pode ser vazia!");
        return;
    }

    metas.push(
        {value: meta, checked: false}
    )
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
                    console.log("vamos listar");
                    break;
                
                case "sair":
                    return;
                
            }
        }
    }


start()