export function CreateQuizDto(body) {
  return {
    articleId: Number(body?.articleId) || 0,
    question: String(body?.question ?? '').trim(),
    optionA: String(body?.optionA ?? '').trim(),
    optionB: String(body?.optionB ?? '').trim(),
    optionC: String(body?.optionC ?? '').trim(),
    optionD: String(body?.optionD ?? '').trim(),
    correct: String(body?.correct ?? '').trim().toUpperCase()
  };
}
