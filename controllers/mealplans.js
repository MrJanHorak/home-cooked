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
  Profile.findById(req.user.profile._id)
  .then(self => {
    const owner = self._id
    const isSelf = self._id.equals(req.user.profile._id)
    const ownerName = self.name
    const ownerAvatar = self.avatar
    res.render('mealplans/new', {
    title: "New Mealplan",
    self,
    isSelf,
    owner,
    ownerName,
    ownerAvatar
  })
})
.catch(err => {
  console.log(err)
  res.redirect('/recipes')
})
}

function create(req, res) {
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
  .populate("comments").exec()
  .then(mealplan => {
    const ownerName = recipe.ownerName
    const ownerAvatar = recipe.ownerAvatar
    Recipe.find({})
    .then(recipes => {
      Profile.findById(req.user.profile._id)
      .then(self => {
        const isSelf = self._id.equals(req.user.profile._id)
        const name = self.name
        const avatar = self.avatar
        res.render("mealplans/show", {
        title: ``,
        mealplan,
        recipes,
        ownerName,
        ownerAvatar,
        self,
        isSelf,
        avatar,
        name,
          })
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
    Profile.findById(req.user.profile._id)
    .then(self => {
      const owner = self._id
      const isSelf = self._id.equals(req.user.profile._id)
      const ownerName = self.name
      const ownerAvatar = self.avatar
      res.render('mealplans/edit', {
        self,
        isSelf,
        owner,
        ownerName,
        ownerAvatar,
        mealplan,
        title: ""
      })
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

function addComment(req,res){
  req.body.owner = req.user.profile._id
  Recipe.findById(req.params.id)
  .then(mealplan => {
    mealplan.comments.push(req.body)
    mealplan.save()
    .then(() => {
      res.redirect(`/mealplans/${mealplan._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/mealplans/${mealplan._id}`)
  })
}

function deleteComment(req, res) {
  Recipe.findById(req.params.id)
  .then(mealplan => {
    mealplan.comments.remove({_id: req.params.commentId})
    mealplan.save()
    .then(()=> {
      res.redirect(`/mealplans/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/mealplans/${req.params.id}`)
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
  addToMealplan,
  addComment,
  deleteComment
}