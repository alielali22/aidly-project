export function CreateUserDto(body) {
  const errors = [];
  const dto = {
    name: String(body?.name ?? '').trim(),
    email: String(body?.email ?? '').toLowerCase().trim(),
    password: String(body?.password ?? ''),
    roleName: String(body?.roleName ?? 'Learner').trim()
  };

  if (!dto.name) errors.push('name is required');
  if (!/^\S+@\S+\.\S+$/.test(dto.email)) errors.push('valid email is required');
  if (!dto.password || dto.password.length < 8) errors.push('password must be at least 8 chars');
  if (!dto.roleName) errors.push('roleName is required');

  return { dto, errors };
}
