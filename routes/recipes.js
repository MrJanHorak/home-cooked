import { Router } from 'express'
import * as recipeCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// localhost:3000/recipes/
router.get('/' , isLoggedIn, recipeCtrl.index)

export {
  router
}
