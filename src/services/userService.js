import bcrypt from 'bcrypt';
import { RoleRepository } from '../domain/repositories/RoleRepository.js';
import { UserRepository } from '../domain/repositories/UserRepository.js';

const rolesRepo = new RoleRepository();
const usersRepo = new UserRepository();
const SALT_ROUNDS = 10;

export async function createUserFromDto(createDto) {
  // email unique
  const existing = await usersRepo.findByEmail(createDto.email);
  if (existing) {
    const err = new Error('Email already in use');
    err.status = 409;
    throw err;
  }

  // resolve role
  let role = await rolesRepo.findByName(createDto.roleName);
  if (!role) role = await rolesRepo.ensure(createDto.roleName);

  // hash password
  const passwordHash = await bcrypt.hash(createDto.password, SALT_ROUNDS);

  // create user
  return usersRepo.create({
    name: createDto.name,
    email: createDto.email,
    passwordHash,
    roleId: role.id,
  });
}

export async function getUserByEmail(email) {
  return usersRepo.findByEmail(email); // returns row with password
}

export async function getUserById(id) {
  return usersRepo.findById(id); // returns entity (no password)
}

export async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}
