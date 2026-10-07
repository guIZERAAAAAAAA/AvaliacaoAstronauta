
import express from "express";
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const sistemaFoguete = [
    {

        "id": 1,
        "nome": "Apollo 11",
        "ano": 1969,
        "agencia": "NASA",
        "status": "Concluida"
    },


    {
        "id": 2,
        "nome": "Voyager 1",
        "ano": 1977,
        "agencia": "NASA",
        "status": "Em operação"
    },
    {
        "id": 3,
        "nome": "Artemis II",
        "ano": 2026,
        "agencia": "NASA",
        "status": "Planejada"
    }
]
//autor ano virou ano
//titulo virou nome 
/**
 * @openapi
 * /foguete:
 *   get:
 *     summary: Lista foguete
 *     description: Retorna a lista de foguetes, com filtro opcional por nome
 *     parameters:
 *       - in: query
 *         name: nome 
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra os livros pelo título
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   autor:
 *                     type: string
 *                   status:
 *                     type: boolean
 */

app.get('/missoes', (req, res) =>{
    const titulo = req.query?.titulo || null
    let spacoFiltrados = null
    if(titulo !== null){
      spacoFiltrados = foguete.filter(item => item.titulo.toLowerCase() // vai ter que mudar no test o livo pra outra coisa
                                                    .includes(titulo.toLowerCase()));
    }

    spacoFiltrados = spacoFiltrados ?? foguete;
    res.status(200).json(spacoFiltrados);
});

/**
 * @openapi
 * /foguetes/{id}:
 *   get:
 *     summary: Busca um fo pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: foguete encontrado
 *       404:
 *         description: foguete não encontrado
 */
app.get('/missoes/:id', (req, res) =>{
    const id = Number(req.params?.id);

    const spaco = foguete.find(item => item.id === id);

    if(!foguete){
        return res.status(404).json({error: "Foguete não encontrado"})
    }

    res.status(200).json(foguete);

});

//autor ano virou ano
//titulo virou nome 
/**
 * @openapi
 * /foguete:
 *   post:
 *     summary: Cria um novo foguete
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - ano
 *             properties:
 *               nome:
 *                 type: string
 *               ano:
 *                 type: string
 *               disponivel:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
app.post('/missoes', (req, res)=>{

    const nome = req.body?.nome || null;
    const ano = req.body?.ano || null;

      if(!nome){
        return res.status(400).json({error: "nome é obrigatório"})
      }

      if(!ano){
        return res.status(400).json({error: "ano é obrigatório"})

      }

        const novoFoguete = { // troquei o livro aqui tambem 
            id: foguete.length + 1,
            nome : nome,
            ano : ano,
            agencia : "", 
            status: req.body?.disponivel || false
        }

        foguete.push(novoFoguete);

        res.status(201).json(novoFoguete);

});
//autor ano virou ano
//titulo virou nome 
/**
 * @openapi
 * /foguete/{id}:
 *   put:
 *     summary: Atualiza um foguete pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Memórias Póstumas de Brás Cubas
 *               ano:
 *                 type: string
 *                 example: Machado de Assis
 *               disponivel:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
app.put('/missoes/:id', (req, res) => {
    const id = Number(req.params.id);
    const spaco = spaco.find(item => item.id === id);
    if(!livro){
        return res.status(404).json({error: "foguete não encontrado"})
    }

    if(req?.body?.nome && req.body.nome !== ""){
       spaco.nome = req.body.nome;
    }

    if(req?.body?.ano && req.body.ano !== ""){
       spaco.ano = req.body.ano;
    }

    if(req?.body?.agencia && req.body.agencia !== ""){
        spaco.agencia = req.body.agencia;
    }  

    if(req?.body?.status && req.body.status !== ""){
        spaco.status = req.body.status;
    }

    res.status(200).json(foguete)
});

/**
 * @openapi
 * /foguete/{id}:
 *   delete:
 *     summary: Exclui um livro pelo id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: foguete excluido com sucesso
 *       404:
 *         description: foguete não encontrado
 */
app.delete('/missoes/:id', (req, res) =>{
    const id = Number(req.params.id);
    const indice = foguete.findIndex(item => item.id === id)

    if(indice === -1){
        return res.status(404).json({ error: "foguete não encontrado" })
    }

    foguete.splice(indice, 1);

    res.status(204).send('')

});


app.get('/previsao', async (req, res) => {
  const { lat, lon } = req.query;
  const url = ``; // url de algaum acoisa 

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    res.status(200).json(dados.current_weather);
  } catch (erro) {
    res.status(502).json({ erro: 'Falha ao consultar serviço de previsão do tempo' });
  }
});


app.get('/api', async (req, res) => {
    const id = req.query?.id ?? '';
    const url = `https://api.jikan.moe/v4/anime/${id}`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        const dados_para_retornar = {
            titulo : dados.data.title ,
            duracao : dados.data.duration,
            resumo: dados.data.synopsis
        }
        res.status(200).json(dados_para_retornar);
    }catch (erro){
        res.status(502).json({ erro: 'Falha ao consultar serviço de anime' });
    }
});

export default app;