const mongoose = require('mongoose');

const categoriaOculta = mongoose.model('categoria oculta', {
    index:{
        type: Number,
        required: true
    },

    nome:{
        type:String,
        required:true
    },

    descricao:{
        type: String,
        required:true
    },

    inicio:{
        type:Date,
        required:true
    },

    fim:{
        type:Date,
        required:true
    },

    img:{
        type:String,
        required:true
    }
})

module.exports = categoriaOculta;