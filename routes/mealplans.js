import { Router } from 'express'
import * as mealplansCtrl from '../controllers/mealplans.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// localhost:3000/mealplans/
router.get('/' , isLoggedIn, mealplansCtrl.index)

export {
  router
}
