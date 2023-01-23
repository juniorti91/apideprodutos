const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser')

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//


const alunos = require("./src/alunos/alunos.json")

// retornar todos os alunos
app.get("/alunos", (req, res) => {
    res.json(alunos)
})

// retornar um aluno por id
app.get("/alunos/:index", (req, res) => {
    let aluno = alunos.find(a => a.id === req.params.index);
    if (!aluno) {
        res.status(404).json({ message: "Aluno não encontrado" });
    } else {
        res.json(aluno);
    }
})

// cadastrando um aluno
app.post('/alunos', (req, res) => {
    let newAlunos = {
        id: alunos.length + 1,
        nome: req.body.nome,
        email: req.body.email
    }

    alunos.push(newAlunos);
    return res.json(alunos)
})

// atualizar um aluno
app.put('/alunos/:index', (req, res) => {
    let aluno = alunos.find(a => a.id === req.params.index);
    if (!aluno) {
        res.status(404).json({ message: "Aluno não encontrado" });
    } else {
        aluno.nome = req.body.nome;
        aluno.email = req.body.email;
        res.json(aluno);
    }
})

// deletar um aluno
app.delete('/alunos/:index', (req, res) => {
    let alunoIndex = alunos.findIndex(a => a.id === req.params.index);
    if (alunoIndex == -1) {
        res.status(404).json({ message: "Aluno não encontrado" });
    } else {
        let deletarAluno = alunos.splice(alunoIndex, 1);
        res.json(deletarAluno);
    }
})

// conexão com o servidor
app.listen(port, () => {
    console.log('Servidor está rodando...');
})