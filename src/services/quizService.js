import { QuizRepository } from '../domain/repositories/QuizRepository.js';
import { ArticleRepository } from '../domain/repositories/ArticleRepository.js';

const quizzes = new QuizRepository();
const articles = new ArticleRepository();

export async function createQuiz(dto, currentUserId) {
  const article = await articles.findById(dto.articleId);
  if (!article) {
    const err = new Error('Article not found');
    err.status = 404;
    throw err;
  }
  return quizzes.create({
    articleId: dto.articleId,
    question: dto.question,
    optionA: dto.optionA,
    optionB: dto.optionB,
    optionC: dto.optionC,
    optionD: dto.optionD,
    correct: dto.correct,
    createdBy: currentUserId ?? null
  });
}

export function listQuizzesForArticle(articleId) {
  return quizzes.findByArticle(Number(articleId));
}

export async function getQuiz(id) {
  return quizzes.findById(Number(id));
}

export async function deleteQuiz(id) {
  const q = await quizzes.findById(Number(id));
  if (!q) {
    const err = new Error('Quiz not found');
    err.status = 404;
    throw err;
  }
  await quizzes.remove(Number(id));
  return { ok: true };
}
