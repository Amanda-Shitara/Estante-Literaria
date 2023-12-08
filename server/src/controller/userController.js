const User = require("../model/User");

/**
 * Método para resposta de requisições "post" realizadas na rota /usuario
 * Invoca o método de autenticação da classe User.
 * É utilizado para autenticar o cadastro do usuário antes de alguma alteração.
 * Finaliza o encadeamento de promises e retorna uma resposta de sucesso ou falha.
 */
exports.userPost = (request, response) => {
  const usuario = new User(request.body);
  usuario.autenticar()
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      response.send(error);
    });
};

/**
 * Método para resposta de requisições "put" realizadas na rota /usuario
 * Invoca o método de atualização da classe User.
 * Finaliza o encadeamento de promises e retorna uma resposta de sucesso ou falha.
 */
exports.userPut = (request, response) => {
  const usuario = new User(request.body);
  usuario.atualizar()
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      response.send(error);
    });
};

/**
 * Método para resposta de requisições "delete" realizadas na rota /usuario
 * Invoca o método de remoção da classe User.
 * Finaliza o encadeamento de promises e retorna uma resposta de sucesso ou falha.
 */
exports.userDelete = (request, response) => {
  const usuario = new User(request.body);
  usuario.remover()
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      response.send(error);
    });
};
