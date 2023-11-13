const mongoose = require("mongoose")

async function conectar_banco(string_conexao){

    await mongoose.connect(string_conexao)
    .then(() =>{
        console.log("Conectado ao banco com sucesso.")
    })
    .catch((erro) =>{
        console.log("Erro ao conectar ao banco de dados: " + erro)
    })

}

module.exports = conectar_banco