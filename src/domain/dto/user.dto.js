export function CreateUserDto(body) {  const errors = [];
  const dto = {
    name: (body?.name ?? '').trim(),
    email: (body?.email ?? '').toLowerCase().trim(),
    password: body?.password ?? '',
    roleName: (body?.roleName ?? 'Learner').trim(),
  };

  if (!dto.name) errors.push('name is required');
  if (!/^\S+@\S+\.\S+$/.test(dto.email)) errors.push('valid email is required');
  if (!dto.password || dto.password.length < 6) errors.push('password must be at least 6 chars');
  if (!dto.roleName) errors.push('roleName is required');

  return { dto, errors };
}
