const router = require('express').Router();
const auto_increment = require("../controllers/auto_increment")


// CRIAR AS ROTAS DE GET POST ETC


const { categoriaAtiva : categoriaSchema } = require('../models/categoriaAtiva/schema')

const testeModelo = require("../models/categoriaAtiva/schema')

const categoriaAtivaRota = {
    
    // rota POST
    create: async (req, res) => {
        let index = await auto_increment(categoriaAtiva)

        const nome = req.body.nome
        const descricao = req.body.descricao
        const inicio = req.body.inicio
        const fim = req.body.fim
        const img = req.body.img

         const novaCategoria = new categoriaAtiva({
        index: 100,
        nome: nome,
        descricao: inicio,
        inicio: new Date(inicio), 
        fim: new Date(fim),   
        img: img 
         });
        
        try {

            //criando a resposta para enviar pro banco
            novaCategoria.save()
            .then(( resultado) =>{

                res.json(" Cadastrado com sucesso " +resultado).status(201)
            })
            .catch((err)) =>{

                res.json({"err" : err}).status(400)
            }

        } catch (error) {
            console.log(error)
        }
    },

    // rota GETALL
    getAll: async(req, res) => {
        try {
            const categorias = await categoriaAtiva.find()
            res.json(categorias)
            
        } catch (error) {
            console.log(error);
        }
    },

    // metodo GET BY ID
    get: async(req, res) => {
        try {
            const id = req.params.id

            const categoria = await categoriaAtiva.findOne(id)

            if(!categoria){
                res.status(404).json({msg: 'categoria não encontrada'})
                return;
            }

            res.json(categoria)
        } catch (error) {
            console.log(error);
        }
    },

    //metodo DELETE
    delete: async(req, res) => {
        const id = req.params.id

        const categoria = await categoriaAtiva.findOne(id)
        if (!categoria) {
          res.status(404).json({ msg: "categoria não encontrada" });
          return;
        }

        const categoriaDeletada = await categoriaAtiva.findByIdAndDelete(id)

        res.status(201).json({categoriaDeletada, msg: 'categoria deletada com sucesso'})
    },

    // metodo UPDATE
    update: async(req, res) => {
        const id = req.params.id;

        const categoria = {
          index: req.body.index,
          nome: req.body.nome,
          descricao: req.body.descricao,
          inicio: req.body.inicio,
          fim: req.body.fim,
          img: req.body.img,
        };

        const categoriaAtualizada = await categoriaAtiva.findByIdAndUpdate(id, categoria)

        if (!categoriaAtualizada) {
          res.status(404).json({ msg: "categoria não encontrada" });
          return;
        }

        res.status(200).json({categoriaAtualizada, msg: 'categoria atualizada'})
    }

}


//rota do metodo POST
router.route('/categoriaAtiva').post((req, res) => categoriaAtivaRota.create(req, res));

//rota GET ALL
router.route('/categorias').get((req, res) => categoriaAtivaRota.getAll(req, res));


// rota GET
router.route('/categoria/:id').get((req, res) => categoriaAtivaRota.get(req, res))

// rota DELETE
router
  .route("/categoria/:id")
  .delete((req, res) => categoriaAtivaRota.delete(req, res));

// rota UPDATE
router.route('/categoria/:id').put((req, res) => categoriaAtivaRota.update(req, res));

module.exports = router;
