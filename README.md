# 📚 Estante Literária

Projeto desenvolvido na disciplina de Desenvolvimento Web 2 (DW2A4), do curso de Análise e Desenvolvimento de Sistemas, com o propósito de aplicar e demonstrar os conhecimentos adquiridos durante o semestre.

## Índice

* [Sobre o Projeto](#sobre-o-projeto)
    - [Principais Funcionalidades](#principais-funcionalidades)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
    - [Front-end](#front-end)
    - [Back-end](#back-end)
    - [Banco de Dados](#banco-de-dados)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Como Instalar](#como-instalar)
* [Screenshots](#screenshots)
* [Licença](#licença)

## Sobre o Projeto

A plataforma desenvolvida tem como objetivo simular o funcionamento de um e-commerce, mais especificamente um site de vendas de livros.

#### Principais Funcionalidades

- Cadastro e login de usuários
- Edição de dados no perfil do usuário
- Catálogo de livros
- Filtros de pesquisa
- Carrinho de compras
- Design responsivo

## Tecnologias Utilizadas
####  Front-end 

- **React JS** - Biblioteca JavaScript usada para construir interfaces de usuário, especificamente para aplicações de página única (SPA).
- **React Redux** - Permite a criação de um estado global para toda a aplicação, que pode ser acessado por qualquer um de seus componentes, simplificando o fluxo de dados e facilitando o compartilhamento de estados entre componentes.
- **React Router Dom** - Possibilita o roteamento das páginas, ou seja, a navegação entre diferentes componentes React.
- **Tailwind CSS** - Framework CSS com classes predefinidas que simplificam o processo de estilização.

####  Back-end 

- **Node JS** - Um ambiente de execução JavaScript para auxiliar na construção rápida de aplicações server-side.
- **Express JS** - Framework para Node.js que simplifica a criação de um servidor web, o qual faz o tratamento e o roteamento de requisições HTTP.
- **Nodemon** - Ferramenta que monitora as alterações nos arquivos do projeto e reinicia automaticamente o servidor Node.js quando necessário.

####  Banco de Dados 

- **JSON** - Formato de dados leve e fácil de ler, frequentemente utilizado como armazenamento temporário ou para configurações simples em projetos.

## Estrutura do Projeto
O projeto está dividido em **_duas_** seções:

- Front-end (`client/`)
- Back-end (`server/`)

```bash
.
├── README.md
├── assets
├── client
│   ├── package.json
│   ├── public
│   │   └── index.html
│   └── src
│       ├── App.js
│       ├── index.css
│       ├── index.js
│       ├── store.js
│       ├── components
│       │   ├── BookCard.js
│       │   ├── BookList.js
│       │   ├── NavBar.js
│       │   ├── SignIn.js
│       │   └── SignUp.js
│       └── router
│           ├── About.js
│           ├── Auth.js
│           ├── BookInfo.js
│           ├── Home.js
│           ├── PageNotFound.js
│           ├── Profile.js
│           ├── Search.js
│           └── ShoppingCart.js
└── server
    ├── index.js
    ├── package.json
    ├── routes.js
    └── src
        ├── controller
        │   ├── loginController.js
        │   ├── productsController.js
        │   ├── registerController.js
        │   └── userController.js
        └── model
            ├── Book.js
            ├── books.json
            ├── BooksDAO.js
            ├── User.js
            ├── users.json
            └── UsersDAO.js
```

## Como Instalar
Para instalar este projeto localmente, basta clonar o repositório ou fazer o download do arquivo zip e descompactá-lo na sua máquina.
```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/meu-projeto-incrivel.git
```
Feito isso, siga os seguintes passos:
- Abra o projeto no editor de código de sua preferência (no caso, será utilizado o VS Code);
- Vá para Terminal -> New Terminal;
- Divida seu terminal em dois;
- Baixe as dependências utilizadas executando o comando `npm install`.

No primeiro terminal (front-end):
```bash
# Instalar as dependências
$ cd client
$ npm install
```
No segundo terminal (back-end):
```bash
# Instalar as dependências
$ cd server
$ npm install
```
Em seguida, para iniciar as aplicações, digite o script `npm start` em ambos os terminais.
![Terminal](https://github.com/Amanda-Shitara/Estante-Literaria/blob/main/assets/Terminal.PNG)

Por fim, carregue `http://localhost:3000` em seu navegador para visualizar o site.

## Screenshots
![Home](https://github.com/Amanda-Shitara/Estante-Literaria/blob/main/assets/Screenshot_Home.PNG)
![About](https://github.com/Amanda-Shitara/Estante-Literaria/blob/main/assets/Screenshot_About.PNG)
![BookSearch](https://github.com/Amanda-Shitara/Estante-Literaria/blob/main/assets/Screenshot_BookSearch.PNG)
![BookDetails](https://github.com/Amanda-Shitara/Estante-Literaria/blob/main/assets/Screenshot_BookDetails.PNG)
![Cart](https://github.com/Amanda-Shitara/Estante-Literaria/blob/main/assets/Screenshot_Cart.PNG)
![AuthLogin](https://github.com/Amanda-Shitara/Estante-Literaria/blob/main/assets/Screenshot_AuthLogin.PNG)
![AuthRegister](https://github.com/Amanda-Shitara/Estante-Literaria/blob/main/assets/Screenshot_AuthRegister.PNG)
![Profile](https://github.com/Amanda-Shitara/Estante-Literaria/blob/main/assets/Screenshot_Profile.PNG)
![404](https://github.com/Amanda-Shitara/Estante-Literaria/blob/main/assets/Screenshot_404.PNG)

## Licença
Este projeto está licenciado sob a MIT License - veja o arquivo `LICENSE` para mais detalhes.
