import { validationResult } from 'express-validator';

export function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  // Return all validation errors in a structured format
  return res.status(400).json({
    errors: result.array().map(err => ({
      field: err.param,
      message: err.msg,
      value: err.value ?? null,
      location: err.location
    }))
  });
}
