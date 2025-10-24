import jwt from 'jsonwebtoken';

export function authRequired(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [, token] = header.split(' ');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Expecting payload like: { id, email, roleId, iat, exp }
    req.user = {
      id: payload.id,
      email: payload.email,
      roleId: payload.roleId
    };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
