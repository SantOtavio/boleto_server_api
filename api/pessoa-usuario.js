const { listaPessoas, listaUsuarios, listaBoletos } = require("./database");

function listarPessoaId(id) {
  return listaPessoas.find((p) => p.id == id);
}

function listarUsuariosId(id) {
  return listaUsuarios.find((p) => p.id == id);
}

function listarBoletosIdPessoa(id) {
  return listaBoletos.filter((b) => b.idPessoa == id);
}

module.exports = { listarPessoaId, listarUsuariosId, listarBoletosIdPessoa };
