const { listaPessoas, listaUsuarios } = require("./database");

function listarPessoaId(id) {
  return listaPessoas.find((p) => p.id == id);
}

function listarUsuariosId(id) {
  return listaUsuarios.find((p) => p.id == id);
}

module.exports = { listarPessoaId, listarUsuariosId };
