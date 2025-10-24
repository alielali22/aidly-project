import { validationResult } from 'express-validator';

export function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  return res.status(400).json({
    errors: result.array().map(e => ({
      field: e.param,
      message: e.msg,
      value: e.value ?? null,
      location: e.location
    }))
  });
}
