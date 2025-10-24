export function CreateArticleDto(body) {
  return {
    title: String(body?.title ?? '').trim(),
    content: String(body?.content ?? '').trim(),
    categoryId: Number(body?.categoryId) || 0,
    readTimeMinutes: body?.readTimeMinutes != null ? Number(body.readTimeMinutes) : null,
    mediaUrl: (body?.mediaUrl != null ? String(body.mediaUrl).trim() : null) || null
  };
}

export function UpdateArticleDto(body) {
  return {
    title: body?.title != null ? String(body.title).trim() : null,
    content: body?.content != null ? String(body.content).trim() : null,
    categoryId: body?.categoryId != null ? Number(body.categoryId) : null,
    readTimeMinutes: body?.readTimeMinutes != null ? Number(body.readTimeMinutes) : null,
    mediaUrl: body?.mediaUrl != null ? String(body.mediaUrl).trim() : null
  };
}
