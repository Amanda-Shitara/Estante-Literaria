const fs = require("fs");

//Classe de acesso aos dados. Pelo fato de ser uma classe, para processamento assíncrono, seus métodos
//retornam promises, as quais são consumidas por outras funções (locais ou de outros módulos)
//que também retornam outras promises. Esse encadeamento acontece até a resposta ser enviada.
class UsersDAO {
  //Diretório do arquivo de dados de usuários (é utilizado um arquivo.json para armazenamento)
  static #dir = __dirname + "/users.json";
  //encoding utf-8 para escrever em pt-br
  static #encoding = "utf-8";

  /**
   * Método de carregamento do arquivo de dados de usuários.
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
   * Método de salvamento do arquivo de dados de usuários.
   * É invocado em todo método que exige modificações no arquivo.
   * @returns Promise (true || erro)
   */
  static save(content) {
    const promise = (resolve, reject) => {
      fs.writeFile(
        this.#dir,
        JSON.stringify(content, null, 4),
        this.#encoding,
        (error) => {
          if (error) {
            const erro = JSON.stringify(error);
            reject(erro);
            return;
          }
          resolve(true);
        }
      );
    };
    return new Promise(promise);
  }

  /**
   * Método para autenticação. Veririfica se o usuário existe e compara a senha recebida com a senha armazenada.
   * Utiliza o método de carregamento de arquivo, consumindo sua promise e
   * gerando uma nova promise como resposta.
   * @param {*} username
   * @param {*} password
   * @returns Promise (username, email || erro)
   */
  static autenticar(username, password) {
    const promise = (resolve, reject) => {
      UsersDAO.load()
        .then((dados) => {
          if (
            dados.hasOwnProperty(username) &&
            dados[username][1] == password
          ) {
            const email = dados[username][0];
            resolve({ username, email });
          } else {
            const resposta = JSON.stringify(
              "Erro! Verifique suas credenciais..."
            );
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

  /**
   * Método para cadastro. Armazena os dados recebidos no arquivo de usuários.
   * Utiliza o método de carregamento e salvamento de arquivos, consumindo suas promises,
   * gerando uma nova promise como resposta.
   * @param {*} username
   * @param {*} email
   * @param {*} password
   * @returns Promise (sucesso || erro)
   */
  static cadastrar(username, email, password) {
    const promise = (resolve, reject) => {
      UsersDAO.load()
        .then((dados) => {
          const jsonLength = Object.keys(dados).length;

          for (let i = 0; i < jsonLength; i++) {
            if (email == Object.values(dados)[i][0]) {
              const resposta = JSON.stringify("Erro! Email já cadastrado.");
              reject(resposta);
              return;
            }
          }
          if (dados.hasOwnProperty(username)) {
            const resposta = JSON.stringify("Erro! Usuário já cadastrado.");
            reject(resposta);
            return;
          } else {
            dados[username] = [email, password];
            UsersDAO.save(dados)
              .then(() => {
                const resposta = JSON.stringify(
                  "Usuário cadastrado com sucesso!"
                );
                resolve(resposta);
              })
              .catch((error) => {
                const resposta = JSON.stringify(
                  "Não foi possível salvar os dados: " + error
                );
                reject(resposta);
                return;
              });
          }
        })
        .catch((error) => {
          reject(error);
          return;
        });
    };
    return new Promise(promise);
  }

  /**
   * Método para atualização. Modifica no arquivo de usuários os dados do usuário recebido.
   * Utiliza o método de carregamento e salvamento de arquivos, consumindo suas promises,
   * gerando uma nova promise como resposta.
   * @param {*} username
   * @param {*} email
   * @param {*} password
   * @returns Promise (sucesso || erro)
   */
  static atualizar(username, email, password) {
    const promise = (resolve, reject) => {
      UsersDAO.load()
        .then((dados) => {
          if (dados.hasOwnProperty(username)) {
            dados[username] = [email, password];
            UsersDAO.save(dados)
              .then(() => {
                const resposta = JSON.stringify(
                  "Usuário atualizado com sucesso!"
                );
                resolve(resposta);
              })
              .catch((error) => {
                const resposta = JSON.stringify(
                  "Não foi possível salvar os dados: " + error
                );
                reject(resposta);
                return;
              });
          } else {
            const resposta = JSON.stringify("Erro! Usuário não existente");
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

  //Método de remoção de usuário.
  //Utiliza os métodos de carregamento e salvamendo de dados, consumindo suas promises e
  //gerando uma nova promise como resposta.
  /**
   * Método de remoção de usuário. Remove do arquivo de usuários o usuário recebido.
   * Utiliza os métodos de carregamento e salvamendo de dados, consumindo suas promises e
   * gerando uma nova promise como resposta.
   * @param {*} username
   * @returns
   */
  static remover(username) {
    const promise = (resolve, reject) => {
      UsersDAO.load()
        .then((dados) => {
          if (dados.hasOwnProperty(username)) {
            delete dados[username];
            UsersDAO.save(dados)
              .then(() => {
                const resposta = JSON.stringify(
                  "Usuário removido com sucesso!"
                );
                resolve(resposta);
              })
              .catch((error) => {
                const resposta = JSON.stringify(
                  "Não foi possível salvar os dados: " + error
                );
                reject(resposta);
                return;
              });
          } else {
            const resposta = JSON.stringify(
              "Erro! Não foi possível remover o usuário."
            );
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

module.exports = UsersDAO;
