// src/middlewares/auth.js
import jwt from 'jsonwebtoken';

export function authRequired(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [, token] = header.split(' ');
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Accept either standard 'sub' or common 'id' claim
    const userId = payload.sub ?? payload.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = {
      id: userId,
      email: payload.email,
      roleId: payload.roleId,          
      name: payload.name,
      // Prefer a string role in the token; required by requireRole()
      ...(payload.role ? { role: payload.role } : {})
    };

    return next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
