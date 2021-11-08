import { Ingredient } from "../models/ingredient.js";

function newIngredient(req, res) {
  Ingredient.find({})
  .then(ingredient => {
    res.render('ingredients/new', {
      ingredient
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/ingredients')
  })
}

function create(req, res) {
  Ingredient.findOne({itemName: req.body.itemName})
  .then (ingredient => {
    if(ingredient === null) {
      Ingredient.create(req.body)
      .then(()=> {
        res.redirect(`/ingredients/new`)
      })
    }}
    )
  .catch(err => {
    console.log(err)
    res.redirect('/ingredients/new')
  })
}

export {
  newIngredient as new,
  create
}