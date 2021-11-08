import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeComment = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  name: String,
  content: String,
}, {
  timestamps: true
})

const recipeSchema = new Schema({
  name: String,
  ingredients: [String],
  instructions: String,
  cookTime: Number,
  prepTime: Number,
  yield: Number,
  comments: [recipeComment],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  freaquency: Number,
  datesUsed: Date,
  requested: [{type: Schema.Types.ObjectId, ref: "Profile"}],
  temp: Number,
  likeLevel: Number,
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}