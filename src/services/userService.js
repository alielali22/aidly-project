import bcrypt from 'bcrypt';
import { UserRepository } from '../domain/repositories/UserRepository.js';
import { RoleRepository } from '../domain/repositories/RoleRepository.js';

const userRepo = new UserRepository();
const roleRepo = new RoleRepository();
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10);

/**
 * Retrieve a user by their ID.
 */
export async function getUserById(id) {
  const user = await userRepo.findById(id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return user;  // returns a User entity (without password)
}

/**
 * Retrieve a user by their email (for authentication).
 */
export async function getUserByEmail(email) {
  // This returns the raw user record including password (for login)
  return userRepo.findByEmail(email);
}

/**
 * Create a new user with the specified role (defaults to Learner).
 */
export async function createUser({ name, email, password, roleName = 'Learner' }) {
  // Ensure the role exists (or create it if not)
  const role = await roleRepo.ensure(roleName);
  const roleId = role.id;
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  try {
    const user = await userRepo.create({ name, email, passwordHash, roleId });
    // Attach role name for output convenience
    user.roleName = role.name;
    return user;
  } catch (e) {
    if (e.code === '23505') {  // unique violation for email
      const err = new Error('Email already in use');
      err.status = 400;
      throw err;
    }
    throw e;
  }
}
