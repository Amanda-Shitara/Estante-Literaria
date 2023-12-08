const Book = require("../model/Book");

exports.productsGet = (request, response) => {
  const produto = new Book(request.query);
  if (!(typeof request.query.id === "undefined")) {
    produto.consultarId()
      .then((result) => {
        response.send(result);
      })
      .catch((error) => {
        response.send(error);
      });
  } else {
    produto.consultar()
      .then((result) => {
        response.send(result);
      })
      .catch((error) => {
        response.send(error);
      });
  }
};
