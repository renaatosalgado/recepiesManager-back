import recepieRepository from "../repositories/recepieRepository.js";

async function listAll() {
  return await recepieRepository.listAll();
}

export default {
  listAll,
};
