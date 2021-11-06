import { Profile } from "../models/profile.js";

function index(req, res) {
  // Find all profiles
  Profile.find({})
  // When we have all the profiles
  .then(profiles => {
    res.render("profiles/index", {
      title: "Profiles",
      profiles,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/profiles")
  })
}

export {
  index,
}