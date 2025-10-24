export class Quiz {
  /** @param {{id:number,article_id:number,question:string,option_a:string,option_b:string,option_c:string,option_d:string,correct_answer:string,created_by:number|null,created_at:Date}} row */
  static fromRow(row) {
    return new Quiz(
      row.id, row.article_id, row.question,
      row.option_a, row.option_b, row.option_c, row.option_d,
      row.correct_answer, row.created_by ?? null, row.created_at
    );
  }
  constructor(id, articleId, question, A, B, C, D, correct, createdBy, createdAt) {
    this.id = id;
    this.articleId = articleId;
    this.question = question;
    this.optionA = A;
    this.optionB = B;
    this.optionC = C;
    this.optionD = D;
    this.correctAnswer = correct; // 'A' | 'B' | 'C' | 'D'
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }
}
