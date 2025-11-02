export function scoreTargetGuard(req, res, next) {
  try {
    // Default to the current user's ID if not explicitly provided
    const targetUserId = req.body.userId ?? req.user.id;

    // Identify if the current user is an admin
    const isAdmin = req.user?.role?.toLowerCase() === 'admin';

    // Learners cannot assign scores to others
    if (!isAdmin && targetUserId !== req.user.id) {
      return res.status(403).json({
        error: 'Forbidden: You are not allowed to assign or modify scores for other users.'
      });
    }

    // Normalize the body so services always have a userId set
    req.body.userId = targetUserId;
    next();
  } catch (err) {
    console.error('Error in scoreTargetGuard:', err);
    res.status(500).json({ error: 'Internal server error in scoreTargetGuard' });
  }
}
