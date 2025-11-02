export class Quiz {
  /** @param {{id:number, article_id:number, title:string, created_by:number|null, created_at:Date}} row */
  static fromRow(row) {
    return new Quiz(row.id, row.article_id, row.title, row.created_by ?? null, row.created_at);
  }

  constructor(id, articleId, title, createdBy, createdAt) {
    this.id = id;
    this.articleId = articleId;
    this.title = title;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }
}
