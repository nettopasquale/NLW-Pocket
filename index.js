const start = () => {
    let opcionies = "";

    switch (opcionies) {
        case "cadastrar":
            console.log("Lets cadastr");
            break;
        case "listar":
            console.log("vamos listar");
            break;
        default:
            console.error("Opção inválida :(");
    }
}

start()