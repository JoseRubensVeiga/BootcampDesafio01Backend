const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [
  {
    id: uuid(),
    title: "Angular Forms",
    url: "https://github.com/JoseRubensVeiga/angular_forms",
    techs: ["JavaScript", "Angular", "TypeScript"],
    likes: 10,
  },
  {
    id: uuid(),
    title: "Site Bootstrap com PHP",
    url: "https://github.com/JoseRubensVeiga/site_bootstrap",
    techs: ["JavaScript", "HTML", "CSS", "Bootstrap", "PHP"],
    likes: 12,
  },
];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  if (!url) {
    return response.status(400).json({
      error: "You must to provide a url",
    });
  }

  if (!title) {
    return response.status(400).json({
      error: "You must to provide a title",
    });
  }

  const newRepository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0,
  };

  repositories.push(newRepository);

  return response.status(200).json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repositoryIndex = repositories.findIndex((r) => r.id == id);

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: "There is no repository with this id.",
    });
  }

  const repository = repositories[repositoryIndex];

  if (url) {
    repository.url = url;
  }

  if (title) {
    repository.title = title;
  }

  if (techs) {
    repository.techs = techs;
  }

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((r) => r.id == id);

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: "There is no repository with this id.",
    });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json({
    message: "Repository deleted successfully!",
  });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((r) => r.id == id);

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: "There is no repository with this id.",
    });
  }

  const repository = repositories[repositoryIndex];

  repository.likes += 1;

  return response.status(200).json({
    likes: repository.likes,
  });
});

module.exports = app;
