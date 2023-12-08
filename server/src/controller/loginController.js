const User = require("../model/User");

/**
 * Método para resposta de requisições "post" realizadas na rota /login
 * Invoca o método de autenticação da classe User.
 * Finaliza o encadeamento de promises e retorna uma resposta de sucesso ou falha.
 */
exports.loginPost = (request, response) => {
  const usuario = new User(request.body);
  usuario.autenticar()
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      response.send(error);
    });
};
