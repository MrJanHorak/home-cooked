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
  monday: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
  tuesday: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
  wednesday: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
  thursday: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
  friday: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
  saturday: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
  sunday: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
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