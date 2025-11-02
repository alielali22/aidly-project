import { CategoryRepository } from '../domain/repositories/CategoryRepository.js';

const categoryRepo = new CategoryRepository();

/**
 * List categories (search + pagination)
 * @param {{search?: string, limit?: number, offset?: number}} params
 */
export async function listCategories({ search = '', limit = 50, offset = 0 } = {}) {
  return categoryRepo.findAll({ search, limit, offset });
}

/**
 * Get a single category by ID.
 */
export async function getCategory(id) {
  const category = await categoryRepo.findById(id);
  if (!category) {
    const err = new Error('Category not found');
    err.status = 404;
    throw err;
  }
  return category;
}

/**
 * Create a new category.
 */
export async function createCategory(data) {
  try {
    const category = await categoryRepo.create(data);
    return category;
  } catch (e) {
    if (e.code === '23505') {  // duplicate category name
      const err = new Error('Category name already exists');
      err.status = 400;
      throw err;
    }
    throw e;
  }
}

/**
 * Update an existing category by ID.
 */
export async function updateCategory(id, data) {
  try {
    const category = await categoryRepo.update(id, data);
    if (!category) {
      const err = new Error('Category not found');
      err.status = 404;
      throw err;
    }
    return category;
  } catch (e) {
    if (e.code === '23505') {  // duplicate category name on update
      const err = new Error('Category name already exists');
      err.status = 400;
      throw err;
    }
    throw e;
  }
}

/**
 * Delete a category by ID.
 */
export async function deleteCategory(id) {
  const deleted = await categoryRepo.remove(id);
  if (!deleted) {
    const err = new Error('Category not found');
    err.status = 404;
    throw err;
  }
}
