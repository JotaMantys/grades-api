import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const grade = db.gradeModel

const create = async (req, res) => {
  
    const {name ,subject,type,value} = req.body;

    const newGrade = new grade({
                               "name" 		    :name
                              ,"subject" 	    :subject
                              ,"type" 		    :type
                              ,"value" 		    :value
                              ,"lastModified" :Date.now

                              
    });

  try {
    const data =  await newGrade.save();
    res.send(data);
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};
console.log
  try {
    res.send(await grade.find(condition));
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    res.send(await grade.findOne({_id : id}));

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });

    
  }
  const {name ,subject,type,value} = req.body;
  const id = req.params.id;

  try {
    await grade.findOneAndUpdate({_id : id},{
                                          "name" 		    :name
                                        ,"subject" 	    :subject
                                        ,"type" 		    :type
                                        ,"value" 		    :value
                                        ,"lastModified" :Date.now
                                    });
                                    
    res.send({ message: 'Grade atualizado com sucesso' });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {

    await grade.findOneAndDelete({_id : id});
    res.send({ message: 'Grade excluido com sucesso' });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (_req, res) => {
  //const id = req.params.id;

  
  try {
    await grade.deleteMany({})
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
