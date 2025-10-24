export class Progress {
  /** @param {{id:number,user_id:number,article_id:number,status:string,last_accessed:Date,percent_read:number|null}} row */
  static fromRow(row) {
    return new Progress(row.id, row.user_id, row.article_id, row.status, row.last_accessed, row.percent_read ?? null);
  }
  constructor(id, userId, articleId, status, lastAccessed, percentRead = null) {
    this.id = id;
    this.userId = userId;
    this.articleId = articleId;
    this.status = status; // 'Not Started' | 'In Progress' | 'Completed'
    this.lastAccessed = lastAccessed;
    this.percentRead = percentRead;
  }
}
