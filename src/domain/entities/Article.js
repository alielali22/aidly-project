export class Article {
  /** @param {{id:number,title:string,content:string,category_id:number,created_by:number,created_at:Date,updated_at:Date|null,read_time_minutes:int|null,media_url:string|null}} row */
  static fromRow(row) {
    return new Article(
      row.id, row.title, row.content, row.category_id, row.created_by,
      row.created_at, row.updated_at ?? null, row.read_time_minutes ?? null, row.media_url ?? null
    );
  }
  constructor(id, title, content, categoryId, createdBy, createdAt, updatedAt = null, readTime = null, mediaUrl = null) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.categoryId = categoryId;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.readTimeMinutes = readTime;
    this.mediaUrl = mediaUrl;
  }
}
