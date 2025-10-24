export function UpsertProgressDto(body) {
  return {
    articleId: Number(body?.articleId) || 0,
    status: String(body?.status ?? '').trim(),
    percentRead: body?.percentRead != null ? Number(body.percentRead) : null
  };
}
