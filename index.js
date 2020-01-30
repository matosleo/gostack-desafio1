const express = require('express');

const server = express();

server.use(express.json());


const arrProjects = [];
let countRequests = 0;

//ROTAS

// POST /projects: A rota deve receber id e title dentro do corpo e cadastrar um novo projeto dentro de um array no seguinte formato: { id: "1", title: 'Novo projeto', tasks: [] }; Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com aspas duplas.

// GET /projects: Rota que lista todos projetos e suas tarefas;

// PUT /projects/:id: A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;

// DELETE /projects/:id: A rota deve deletar o projeto com o id presente nos parâmetros da rota;

// POST /projects/:id/tasks: A rota deve receber um campo title e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do id presente nos parâmetros da rota;


// Middlewares

// Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto nos parâmetros da URL que verifica se o projeto com aquele ID existe. Se não existir retorne um erro, caso contrário permita a requisição continuar normalmente;

// Crie um middleware global chamado em todas requisições que imprime (console.log) uma contagem de quantas requisições foram feitas na aplicação até então;

function checkProjectExists(req, res, next) {
    const projectIndex = arrProjects.findIndex(elem => elem.id === req.params.id);
    if(projectIndex < 0){
        return res.status(400).json({error: 'Project does not exists'});    
    }
    
    req.project = {...arrProjects[projectIndex]};
    req.projectIndex = projectIndex;

    return next();
}

server.use((req, res, next) => {
    countRequests++;
    console.log(`${countRequests} requests`);
    return next();
});


server.post('/projects', (req, res) => {
    arrProjects.push(req.body);
    return res.json({message: 'success'});
});

server.get('/projects', (req, res) => res.json(arrProjects));

server.put('/projects/:id', checkProjectExists, (req, res) => {
    req.project.title = req.body.title;
    
    arrProjects[req.projectIndex] = req.project;
    return res.json({message: 'Altered with success'});
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
    arrProjects.splice(req.projectIndex, 1);
    return res.json();
});

server.post('/projects/:id/task', checkProjectExists, (req, res) => {
    req.project.tasks.push(req.body.title);

    arrProjects[req.projectIndex] = req.project;
    return res.json({message: 'Task added'});
});

server.listen(3000);
