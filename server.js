//Import das bibliotecas
const dotenv = require("dotenv")
const express = require("express")
const servidor = express()

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Config das bibliotecas
dotenv.config()

//Variaveis do Servidor

const server_port = process.env.SERVER_PORT || 3000 //Inicia o server PORT na variavel de ambiente ou na porta 3000
const azure_blob_string = process.env.AZURE_BLOB_STRING // Guarda a chave de acesso ao azure blob
const azure_mongo_string = process.env.AZURE_MONGO_STRING // Guarda a chave de acesso do azure mongodb

// Import das rotas

const rota_post = require("./routes/post")


// Middleware


//Consumo das rotas

servidor.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Cria uma rota de documentação

servidor.use("/" , rota_post)


servidor.listen( server_port, () =>{
    console.log("Servidor aberto na porta: " + server_port)

})