class Boletos {
  _listaBoletos;
  _router;
  pessoa_usuario;

  get router() {
    return this._router;
  }

  constructor(_router, _listaBoletos, pessoa_usuario) {
    this._router = _router;
    this._listaBoletos = _listaBoletos;
    this.pessoa_usuario = pessoa_usuario;
    this._createRoutes();
  }

  _createRoutes() {
    this.router.get("/", (req , res) => {
      res.json(this._listarBoletos());
    });

    this.router.get("/:id", (req, res) => {
      res.json(this._listarBoletosId(req));
    });

    this.router.get("/pessoa/:id", (req, res) => {
      const id = req.params.id;
      res.json(this.pessoa_usuario.listarBoletosIdPessoa(id));
    });

    this.router.post("/", (req, res) => {
      const boleto = this._criarBoletos(req.body);
      if (boleto.constructor.name == "Error") {
        return res.status(400).send(boleto.message);
      }
      res.json(boleto);
    });

    this.router.put("/:id", (req, res) => {
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
  }

  _listarBoletos() {
    return listaBoletos;
  }

  _listarBoletosId(req) {
    const id = req.params.id;
    const boleto = listaBoletos.find((b) => b.id == id);
    return boleto;
  }

  _criarBoletos(boleto) {
    if (boleto.valor <= 0) {
      return new Error("Valor não pode ser menor ou igual a zero!");
    } else if (!boleto.iduser) {
      return new Error("Id do usuário não informado!");
    } else if (!boleto.idpessoa) {
      return new Error("Id da pessoa não informado!");
    } else if (!boleto.statusboleto) {
      return new Error("Status do boleto não informado!");
    } else {
      let pessoaTemp = this.pessoa_usuario.listarPessoaId(boleto.idpessoa);
      if (!pessoaTemp) {
        return new Error("Pessoa não encontrada!");
      }
      let usuarioTemp = this.pessoa_usuario.listarUsuariosId(boleto.iduser);
      if (!usuarioTemp) {
        return new Error("Usuário não encontrado!");
      }
      boleto.nomepessoa = pessoaTemp.nome;
      boleto.id = `${listaBoletos.length + 1}`;
      listaBoletos.push(boleto);
      return boleto;
    }
  }
}
const express = require("express");
const router = express.Router();
const { listaBoletos } = require("./database");
const pessoa_usuario = require("./pessoa-usuario");

module.exports = new Boletos(router, listaBoletos, pessoa_usuario);
