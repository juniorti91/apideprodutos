const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const alunos = require("./src/alunos/alunos.json")

// retornar todos os alunos
app.get("/alunos", (req, res) => {
    return res.json(alunos)
})

// retornar um aluno
app.get("/alunos/:index", (req, res) => {
    const { index } = req.params;
    return res.json(alunos[index]);
})

// cadastrando um aluno
app.post('/alunos', (req, res) => {
    const { nome } = req.body;
    alunos.push({ nome })

    return res.json(alunos)
})

// atualizar um aluno
app.put('/alunos/:index', (req, res) => {
    const { index } = req.params;
    const { nome, email } = req.body;

    alunos[index] = (nome);

    return res.json(alunos);
})

// deletar um aluno
app.delete('/alunos/:index', (req, res) => {
    const { index } = req.params;

    alunos.splice(index, 1);
    return res.json({ message: "O alunos foi deletado com sucesso!" })
})


app.listen(port, () => {
    console.log('Servidor está rodando...');
})