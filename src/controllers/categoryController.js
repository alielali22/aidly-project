import { listCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../services/categoryService.js';
import { CreateCategoryDto, UpdateCategoryDto } from '../domain/dto/category.dto.js';

/**
 * Get a list of categories (optionally filtered by search term, with pagination).
 */
export async function index(req, res, next) {
  try {
    const categories = await listCategories({
      search: req.query.search || '',
      limit: req.query.limit ? parseInt(req.query.limit, 10) : 50,
      offset: req.query.offset ? parseInt(req.query.offset, 10) : 0
    });
    res.json(categories);
  } catch (e) {
    next(e);
  }
}

/**
 * Get a single category by ID.
 */
export async function show(req, res, next) {
  try {
    const category = await getCategory(Number(req.params.id));
    res.json(category);
  } catch (e) {
    next(e);
  }
}

/**
 * Create a new category. Admin only.
 */
export async function store(req, res, next) {
  try {
    const data = CreateCategoryDto(req.body);
    const category = await createCategory(data);
    res.status(201).json(category);
  } catch (e) {
    next(e);
  }
}

/**
 * Update an existing category by ID. Admin only.
 */
export async function updateOne(req, res, next) {
  try {
    const data = UpdateCategoryDto(req.body);
    const category = await updateCategory(Number(req.params.id), data);
    res.json(category);
  } catch (e) {
    next(e);
  }
}

/**
 * Delete a category by ID. Admin only.
 */
export async function destroy(req, res, next) {
  try {
    await deleteCategory(Number(req.params.id));
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
