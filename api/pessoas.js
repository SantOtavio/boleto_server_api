const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

let listaPessoas = [];

function listarPessoas() {
  return listaPessoas;
}

function listarPessoasId(req) {
  const id = req.params.id;
  const pessoa = listaPessoas.find((p) => p.id == id);
  return pessoa;
}

function cadastrarPessoas(pessoa) {
  if (!pessoa.nome) {
    return new Error("Nome não informado!");
  } else if (!pessoa.cpf) {
    return new Error("CPF não informado!");
  } else if (pessoa.cpf && pessoa.nome) {
    pessoa.id = `${listaPessoas.length + 1}`;
    listaPessoas.push(pessoa);
    return pessoa;
  } else {
    return new Error("Não foi possível cadastrar!");
  }
}

function substituirPessoas(req) {
  const id = req.params.id;
  const pessoa = req.body;
  const index = listaPessoas.findIndex((p) => p.id == id);
  listaPessoas[index] = pessoa;
  return pessoa;
}

function deletarPessoa(req) {
  const id = req.params.id;
  const index = listaPessoas.findIndex((p) => p.id == id);
  listaPessoas.splice(index, 1);
  return listaPessoas;
}

router.get("/", (req, res) => {
  res.json(listarPessoas());
});

router.get("/:id", (req, res) => {
  res.json(listarPessoasId(req));
});

router.post("/", (req, res) => {
  const pessoa = cadastrarPessoas(req.body);
  if (pessoa.constructor.name == "Error") {
    return res.status(400).send(pessoa.message);
  }
  res.json(pessoa);
});

router.put("/:id", (req, res) => {
  res.json(substituirPessoas(req));
});

router.delete("/:id", (req, res) => {
  res.json(deletarPessoa(req));
});

module.exports = { router };
