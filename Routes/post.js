const express = require('express');
const router = express.Router();
const inserir_fotos = require("../controller/inserir_fotos")

// Biblioteca para aceitar arquivos de mídia
const multer = require('multer');

// Configuração do Multer para o upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configuração do cliente Azure Blob Storage

// Rota de upload

router.post('/produto/novo', upload.array('images'), (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }
  else{
  const uploadPromises = inserir_fotos(files)
     // Aguarda todos os uploads concluírem
    Promise.all(uploadPromises)
    .then(results => {
      res.json({ success: true, results }).status(200);
    })
    .catch(error => {
      console.error('Erro no upload para o Azure Blob Storage:', error);
      res.status(500).json({ success: false, error: error.message });
    });
  }

});


module.exports = router;
