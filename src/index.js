const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const { response } = require('express');

const app = express();

app.use(express.json());

/*metodos http
GET - buscar informação do back-end
POST - criar uma informaçao
PUT/PATCH - alterar uma informação
DELETE - para deletar uma informação
*/

/*
query params - filtros e paginação
route params - identificar recursos na hora de atualizar ou deletar
request body - conteudo na hora de criar /editar um recurso (json)
*/

/*
middleware - interceptador de requisicoes: 
  - ele pode interromper ou alterar dados de uma requisicao
- usa qdo a gente quer que um trecho de codigo seja disparado
*/


const projects = [];  //porque nao temos o banco de daoos

function logRequests(request, response, next) {
    const { method, url} = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    //console.log(logLabel);
    console.log('1');
    console.timeEnd(logLabel);

    next(); //proximo middleware

    console.log('2');
    console.timeEnd(logLabel);

}

function validateProjectsId(request, reponse, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalis project id'})
    }
    return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectsId);

app.get('/projects', (request, response) => {
    console.log('3');
    const { title } = request.query;

    const results = title
        ? projects.filter(project == project.title.includes(title))
        : projects;

    return response.json(results);

});

app.post('/projects', (request, response) => {
    const { title, owner} = request.body;
    console.log(title);
    console.log(owner);

    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, esponse) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex( project => project.id == id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.'})
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(projects);
});

app.delete('/projects/:id', (request, response) => { 
    const { id } = request.params; 
    
    const projectIndex = projects.findIndex( project => project.id == id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.'})
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

/*
app.get('/', (request, response) => {
    return response.json({ message: 'hello world novo 2' });
});
*/

//ouvir uma porta
app.listen(3333, ()=> {
    console.log('Back-end started');
});

