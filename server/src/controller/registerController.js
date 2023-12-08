const User = require("../model/User");

/**
 * Método para resposta de requisições "post" realizadas na rota /cadastro
 * Invoca o método de cadastro da classe User.
 * Finaliza o encadeamento de promises e retorna uma resposta de sucesso ou falha.
 */
exports.registerPost = (request, response) => {
  const usuario = new User(request.body);
  usuario.cadastrar()
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      response.send(error);
    });
};
