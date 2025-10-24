import { CreateQuizDto } from '../domain/dto/quiz.dto.js';
import { createQuiz, listQuizzesForArticle, getQuiz, deleteQuiz } from '../services/quizService.js';

export async function create(req, res, next) {
  try {
    const { dto, errors } = CreateQuizDto(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const row = await createQuiz(dto, req.user?.id);
    res.status(201).json(row);
  } catch (e) { next(e); }
}

export async function forArticle(req, res, next) {
  try {
    const rows = await listQuizzesForArticle(req.params.articleId);
    res.json(rows);
  } catch (e) { next(e); }
}

export async function show(req, res, next) {
  try {
    const row = await getQuiz(req.params.id);
    if (!row) return res.status(404).json({ error: 'Quiz not found' });
    res.json(row);
  } catch (e) { next(e); }
}

export async function destroy(req, res, next) {
  try {
    const result = await deleteQuiz(req.params.id);
    res.json(result);
  } catch (e) { next(e); }
}
