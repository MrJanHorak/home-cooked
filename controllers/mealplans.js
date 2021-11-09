import { Mealplan } from "../models/mealplan.js"
import { Recipe } from "../models/recipe.js"
import { Profile } from "../models/profile.js"

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
  .then(mealplan => {
    Recipe.find({})
    .then(recipes => {
      res.render("mealplans/show", {
      title: ``,
      mealplan,
      recipes
          })
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

async function addToMealplan(req, res) {
  console.log("PARAMS.ID: ",req.params.id)
  console.log("REQ.BODY: ",req.body)
  try {
    await Mealplan.updateOne({ _id: req.params.id },
      {
        $push: { monday: { $each: req.body.monday } }
      })
    res.redirect(`/mealplans/${req.params.id}`)
  } catch (error) {
    console.log(error)
  }
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