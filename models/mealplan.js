import mongoose, { Schema } from 'mongoose'

const mealPlanComment = new mongoose.Schema({
  author:  {type: Schema.Types.ObjectId, ref:"Profile"},
  content: String,
})

const mealSuggestion = new mongoose.Schema({
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  recipes: {type: Schema.Types.ObjectId, ref:"Recipe"},
},{
  timestamps: true
})

const mealplanSchema = new mongoose.Schema({
  weekOf: Date,
  recipes: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
  owner: String,
  comments: [mealPlanComment],
  isCurrent: String,
  highlighted: Boolean,
  suggestions: [mealSuggestion],
}, {
  timestamps: true
})

const MealPlan = mongoose.model('MealPlan', mealplanSchema)

export {
  MealPlan
}