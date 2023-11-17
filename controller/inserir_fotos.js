const dotenv = require("dotenv")
dotenv.config({path: '../.env'})

const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService(process.env.AZURE_BLOB_STRING);

const containerName = 'imagens';
const { Readable } = require('stream');

function inserir_fotos(files) {
    
  // Pega cada arquivo mandado pelo formulário e cria uma promessa
  return files.map(file => {
    const blobName = file.originalname;
    const stream = new Readable();
    stream.push(file.buffer);
    stream.push(null);

    const options = {
      contentSettings: {
        contentType: file.mimetype,
      },
    };

    // Retorna a promessa diretamente
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
}

module.exports = inserir_fotos;
