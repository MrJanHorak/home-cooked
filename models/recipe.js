import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeComment = new Schema({
  author: {type: Schema.Types.ObjectId, ref: "Profile"},
  content: String,
}, {
  timestamps: true
})

const recipeSchema = new Schema({
  name: String,
  ingredient1: String,
  ingredient2: String,
  ingredient3: String,
  ingredient4: String,
  ingredient5: String,
  ingredient6: String,
  ingredient7: String,
  ingredient8: String,
  ingredient9: String,
  ingredient10: String,
  ingredient11: String,
  ingredient12: String,
  ingredient13: String,
  ingredient15: String,
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