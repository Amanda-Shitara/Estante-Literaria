const BooksDAO = require("./BooksDAO");

class Book {
  #id;
  #titulo;
  #autor;
  #editora;
  #ano;
  #preco;
  #capa;

  constructor(query) {
    this.#id = query.id;
    this.#titulo = query.titulo;
    this.#autor = query.autor;
    this.#editora = query.editora;
    this.#ano = query.ano;
    this.#preco = query.preco;
    this.#capa = query.capa;
  }

  get id() {
    return this.#id;
  }

  get titulo() {
    return this.#titulo;
  }

  get autor() {
    return this.#autor;
  }

  get editora() {
    return this.#editora;
  }

  get ano() {
    return this.#ano;
  }

  get preco() {
    return this.#preco;
  }

  get capa() {
    return this.#capa;
  }

  /**
   * Método de consulta de produtos. Retorna todos os produtos armazenados.
   * @returns Promise (Produtos || erro)
   */
  consultar() {
    const promise = (resolve, reject) => {
      BooksDAO.consultar()
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    };
    return new Promise(promise);
  }

  /**
   * Método de consulta de produto especifico.
   * @returns Promise (Produtos || erro)
   */
  consultarId() {
    const promise = (resolve, reject) => {
      BooksDAO.consultarId(this.#id)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    };
    return new Promise(promise);
  }
}

module.exports = Book;
