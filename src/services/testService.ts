import testRepository from "../repositories/testRepository.js";

async function resetUsers() {
  await testRepository.resetUsers();
}

export default {
  resetUsers,
};
