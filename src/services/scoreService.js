import { ScoreRepository } from '../domain/repositories/ScoreRepository.js';
import { QuizRepository } from '../domain/repositories/QuizRepository.js';

const scores = new ScoreRepository();
const quizzes = new QuizRepository();

export async function submitScore(dto, currentUserId) {
  const quiz = await quizzes.findById(dto.quizId);
  if (!quiz) {
    const err = new Error('Quiz not found');
    err.status = 404;
    throw err;
  }
  return scores.create({
    userId: currentUserId,
    quizId: dto.quizId,
    score: dto.score,
    total: dto.total,
    timeTakenSeconds: dto.timeTakenSeconds
  });
}

export function myScores(userId) {
  return scores.listByUser(userId);
}
