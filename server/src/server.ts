import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

//Adicionar o cors para qualquer aplicação poder acessar a api
app.use(cors());
//Adicionar para o node entender json
app.use(express.json());
app.use(routes);

//GET: Buscar ou listar um informação 
//POST: Criar alugma nova informação
//PUT: Atualizar uma informa existente
//DELETE: Deletar uma informação existenste

//Corpo (Request Body) : Dados para criarção ou atualização de um registro
// Route Params: Identificar qual recurso eu quero atualizar ou deletar '/users/:id' para recuperar resquest.params
// Query Params: Paginação e utilizado para qualquer coisa outra coisa tipo orderna , filtros
//Movido para arquivo de routes
/*app.get('/', (request, response) => {
  return response.json({message:'Hello Word'});
});*/

//passando a porta padrão 80 ou 3333
//localhost:3333/users
app.listen(3333);

