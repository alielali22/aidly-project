export class Score {
  /** @param {{id:number,user_id:number,quiz_id:number,score:number,total:number,taken_at:Date,time_taken_seconds:number|null}} row */
  static fromRow(row) {
    return new Score(row.id, row.user_id, row.quiz_id, row.score, row.total, row.taken_at, row.time_taken_seconds ?? null);
  }
  constructor(id, userId, quizId, score, total, takenAt, timeTaken = null) {
    this.id = id;
    this.userId = userId;
    this.quizId = quizId;
    this.score = score;
    this.total = total;
    this.takenAt = takenAt;
    this.timeTakenSeconds = timeTaken;
  }
}
