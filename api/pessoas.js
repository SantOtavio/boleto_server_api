const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

//res.status(400).send("conteudo")

let listaPessoas = [];

function listarPessoas() {
  return listaPessoas;
}

function listarPessoasId(req) {
  const id = req.params.id;
  const pessoa = listaPessoas.find((p) => p.id == id);
  return pessoa;
}

function cadastrarPessoas(req) {
  const pessoa = req.body;
  if (!pessoa.nome || !pessoa.cpf) {
    return 1;
  } else {
    pessoa.id = `${listaPessoas.length + 1}`;
    listaPessoas.push(pessoa);
    return pessoa;
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
  const pessoa = req.body;
  if (!pessoa.nome || !pessoa.cpf) {
    res.status(400).send("Cpf ou Nome não inseridos!")
  } else {
    pessoa.id = `${listaPessoas.length + 1}`;
    listaPessoas.push(pessoa);
    res.json(pessoa);
  }
});

router.put("/:id", (req, res) => {
  res.json(substituirPessoas(req));
});

router.delete("/:id", (req, res) => {
  res.json(deletarPessoa(req));
});

module.exports = { router };
