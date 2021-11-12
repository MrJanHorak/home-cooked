import { Profile } from "../models/profile.js";
import { Recipe } from "../models/recipe.js";
import { Mealplan } from "../models/mealplan.js";

function index(req, res) {
  Profile.find({})
    .then((profiles) => {
      Recipe.find({}).then((recipes) => {
        Mealplan.find({}).then((mealplans) => {
          res.render("profiles/index", {
            title: "Profiles",
            profiles,
            recipes,
            mealplans,
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/profiles");
    });
}

function show(req, res) {
  Profile.findById(req.params.id)
    .then((profile) => {
      Recipe.find({ owner: req.params.id })
        .sort({ name: "asc" })
        .then((recipes) => {
          Mealplan.find({ owner: req.params.id }).then((mealplans) => {
            Profile.findById(req.user.profile._id).then((self) => {
              const isSelf = self._id.equals(profile._id);
              res.render("profiles/show", {
                title: `${profile.name}'s profile`,
                mealplans,
                profile,
                self,
                isSelf,
                recipes,
              });
            });
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
}

export { index, show };
