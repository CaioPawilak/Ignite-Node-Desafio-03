const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository)

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body

  const updateIndex = repositories.findIndex(findRepo => findRepo.id == id)

  if (updateIndex < 0) {
    return response.status(404).send()
  }

  const upProject = {
    id,
    url,
    title,
    techs,
    likes: 0
  }

  repositories[updateIndex] = upProject;

  return response.json(upProject)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const excRepo = repositories.findIndex(repoToDel => repoToDel.id == id)

  if (excRepo < 0) {
    return response.status(404).json({ error: "Projeto não encontrado" })
  }

  repositories.splice(excRepo, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repo = repositories.find(findRepo => findRepo.id == id)
  if (!repo) {
    return response.status(404).json({error:"Repository not found"})
  }
  
  repo.likes += 1;


  return response.json(repo)
});

module.exports = app;
