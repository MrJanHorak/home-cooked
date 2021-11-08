import { Router } from 'express'
import * as recipeCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// localhost:3000/recipes/
router.get('/' , isLoggedIn, recipeCtrl.index)
router.get('/new', isLoggedIn, recipeCtrl.new)
router.get('/:id', isLoggedIn, recipeCtrl.show)
router.get('/:id/edit',isLoggedIn, recipeCtrl.edit)
router.post('/', isLoggedIn, recipeCtrl.create)
router.post('/:id/comments', recipeCtrl.addComment)
router.put('/:id', isLoggedIn, recipeCtrl.update)
router.delete('/:id', isLoggedIn, recipeCtrl.delete)
router.delete('/:id/comments/:commentId', isLoggedIn, recipeCtrl.deleteComment)
router.post('/:id/ingredients', isLoggedIn, recipeCtrl.addToRecipe);

export {
  router
}
