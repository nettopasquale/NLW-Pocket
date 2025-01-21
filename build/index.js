"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var prompts_1 = require("@inquirer/prompts");
var fs = require("fs").promises; // módulo de file systems nativo do node
var mensagem = "Seja bem vindo, mas venha na maciota";
// array para guardar as metas
var metas;
// carregar metas salvas no JSON
var carregarMetas = function () { return __awaiter(void 0, void 0, void 0, function () {
    var dados, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs.readFile("metas.json", "utf-8")];
            case 1:
                dados = _a.sent();
                // cria um array com as metas salvas
                metas = JSON.parse(dados);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                metas = [];
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// salvar metas no JSON
var salvarMetas = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // promise de escrita de arquivos em JSON
            return [4 /*yield*/, fs.writeFile("metas.json", JSON.stringify(metas, null, 2))];
            case 1:
                // promise de escrita de arquivos em JSON
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// cadastra metas
var cadastrarMeta = function () { return __awaiter(void 0, void 0, void 0, function () {
    var meta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, prompts_1.input)({ message: "Digite a meta: " })];
            case 1:
                meta = _a.sent();
                if (meta.length == 0) {
                    mensagem = "A meta não pode ser vazia!";
                    return [2 /*return*/];
                }
                metas.push({ value: meta, checked: false });
                mensagem = "Meta cadastrada com sucesso!";
                return [2 /*return*/];
        }
    });
}); };
// lista as metas
var listarMeta = function () { return __awaiter(void 0, void 0, void 0, function () {
    var respostas, _loop_1, _i, respostas_1, resposta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (metas.length == 0) {
                    mensagem = "Nenhuma meta cadastrada!";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, prompts_1.checkbox)({
                        message: "Use as ARROW KEYS para mudar de meta, o <SPACE> para marcar/desmarcar e o <ENTER> para finalizar a etapa \n",
                        choices: __spreadArray([], metas, true),
                        instructions: false,
                    })];
            case 1:
                respostas = _a.sent();
                // garante que todas fiquem desmarcadas na chamada de volta!
                metas.forEach(function (m) {
                    m.checked = false;
                });
                if (respostas.length == 0) {
                    mensagem = "Nenhuma meta selecionada!";
                    return [2 /*return*/];
                }
                _loop_1 = function (resposta) {
                    var meta = metas.find(function (m) {
                        return m.value == resposta;
                    });
                    if (meta === undefined) {
                        throw new Error("A mensagem tem tipo indefinida!");
                    }
                    meta.checked = true;
                };
                // vai percorrer a lista de respostas
                for (_i = 0, respostas_1 = respostas; _i < respostas_1.length; _i++) {
                    resposta = respostas_1[_i];
                    _loop_1(resposta);
                }
                mensagem = "Meta(s) marcadas como concluída(s)";
                return [2 /*return*/];
        }
    });
}); };
// function paras as metas realizadas
var metasRealizadas = function () { return __awaiter(void 0, void 0, void 0, function () {
    var realizadas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (metas.length == 0) {
                    mensagem = "Nenhuma meta cadastrada!";
                    return [2 /*return*/];
                }
                realizadas = metas.filter(function (meta) {
                    return meta.checked;
                });
                if (realizadas.length == 0) {
                    mensagem = "Não existem metas realizadas!";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, prompts_1.select)({
                        message: "Metas realizadas: ".concat(realizadas.length),
                        choices: __spreadArray([], realizadas, true)
                    })];
            case 1:
                _a.sent();
                mensagem = "Metas realizadas com sucesso!";
                return [2 /*return*/];
        }
    });
}); };
// function paras as metas em aberto
var metasAbertas = function () { return __awaiter(void 0, void 0, void 0, function () {
    var abertas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (metas.length == 0) {
                    mensagem = "Nenhuma meta cadastrada!";
                    return [2 /*return*/];
                }
                abertas = metas.filter(function (meta) {
                    return meta.checked != true;
                });
                if (abertas.length == 0) {
                    mensagem = "Não existem metas abertas!";
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, prompts_1.select)({
                        message: "Metas abertas: ".concat(abertas.length),
                        choices: __spreadArray([], abertas, true)
                    })];
            case 1:
                _a.sent();
                console.log(abertas);
                return [2 /*return*/];
        }
    });
}); };
// function paras deletar metas
var deletarMetas = function () { return __awaiter(void 0, void 0, void 0, function () {
    var metasDesmarcadas, itemsADeletar;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (metas.length == 0) {
                    mensagem = "Nenhuma meta cadastrada!";
                    return [2 /*return*/];
                }
                metasDesmarcadas = metas.map(function (meta) {
                    // forçar que o checked fique em falso
                    // evitar que venha algum item marcado
                    return { value: meta.value, checked: false };
                });
                return [4 /*yield*/, (0, prompts_1.checkbox)({
                        message: "Selecione um item para deletar \n",
                        choices: __spreadArray([], metasDesmarcadas, true),
                        instructions: false,
                    })];
            case 1:
                itemsADeletar = _a.sent();
                if (itemsADeletar.length == 0) {
                    mensagem = "Nenhum item para deletar!";
                    return [2 /*return*/];
                }
                ;
                // filtra os items que não serão deletados
                itemsADeletar.forEach(function (item) {
                    metas = metas.filter(function (meta) {
                        return meta.value != item;
                    });
                });
                mensagem = "Meta(s) deletada(s) com sucesso!";
                return [2 /*return*/];
        }
    });
}); };
// mensagens de cada etapa
var mostrarMensagem = function () {
    console.clear();
    if (mensagem != "") {
        console.log(mensagem);
        console.log("");
        mensagem = "";
    }
};
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var opcionies, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, carregarMetas()];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                if (!true) return [3 /*break*/, 17];
                mostrarMensagem();
                return [4 /*yield*/, salvarMetas()];
            case 3:
                _b.sent();
                return [4 /*yield*/, (0, prompts_1.select)({
                        message: "Menu >", // mensagem simples
                        choices: [
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
                    })];
            case 4:
                opcionies = _b.sent();
                _a = opcionies;
                switch (_a) {
                    case "cadastrar": return [3 /*break*/, 5];
                    case "listar": return [3 /*break*/, 7];
                    case "realizadas": return [3 /*break*/, 9];
                    case "abertas": return [3 /*break*/, 11];
                    case "deletar": return [3 /*break*/, 13];
                    case "sair": return [3 /*break*/, 15];
                }
                return [3 /*break*/, 16];
            case 5: 
            // Precisa esperar meta ser cadastrada!
            return [4 /*yield*/, cadastrarMeta()];
            case 6:
                // Precisa esperar meta ser cadastrada!
                _b.sent();
                return [3 /*break*/, 16];
            case 7: return [4 /*yield*/, listarMeta()];
            case 8:
                _b.sent();
                return [3 /*break*/, 16];
            case 9: return [4 /*yield*/, metasRealizadas()];
            case 10:
                _b.sent();
                return [3 /*break*/, 16];
            case 11: return [4 /*yield*/, metasAbertas()];
            case 12:
                _b.sent();
                return [3 /*break*/, 16];
            case 13: return [4 /*yield*/, deletarMetas()];
            case 14:
                _b.sent();
                return [3 /*break*/, 16];
            case 15:
                console.log("Bye Bye :)");
                return [2 /*return*/];
            case 16: return [3 /*break*/, 2];
            case 17: return [2 /*return*/];
        }
    });
}); };
start();
