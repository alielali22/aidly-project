import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, getUserByEmail, getUserById } from '../services/userService.js';
import { RegisterDto, LoginDto } from '../domain/dto/auth.dto.js';
import { RoleRepository } from '../domain/repositories/RoleRepository.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Sign a JWT for a user, including their role name if available.
 */
function signToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    roleId: user.roleId
  };
  if (user.roleName || user.role) {
    payload.role = user.roleName || user.role;
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Register a new user (defaults to Learner role).
 */
export async function register(req, res, next) {
  try {
    const { name, email, password, roleName } = RegisterDto(req.body);
    const user = await createUser({ name, email, password, roleName: roleName || 'Learner' });
    const token = signToken(user);
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, roleId: user.roleId, roleName: user.roleName }
    });
  } catch (e) {
    next(e);
  }
}

/**
 * Authenticate a user and return a JWT if credentials are valid.
 */
export async function login(req, res, next) {
  try {
    const { email, password } = LoginDto(req.body);
    const userRecord = await getUserByEmail(email);
    if (!userRecord) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, userRecord.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Fetch role name for token and response
    const roleRepo = new RoleRepository();
    const role = await roleRepo.findById(userRecord.role_id);
    if (role) {
      userRecord.roleName = role.name;
    }
    const token = signToken(userRecord);
    res.json({
      token,
      user: { 
        id: userRecord.id, 
        name: userRecord.name, 
        email: userRecord.email, 
        roleId: userRecord.role_id, 
        roleName: userRecord.roleName || role?.name 
      }
    });
  } catch (e) {
    next(e);
  }
}

/**
 * Get the current authenticated user's profile.
 */
export async function me(req, res, next) {
  try {
    const user = await getUserById(req.user.id);
    // Attach role name for response
    const roleRepo = new RoleRepository();
    const role = await roleRepo.findById(user.roleId);
    if (role) {
      user.roleName = role.name;
    }
    res.json({ 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      roleId: user.roleId, 
      roleName: user.roleName || role?.name 
    });
  } catch (e) {
    next(e);
  }
}
