import { Mealplan } from "../models/mealplan.js";

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

export {
  index,
}