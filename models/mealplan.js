import mongoose from 'mongoose'

const Schema = mongoose.Schema

const mealplanComment = new Schema({
  owner:  {type: Schema.Types.ObjectId, ref:"Profile"},
  name: String,
  avatar: String,
  content: String,
}, {
  timestamps: true
})

const mealSuggestion = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  name: String,
  avatar: String,
  recipes: {type: Schema.Types.ObjectId, ref:"Recipe"},
},{
  timestamps: true
})

const mealplanSchema = new Schema({
  weekOf: Date,
  name: String,
  meals: [String],
  comments: [mealplanComment],
  isCurrent: String,
  highlighted: Boolean,
  suggestions: [mealSuggestion],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  ownerName: String,
  ownerAvatar: String,
}, {
  timestamps: true
})

const Mealplan = mongoose.model('Mealplan', mealplanSchema)

export {
  Mealplan
}