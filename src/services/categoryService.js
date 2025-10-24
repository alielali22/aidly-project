import { CategoryRepository } from '../domain/repositories/CategoryRepository.js';

const repo = new CategoryRepository();

export function listCategories({ limit, offset }) {
  return repo.findAll({ limit, offset });
}

export function getCategory(id) {
  return repo.findById(Number(id));
}

export function createCategory(dto) {
  return repo.create({ name: dto.name, description: dto.description });
}

export async function updateCategory(id, dto) {
  const existing = await repo.findById(Number(id));
  if (!existing) {
    const err = new Error('Category not found');
    err.status = 404;
    throw err;
  }
  return repo.update(Number(id), { name: dto.name, description: dto.description });
}

export async function deleteCategory(id) {
  const existing = await repo.findById(Number(id));
  if (!existing) {
    const err = new Error('Category not found');
    err.status = 404;
    throw err;
  }
  await repo.remove(Number(id));
  return { ok: true };
}
