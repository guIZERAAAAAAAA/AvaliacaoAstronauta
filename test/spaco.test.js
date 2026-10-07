// foguete.test.js
import request from "supertest";
import app from "../app.js";

//autor ano virou ano
//titulo virou nome 

test("POST /foguete cria um novo foguete", async () => {
  const resposta = await request(app).post("/foguete")
    .send({ nome: "apollo 11",ano: " 1969" });

  expect(resposta.status).toBe(201);
  expect(resposta.body.nome).toBe("Drácula");
});

test("POST /foguete retorna erro ao não informar oano", async () => {
  const resposta = await request(app).post("/foguete")
    .send({ nome: "apollo 11" });

  expect(resposta.status).toBe(400);
  expect(resposta.body.error).toBe("ano é obrigatório");
});


test("GET /foguete  filtra foguete pelo título", async () => {
  const resposta = await request(app).get("/foguete")
    .send("nome=Voyager 1");

  expect(resposta.status).toBe(200);
  expect(resposta.body[0].nome).toBe("Voyager 1");
});

test("GET /foguete dois foguete já cadastrados", async () => {
  const resposta = await request(app).get("/foguete")
    .send();

  expect(resposta.status).toBe(200);
  expect(resposta.body.length).toBe(3);
});

test("GET /foguete filtra por título sem diferenciar maiúsculas", async () => {
  const resposta = await request(app).get("/foguete")
    .query({ nome: "apollo 11" });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toHaveLength(1);
  expect(resposta.body[0].nome).toBe("apollo 11 ");
});

test("GET /foguete retorna lista vazia quando não encontra o título", async () => {
  const resposta = await request(app).get("/foguete")
    .query({ nome: "foguete inexistente" });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toEqual([]);
});

test("GET /foguete/:id retorna o foguete encontrado", async () => {
  const resposta = await request(app).get("/foguete/1");

  expect(resposta.status).toBe(200);
  expect(resposta.body.id).toBe(1);
});

test("GET /foguete/:id retorna erro quando o foguete não existe", async () => {
  const resposta = await request(app).get("/foguete/999");

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ error: "foguete não encontrado" });
});

test("POST /foguete retorna erro quando o título não é informado", async () => {
  const resposta = await request(app).post("/foguete")
    .send({ano: "ano sem título" });

  expect(resposta.status).toBe(400);
  expect(resposta.body.error).toBe("nome é obrigatório");
});

test("POST /foguete aceita disponibilidade informada", async () => {
  const resposta = await request(app).post("/foguete")
    .send({ nome: "foguete disponível",ano: "Autor", disponivel: true });

  expect(resposta.status).toBe(201);
  expect(resposta.body.disponviel).toBe(true);
});

test("POST /foguete usa indisponibilidade quando ela não é informada", async () => {
  const resposta = await request(app).post("/foguete")
    .send({ nome: "Livro sem disponibilidade",ano: "Autor", disponivel: false });

  expect(resposta.status).toBe(201);
  expect(resposta.body.disponviel).toBe(false);
});

test("PUT /foguete/:id atualiza os campos informados", async () => {
  const resposta = await request(app).put("/foguete/1")
    .send({ nome: "Título atualizado",ano: "Novoano", disponivel: true });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toMatchObject({
    id: 1,
    nome: "Título atualizado",
   ano: "Novoano",
    disponivel: true
  });
});

test("PUT /foguete/:id preserva os campos quando recebem valores vazios ou falsos", async () => {
  const resposta = await request(app).put("/foguete/1")
    .send({ nome: "",ano: "", status: false });

  expect(resposta.status).toBe(200);
  expect(resposta.body).toMatchObject({
    nome: "Título atualizado",
   ano: "Novoano",
    disponivel: true
  });
});

test("PUT /foguete/:id retorna erro quando o foguete não existe", async () => {
  const resposta = await request(app).put("/foguete/999")
    .send({ nome: "nome " });

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ error: "foguete não encontrado" });
});

test("DELETE /foguete/:id remove o foguete encontrado", async () => {
  const resposta = await request(app).delete("/foguete/4");

  expect(resposta.status).toBe(204);
  expect(resposta.body).toEqual({});
});

test("DELETE /foguete/:id retorna erro quando o foguete não existe", async () => {
  const resposta = await request(app).delete("/foguete/999");

  expect(resposta.status).toBe(404);
  expect(resposta.body).toEqual({ error: "Livro não encontrado" });
});