export class Feedback {
  /** @param {{id:number,user_id:number,article_id:number,comment:string|null,rating:number|null,created_at:Date,is_visible:boolean}} row */
  static fromRow(row) {
    return new Feedback(
      row.id, row.user_id, row.article_id,
      row.comment ?? null, row.rating ?? null, row.created_at, row.is_visible
    );
  }
  constructor(id, userId, articleId, comment, rating, createdAt, isVisible) {
    this.id = id;
    this.userId = userId;
    this.articleId = articleId;
    this.comment = comment;
    this.rating = rating;
    this.createdAt = createdAt;
    this.isVisible = isVisible;
  }
}
