export function RegisterDto(body) {
  return {
    name: String(body?.name ?? '').trim(),
    email: String(body?.email ?? '').toLowerCase().trim(),
    password: String(body?.password ?? ''),
    roleName: String(body?.roleName ?? 'Learner').trim()
  };
}

export function LoginDto(body) {
  return {
    email: String(body?.email ?? '').toLowerCase().trim(),
    password: String(body?.password ?? '')
  };
}
