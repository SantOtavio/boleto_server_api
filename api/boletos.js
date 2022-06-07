const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
let pessoa = require("./pessoas");
let usuario = require("./usuarios");


let listaBoletos = [];

function listarBoletos() {
    return listaBoletos;
}

function listarBoletosId(req) {
    const id = req.params.id;
    const boleto = listaBoletos.find((b) => b.id == id);
    return boleto;
}

function listarBoletosIdPessoa(req) {
    const id = req.params.id;
    const boleto = listaBoletos.filter((b) => b.idPessoa == id);
    return boleto;
}

function criarBoletos(boleto) {
    if (boleto.valor <= 0) {
        return new Error("Valor não pode ser menor ou igual a zero!");
    } else if (!boleto.iduser) {
        return new Error("Id do usuário não informado!");
    } else if (!boleto.idpessoa) {
        return new Error("Id da pessoa não informado!");
    } else if (!boleto.statusboleto) {
        return new Error("Status do boleto não informado!");
    } else {
        let pessoaTemp = pessoa.listarPessoasId(boleto.idpessoa);
        if (!pessoaTemp) {
            return new Error("Pessoa não encontrada!");
        }
        let usuarioTemp = usuario.listarUsuariosId(boleto.iduser);
        if (!usuarioTemp) {
            return new Error("Usuário não encontrado!");
        }
        boleto.nomepessoa = pessoa.nome;
        boleto.id = `${listaBoletos.length + 1}`;
        listaBoletos.push(boleto);
        return boleto;
    }
}

router.get("/", (req, res) => {
    res.json(listarBoletos());
});

router.get("/:id", (req, res) => {
    res.json(listarBoletosId(req));
});

router.get("/pessoa/:id", (req, res) => {
    res.json(listarBoletosIdPessoa(req));
});

router.post("/", (req, res) => {
    const boleto = criarBoletos(req.body);
    if (boleto.constructor.name == "Error") {
        return res.status(400).send(boleto.message);
    }
    res.json(boleto);
});

router.put("/:id", (req, res) => {
    const boleto = listarBoletosId(req);
    if (!boleto) {
        return res.status(404).send("Boleto não encontrado!");
    }
    const boletoAtualizado = criarBoletos(req.body);
    if (boletoAtualizado.constructor.name == "Error") {
        return res.status(400).send(boletoAtualizado.message);
    }
    res.json(boletoAtualizado);
});

module.exports = {
    router,
};