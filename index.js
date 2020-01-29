const express = require('express');

const server = express();

server.use(express.json());


const arrProjects = [];

// POST /projects: A rota deve receber id e title dentro do corpo e cadastrar um novo projeto dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] }; Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com aspas duplas.

// GET /projects: Rota que lista todos projetos e suas tarefas;

// PUT /projects/:id: A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;

// DELETE /projects/:id: A rota deve deletar o projeto com o id presente nos parâmetros da rota;

// POST /projects/:id/tasks: A rota deve receber um campo title e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;



server.post('/projects', (req, res) => {
    arrProjects.push(req.body);
    res.json({message: 'success'});
});

server.get('/projects', (req, res) => {
    res.json(arrProjects);
});

server.put('/projects/:id', (req, res) => {
    const project = arrProjects.filter((ele, index) => {
        if(ele.id === req.params.id){
            return ele.title = req.body.title;
        }
    });

    res.json({retorno: project});
});

server.listen(3000);
