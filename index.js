const express = require(`express`);
const app = express();
const port = 3000;
const pessoas = require("./api/pessoas");
const usuarios = require("./api/usuarios");
const boletos = require("./api/boletos");

app.use(express.json());
app.use("/api/pessoas", pessoas.router)
app.use("/api/usuarios", usuarios.router)
app.use("/api/boletos", boletos.router)
app.get("/", (req, res) => {
    res.send("Pagina Inicial")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});