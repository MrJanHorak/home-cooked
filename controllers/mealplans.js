import { Mealplan } from "../models/mealplan.js";
import { Recipe } from "../models/recipe.js"

function index(req, res) {
  // Find all mealplans
  Mealplan.find({})
  // When we have all the mealpans
  .then(mealplans => {
    res.render("mealplans/index", {
      title: "Mealplans",
      mealplans,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/mealplans")
  })
}

function newMealplan(req, res) {
  res.render('mealplans/new', {
  title: "New Mealplan",
})
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Mealplan.create(req.body)
  .then(mealplan => {
    res.redirect('/mealplans')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/mealpans')
  })
}

function show(req, res) {
  Mealplan.findById(req.params.id)
  .populate(monday)
  .populate(tuesday)
  .populate(wednesday)
  .populate(thursday)
  .populate(friday)
  .populate(saturday)
  .populate(sunday)
  .exec(function(err, recipe){
    if(err) throw err;
    if(recipe) {
      console.log(recipe)
    }
  })
  .then(mealplan => {
    res.render('mealplans/show', {
      mealplan,
      title: '',
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/mealplans')
  })
}

function edit (req, res) {
  Mealplan.findById(req.params.id)
  .then(mealplan => {
    res.render('mealplans/edit', {
      mealplan,
      title: ""
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/mealplans')
  })
}

function update (req, res) {
  Mealplan.findById(req.params.id)
  .then(mealplan => {
    if(mealplan.owner.equals(req.user.profile._id)) {
      mealplan.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/mealplans/${mealplan._id}`)
      })
    } else {
      throw new Error ('🚫 You are absolutely NOT authorised to even try that!!! 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/mealplans')
  })
}

function deleteMealplan(req, res) {
  Mealplan.findById(req.params.id)
  .then(mealplan => {
    if(mealplan.owner.equals(req.user.profile._id)) {
      mealplan.delete()
      .then(() => {
        res.redirect('/mealplans')
      })
    } else {
      throw new Error ('🚫 You are absolutely NOT authorised to even try that!!! 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/mealplans')
  })
}

function addToMealplan(req,res){
  Mealplan.findById(req.params.mealplanId)
  .then(mealplan => {
    mealplan.monday.push(req.body.recipeId)
    mealplan.save()
    res.redirect(`/mealplans/${mealplan._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/mealplans')
  })
}

export {
  index,
  newMealplan as new,
  create,
  show,
  edit,
  update,
  deleteMealplan as delete,
  addToMealplan
}