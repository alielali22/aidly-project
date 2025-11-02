import { db } from '../../config/db.js';

export class BaseRepository {
  query(text, params) {
    return db.query(text, params);
  }
}
