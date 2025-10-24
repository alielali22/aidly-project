export function CreateFeedbackDto(body) {
  return {
    articleId: Number(body?.articleId) || 0,
    comment: (body?.comment != null ? String(body.comment).trim() : null) || null,
    rating: body?.rating != null ? Number(body.rating) : null
  };
}
