const express = require("express");
const app = express();
const routes = require("./routes");

const PORT = process.env.PORT || 3001;

// Adicionar os cabeçalhos Access-Control-Allow-Origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(express.urlencoded({extended: true}));
app.use(routes);
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`);
});
