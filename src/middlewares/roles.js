// Purpose: Role-based access control (RBAC) middleware.
// This middleware resolves role names from the DB (and caches them), instead of hard-coding IDs.

import { db } from '../config/db.js';

// simple in-memory cache: roleId -> roleName
const roleCache = new Map();

/** Fetch role name for a given roleId (with caching) */
async function getRoleName(roleId) {
  if (!roleId) return null;
  if (roleCache.has(roleId)) return roleCache.get(roleId);

  const { rows } = await db.query('SELECT role_name FROM roles WHERE id = $1 LIMIT 1', [roleId]);
  const name = rows[0]?.role_name || null;
  if (name) roleCache.set(roleId, name);
  return name;
}

/**
 * requireRole(allowed)
 * - allowed: string | string[]
 * Ensures the authenticated user’s role (by roleId on req.user) is one of the allowed roles.
 * Example: app.post('/quizzes', authRequired, requireRole(['Admin','Expert']), handler)
 */
export function requireRole(allowed = []) {
  const wanted = Array.isArray(allowed) ? allowed : [allowed];

  return async (req, res, next) => {
    try {
      // authRequired should already have set req.user
      const roleId = req.user?.roleId;
      if (!roleId) return res.status(401).json({ error: 'Unauthorized' });

      const roleName = await getRoleName(roleId);
      if (!roleName) return res.status(403).json({ error: 'Forbidden' });

      // Case-insensitive comparison to be safe
      const ok = wanted.some(w => String(w).toLowerCase() === roleName.toLowerCase());
      if (!ok) return res.status(403).json({ error: 'Forbidden' });

      return next();
    } catch (err) {
      // If DB fails for some reason, block by default
      if (process.env.NODE_ENV !== 'production') console.error('requireRole error:', err);
      return res.status(500).json({ error: 'Role check failed' });
    }
  };
}

