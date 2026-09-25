import express from 'express';

const app = express();
const porta = 3000;

const tarefas = [
    { id: 1, nome: "lavar louças" },
    { id: 2, nome: "comprar uma RTX 5090" }
];

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/tarefas', (req, res) => {
    res.status(200).json(tarefas);
});

app.post('/tarefa', (req, res) => {
    const novaTarefa = req.body;

    if (!novaTarefa.nome) {
        return res.status(400).json({
            error: "O campo 'nome' é obrigatório."
        });
    }

    const tarefaCriada = {
        id: tarefas.length + 1,
        nome: novaTarefa.nome
    };

    tarefas.push(tarefaCriada);

    res.status(201).json(tarefaCriada);
});

app.get('/tarefas/busca', (req, res) => {
    const titulo = req.query.titulo;

    if (!titulo) {
        return res.status(400).json({
            error: "Informe o título para realizar a busca."
        });
    }

    const tarefasFiltradas = tarefas.filter((tarefa) =>
        tarefa.nome.toLowerCase().includes(titulo.toLowerCase())
    );

    res.status(200).json(tarefasFiltradas);
});

app.use((req, res) => {
    res.status(404).json({
        error: "Rota não encontrada"
    });
});

app.listen(porta, () => {
    console.log(`Servidor funcionando na porta ${porta}`);
});