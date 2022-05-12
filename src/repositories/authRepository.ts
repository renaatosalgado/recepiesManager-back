import { prisma } from "../database.js";

async function createSession(userId: number) {
  await prisma.session.create({
    data: { userId },
  });
}

async function getSessionById(sessionId: number) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  return session;
}

async function getSessionByUserId(userId: number) {
  const session = await prisma.session.findUnique({
    where: { userId },
  });

  return session;
}

async function deleteSession(sessionId: number) {
  await prisma.session.delete({
    where: { id: sessionId },
  });
}

export default {
  createSession,
  getSessionById,
  getSessionByUserId,
  deleteSession,
};
