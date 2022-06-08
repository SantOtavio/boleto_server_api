class Pessoa {
  _listaPessoas;
  _router;

  get router() {
    return this._router;
  }

  constructor(_router, _listaPessoas) {
    this._router = _router;
    this._listaPessoas = _listaPessoas;
    this._createRoutes();
  }

  _createRoutes() {
    this._router.get("/", (req, res) => {
      res.json(listarPessoas());
    });

    this._router.get("/:id", (req, res) => {
      const id = req.params.id;
      res.json(listarPessoasId(id));
    });

    this._router.post("/", (req, res) => {
      const pessoa = _cadastrarPessoas(req.body);
      if (pessoa.constructor.name == "Error") {
        return res.status(400).send(pessoa.message);
      }
      res.json(pessoa);
    });

    this._router.put("/:id", (req, res) => {
      res.json(_substituirPessoas(req));
    });

    this._router.delete("/:id", (req, res) => {
      res.json(_deletarPessoa(req));
    });
  }

  listarPessoas() {
    return this._listaPessoas;
  }

  listarPessoasId(id) {
    const pessoa = this._listaPessoas.find((p) => p.id == id);
    return pessoa;
  }

  _cadastrarPessoas(pessoa) {
    if (!pessoa.nome) {
      return new Error("Nome não informado!");
    } else if (!pessoa.cpf) {
      return new Error("CPF não informado!");
    } else if (pessoa.cpf && pessoa.nome) {
      pessoa.id = `${this._listaPessoas.length + 1}`;
      this._listaPessoas.push(pessoa);
      return pessoa;
    } else {
      return new Error("Não foi possível cadastrar!");
    }
  }

  _substituirPessoas(req) {
    const id = req.params.id;
    const pessoa = req.body;
    const index = this._listaPessoas.findIndex((p) => p.id == id);
    this._listaPessoas[index] = pessoa;
    return pessoa;
  }

  _deletarPessoa(req) {
    const id = req.params.id;
    const index = this._listaPessoas.findIndex((p) => p.id == id);
    this._listaPessoas.splice(index, 1);
    return this._listaPessoas;
  }
}

const express = require("express");
const router = express.Router();
const { listaPessoas } = require("./database");
module.exports = new Pessoa(router, listaPessoas);
