const mongoose = require('mongoose');
// const capitalizeMiddleware = require('../../controllers/produtos_controller');
const categoria = require('../categoriaAtiva/schema')

const produtoAtivoSchema = new mongoose.Schema({
    index: {
        type: Number,
        index: true,
        required: true,
        unique: true,
        integer: true
    },
    nome: {
        type: String,
        required: true,
        unique: true
    },
    preco: {
        type: Number,
        required: true
    },
    genero: {
        type: String,
        required: true,
        enum: ['masculino', 'feminino', 'unissex']
    },
    descricao: {
        type: String,
        required: true
    },
    tamanhos: [
        {
          type: String,
          required: true,
          enum: ['PP', 'P', 'M', 'G', 'GG', 'XGG'],
        }
      ],
    cor: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['vestido', 'macacão', 'calça', 'blusa', 'camisa', 'calçado', 'blazer', 'paletó']
    },
    linkFoto1: {
        type: String,
        required: true,
        unique: true
    },
    linkFoto2: {
        type: String,
        unique: true
    },
    linkFoto3: {
        type: String,
        unique: true
    },
    fk_categoria: {
        type:  Number,
        required:true,
        ref: 'categoriaAtiva',
        validate: {
            validator: async function (value) {
                const categoria_validacao = await categoria.findOne({ index: value });
                return !!categoria_validacao;
            },
            message: 'Categoria não encontrada.',
        },
    },
});

// produtoAtivoSchema.pre('save', capitalizeMiddleware);


module.exports = mongoose.model('Produto', produtoAtivoSchema);