export class Role {
  /** @param {{id:number, role_name:string}} row */
  static fromRow(row) {
    return new Role(row.id, row.role_name);
  }

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
