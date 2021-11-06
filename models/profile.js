import mongoose, { Schema } from 'mongoose'

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  recipes: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
  mealplans: [{type: Schema.Types.ObhjectIs, ref: "MealPlan"}] ,
  likeLevel: Number,
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}