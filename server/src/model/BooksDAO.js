const fs = require("fs");

class BooksDAO {
  //Diretório do arquivo de dados de produtos (é utilizado um arquivo.json para armazenamento)
  static #dir = __dirname + "/books.json";
  //encoding utf-8 para escrever em pt-br
  static #encoding = "utf-8";

  /**
   * Método de carregamento do arquivo de dados de produtos.
   * É invocado em todo método que exige manipulação do arquivo.
   * @returns Promise (dados || erro)
   */
  static load() {
    const promise = (resolve, reject) => {
      fs.readFile(this.#dir, this.#encoding, (error, data) => {
        if (error) {
          const erro = JSON.stringify(error);
          reject(erro);
          return;
        }
        try {
          const dados = JSON.parse(data);
          resolve(dados);
        } catch (e) {
          const erroParse = JSON.stringify(e);
          reject(erroParse);
          return;
        }
      });
    };
    return new Promise(promise);
  }

  /**
   * Método para consulta de produtos. Retorna seus dados em forma de promise.
   * @returns Promise (Produtos || erro)
   */
  static consultar() {
    const promise = (resolve, reject) => {
      BooksDAO.load()
        .then((dados) => {
          resolve(dados);
        })
        .catch((error) => {
          reject(error);
          return;
        });
    };
    return new Promise(promise);
  }

  /**
   * Método para consulta de produto por ID. Retorna seus dados em forma de promise.
   * @returns Promise (Produtos || erro)
   */
  static consultarId(id) {
    const promise = (resolve, reject) => {
      BooksDAO.load()
        .then((dados) => {
          if (dados.hasOwnProperty(id)) {
            resolve(dados[id]);
          } else {
            const resposta = JSON.stringify("Erro! Produto não encontrado...");
            reject(resposta);
            return;
          }
        })
        .catch((error) => {
          reject(error);
          return;
        });
    };
    return new Promise(promise);
  }
}

module.exports = BooksDAO;
