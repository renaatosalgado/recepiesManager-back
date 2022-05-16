import recepieRepository from "../repositories/recepieRepository.js";

async function listAll() {
  return await recepieRepository.listAll();
}

async function findSingleRecepie(recepieId: number) {
  return await recepieRepository.findById(recepieId);
}

export default {
  listAll,
  findSingleRecepie,
};
