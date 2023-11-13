const express = require('express');
const dotenv = require("dotenv")
const router = express.Router();

dotenv.config({path: '../.env'})

console.log(process.env.AZURE_BLOB_STRING)

// Biblioteca para aceitar arquivos de mídia
const multer = require('multer');
const { Readable } = require('stream');

// Configuração do Multer para o upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configuração do cliente Azure Blob Storage
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService(process.env.AZURE_BLOB_STRING);
const containerName = 'imagens';  // Substitua com o nome do seu container no Azure Blob Storage



// Rota de upload

router.post('/produto/novo', upload.array('images'), (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }

    // Pega cada arquivo mandado pelo formulário e cria uma promisse
    const uploadPromises = files.map(file => {
    const blobName = file.originalname;
    const stream = new Readable();
    stream.push(file.buffer);
    stream.push(null);
  
    const options = {
      contentSettings: {
        contentType: file.mimetype, // Usa o tipo MIME fornecido pelo multer
      },
    };

    //Caso a promisse tenha sido feita corretamente, ele tenta enviar para o azure
    return new Promise((resolve, reject) => {
      blobService.createBlockBlobFromStream(containerName, blobName, stream, file.size, options, (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  });
  

  // Aguarda todos os uploads concluírem
  Promise.all(uploadPromises)
    .then(results => {
      res.json({ success: true, results }).status(200);
    })
    .catch(error => {
      console.error('Erro no upload para o Azure Blob Storage:', error);
      res.status(500).json({ success: false, error: error.message });
    });
});


module.exports = router;
