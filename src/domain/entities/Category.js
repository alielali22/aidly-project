export class Category {
  /** @param {{id:number, category_name:string, description:string|null, created_at:Date}} row */
  static fromRow(row) {
    return new Category(row.id, row.category_name, row.description ?? null, row.created_at);
  }

  constructor(id, name, description = null, createdAt = null) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
  }
}
