class Usuarios {
  _listaUsuarios;
  _router;

  get router() {
    return this._router;
  }

  constructor(_router, _listaUsuarios) {
    this._router = _router;
    this._listaUsuarios = _listaUsuarios;
    this._createRoutes();
  }

  _createRoutes() {
    this.router.get("/", (req, res) => {
      res.json(listaUsuarios());
    });

    this.router.get("/:id", (req, res) => {
      const id = req.params.id;
      res.json(listarUsuariosId(id));
    });

    this.router.post("/", (req, res) => {
      const usuario = cadastrarUsuario(req.body);
      if (usuario.constructor.name == "Error") {
        return res.status(400).send(usuario.message);
      }
      res.json(usuario);
    });

    this.router.put("/:id", (req, res) => {
      res.json(substituirUsuarios(req));
    });

    this.router.delete("/:id", (req, res) => {
      res.json(deletarUsuario(req));
    });
  }

  listarUsuarios() {
    return this._listaUsuarios;
  }

  listarUsuariosId(id) {
    return this._listaUsuarios.find((p) => p.id == id);
  }

  _cadastrarUsuario(usuario) {
    if (!usuario.nome) {
      return new Error("Nome não informado!");
    } else if (!usuario.senha) {
      return new Error("Senha não informada!");
    } else if (usuario.senha && usuario.nome) {
      usuario.id = `${this._listaUsuarios.length + 1}`;
      this._listaUsuarios.push(usuario);
      return usuario;
    } else {
      return new Error("Não foi possível cadastrar!");
    }
  }

  _substituirUsuarios(req) {
    const id = req.params.id;
    const usuario = req.body;
    const index = this._listaUsuarios.findIndex((p) => p.id == id);
    this._listaUsuarios[index] = pessoa;
    return usuario;
  }

  _deletarUsuario(req) {
    const id = req.params.id;
    const index = this._listaUsuarios.findIndex((p) => p.id == id);
    this._listaUsuarios.splice(index, 1);
    return this._listaUsuarios;
  }
}

const express = require("express");
const router = express.Router();
const { listaUsuarios } = require("./database");

module.exports = new Usuarios(router, listaUsuarios);
