import { Recipe } from "../models/recipe.js";

function index(req, res) {
  // Find all recipes
  Recipe.find({})
  // When we have all the recipes
  .then(recipes => {
    res.render("recipes/index", {
      title: "Recipes",
      recipes,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/recipes")
  })
}

function newRecipe(req, res) {
  res.render('recipes/new',{
  title: "New Recipes",
})
}

export {
  index,
  newRecipe as new
}