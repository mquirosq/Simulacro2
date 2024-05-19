import { check } from 'express-validator'
import { RestaurantCategory } from '../../models/models.js'

const checkNameNotExists = async (value, { req }) => {
  try {
    const category = await RestaurantCategory.findAll({ where: { name: value } })
    if (category.length > 0) {
      return Promise.reject(new Error('The category already exists.'))
    } else { return Promise.resolve() }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

export const create = [
  check('name').exists().isString().isLength({ min: 1, max: 50 }).trim().custom(checkNameNotExists)
]
