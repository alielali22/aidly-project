export function CreateCategoryDto(body) {
  return {
    name: String(body?.name ?? '').trim(),
    description: (body?.description != null ? String(body.description).trim() : null) || null
  };
}

export function UpdateCategoryDto(body) {
  return {
    name: body?.name != null ? String(body.name).trim() : null,
    description: body?.description != null ? String(body.description).trim() : null
  };
}
