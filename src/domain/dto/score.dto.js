export function CreateScoreDto(body) {
  return {
    quizId: Number(body?.quizId) || 0,
    score: Number.isFinite(Number(body?.score)) ? Number(body.score) : 0,
    total: Number.isFinite(Number(body?.total)) ? Number(body.total) : 0,
    timeTakenSeconds: body?.timeTakenSeconds != null ? Number(body.timeTakenSeconds) : null
  };
}
