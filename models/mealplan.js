import mongoose from 'mongoose'

const Schema = mongoose.Schema

const mealplanComment = new Schema({
  author:  {type: Schema.Types.ObjectId, ref:"Profile"},
  content: String,
})

const mealSuggestion = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  recipes: {type: Schema.Types.ObjectId, ref:"Recipe"},
},{
  timestamps: true
})

const mealplanSchema = new Schema({
  weekOf: Date,
  monday: [String],
  tuesday: [String],
  wednesday: [String],
  thursday: [String],
  friday: [String],
  saturday: [String],
  sunday: [String],
  owner: String,
  comments: [mealplanComment],
  isCurrent: String,
  highlighted: Boolean,
  suggestions: [mealSuggestion],
}, {
  timestamps: true
})

const Mealplan = mongoose.model('Mealplan', mealplanSchema)

export {
  Mealplan
}