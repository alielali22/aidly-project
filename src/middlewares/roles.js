export function requireRole(...roleNames) {
  const allowed = new Set(roleNames.map(r => r.toLowerCase()));
  return (req, res, next) => {
    const user = req.user;
    if (!user || !user.role) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const currentRoleName = user.role.toLowerCase();

    if (!allowed.has(currentRoleName)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient role' });
    }

    next();
  };
}
