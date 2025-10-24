import jwt from 'jsonwebtoken';
import { CreateUserDto } from '../domain/dto/user.dto.js';
import { LoginDto } from '../domain/dto/auth.dto.js';
import {
  createUserFromDto,
  getUserByEmail,
  verifyPassword,
  getUserById,
} from '../services/userService.js';

function signToken(user) {
  return jwt.sign(
    { sub: user.id, roleId: user.roleId ?? user.role_id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
}

export async function register(req, res, next) {
  try {
    const { dto, errors } = CreateUserDto(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const user = await createUserFromDto(dto);
    const token = signToken(user);
    res.status(201).json({ user, token });
  } catch (err) { next(err); }
}

export async function login(req, res, next) {
  try {
    const { dto, errors } = LoginDto(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const userRow = await getUserByEmail(dto.email);
    if (!userRow) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await verifyPassword(dto.password, userRow.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    // strip password, normalize
    const { password, ...safeUser } = userRow;
    const token = signToken(safeUser);
    res.json({ user: safeUser, token });
  } catch (err) { next(err); }
}

export async function me(req, res, next) {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) { next(err); }
}
