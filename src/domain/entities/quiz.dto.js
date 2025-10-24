export function CreateQuizDto(body) {
  const errors = [];
  const dto = {
    articleId: Number(body?.articleId) || 0,
    question: (body?.question ?? '').trim(),
    optionA: (body?.optionA ?? '').trim(),
    optionB: (body?.optionB ?? '').trim(),
    optionC: (body?.optionC ?? '').trim(),
    optionD: (body?.optionD ?? '').trim(),
    correct: (body?.correct ?? '').trim().toUpperCase(),
  };

  if (!dto.articleId) errors.push('articleId is required');
  if (!dto.question) errors.push('question is required');
  if (!dto.optionA || !dto.optionB || !dto.optionC || !dto.optionD) errors.push('all options A–D are required');
  if (!['A','B','C','D'].includes(dto.correct)) errors.push('correct must be A, B, C, or D');

  return { dto, errors };
}
