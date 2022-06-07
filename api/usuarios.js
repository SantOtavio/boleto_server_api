const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

let listaUsuarios = [];

function listarUsuarios() {
    return listaUsuarios;
}

function listarUsuariosId(id) {
    const usuario = listaUsuarios.find((p) => p.id == id);
    return usuario;
}

function cadastrarUsuario(usuario) {
    if (!usuario.nome) {
        return new Error("Nome não informado!");
    } else if (!usuario.senha) {
        return new Error("Senha não informada!");
    } else if (usuario.senha && usuario.nome) {
        usuario.id = `${listaUsuarios.length + 1}`;
        listaUsuarios.push(usuario);
        return usuario;
    } else {
        return new Error("Não foi possível cadastrar!");
    }
}

function substituirUsuarios(req) {
    const id = req.params.id;
    const usuario = req.body;
    const index = listaUsuarios.findIndex((p) => p.id == id);
    listaUsuarios[index] = pessoa;
    return usuario;
}

function deletarUsuario(req) {
    const id = req.params.id;
    const index = listaUsuarios.findIndex((p) => p.id == id);
    listaUsuarios.splice(index, 1);
    return listaUsuarios;
}

router.get("/", (req, res) => {
    res.json(listaUsuarios());
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.json(listarUsuariosId(id));
});

router.post("/", (req, res) => {
    const usuario = cadastrarUsuario(req.body);
    if (usuario.constructor.name == "Error") {
        return res.status(400).send(usuario.message);
    }
    res.json(usuario);
});

router.put("/:id", (req, res) => {
    res.json(substituirUsuarios(req));
});

router.delete("/:id", (req, res) => {
    res.json(deletarUsuario(req));
});

module.exports = { router };