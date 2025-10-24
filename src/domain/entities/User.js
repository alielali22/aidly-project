export class User {
  /** @param {{id:number, name:string, email:string, role_id:number, created_at:Date, avatar_url:string|null}} row */
  static fromRow(row) {
    return new User(
      row.id,
      row.name,
      row.email,
      row.role_id,
      row.created_at,
      row.avatar_url ?? null
    );
  }

  constructor(id, name, email, roleId, createdAt, avatarUrl = null) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.roleId = roleId;
    this.createdAt = createdAt;
    this.avatarUrl = avatarUrl;
  }
}
