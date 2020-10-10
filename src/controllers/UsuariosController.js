const User = require('../models/Usuario')

module.exports ={
    async  criarUsuario(req, res){
        try {
            const user = new User(req.body)
            await user.save()
            const token = await user.gerarToken()
            res.status(201).send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    },
    
    async index(req, res){
        try {
            const usuarios = await User.find({}).sort('nome');
            
            res.send(usuarios)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    async updateUser(req, res){
        try {
            const usuario = await User.findOneAndUpdate({cpf: req.body.cpf}, { "$set":{nome: req.body.nome, telefone:req.body.telefone, endereco:req.body.endereco, cep:req.body.cep, uf:req.body.uf}})
            res.send(usuario)
        } catch(error){
            res.status(400).send(error)
        }
    },
    async deleteUser(req, res){
        try {
            const usuario = await User.findOneAndRemove({cpf: req.params.cpf})
            res.send(usuario)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}