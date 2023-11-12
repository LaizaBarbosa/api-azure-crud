//Import das bibliotecas
const dotenv = require("dotenv")
const express = require("express")
const servidor = express()

// Config das bibliotecas
dotenv.config()

//Variaveis do Servidor

const server_port = process.env.SERVER_PORT || 3000 //Inicia o server PORT na variavel de ambiente ou na porta 3000
const azure_blob_string = process.env.AZURE_BLOB_STRING // Guarda a chave de acesso ao azure blob
const azure_mongo_string = process.env.AZURE_MONGO_STRING // Guarda a chave de acesso do azure mongodb




//

servidor.listen( server_port, () =>{
    console.log("Servidor aberto na porta: " + server_port)

})