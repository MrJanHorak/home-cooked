import  {Recipe } from "../models/recipe.js"

function index(req, res) {
  // Find all recipes
  Recipe.find({}).sort({createdAt: 'descending'})
  .then(recipes => {
    res.render("index", {
      title: "Home Cooked!",
      recipes,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  index
}