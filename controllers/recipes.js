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

function create(req, res) {
  req.body.owner = req.user.profile._id
  Recipe.create(req.body)
  .then(recipe => {
    res.redirect('/recipes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function show(req, res) {
  Recipe.findById(req.params.id)
  .then(recipe => {
    res.render('recipes/show', {
      recipe,
      title: ''
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function edit (req, res) {
  Recipe.findById(req.params.id)
  .then(recipe => {
    res.render('recipes/edit', {
      recipe,
      title: ""
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function update (req, res) {
  Recipe.findById(req.params.id)
  .then(recipe => {
    if(recipe.owner.equals(req.user.profile._id)) {
      recipe.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/recipes/${recipe._id}`)
      })
    } else {
      throw new Error ('🚫 You are absolutely NOT authorised to even try that!!! 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function deleteRecipe(req, res) {
  Recipe.findById(req.params.id)
  .then(recipe => {
    if(recipe.owner.equals(req.user.profile._id)) {
      recipe.delete()
      .then(() => {
        res.redirect('/recipes')
      })
    } else {
      throw new Error ('🚫 You are absolutely NOT authorised to even try that!!! 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

export {
  index,
  newRecipe as new,
  create,
  show,
  edit,
  update,
  deleteRecipe as delete
}