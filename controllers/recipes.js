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

export {
  index,
}