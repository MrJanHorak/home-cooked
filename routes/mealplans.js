import { Router } from 'express'
import * as mealplansCtrl from '../controllers/mealplans.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// localhost:3000/mealplans/
router.get('/' , isLoggedIn, mealplansCtrl.index)
router.get('/new', isLoggedIn, mealplansCtrl.new)
router.get('/:id', isLoggedIn, mealplansCtrl.show)
router.get('/:id/edit',isLoggedIn, mealplansCtrl.edit)
router.post('/:id/recipes', isLoggedIn, mealplansCtrl.addToMealplan)
router.post('/', isLoggedIn, mealplansCtrl.create)
router.put('/:id', isLoggedIn, mealplansCtrl.update)
router.delete('/:id', isLoggedIn, mealplansCtrl.delete)

export {
  router
}
