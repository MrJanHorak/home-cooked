import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeComment = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  name: String,
  avatar: String,
  content: String,
}, {
  timestamps: true
})

const recipeSchema = new Schema({
  name: String,
  picture: String,
  ingredients: [String],
  instructions: String,
  cookTime: Number,
  prepTime: Number,
  yield: Number,
  comments: [recipeComment],
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  ownerName: String,
  ownerAvatar: String,
  freaquency: Number,
  datesUsed: Date,
  requested: [{type: Schema.Types.ObjectId, ref: "Profile"}],
  temp: Number,
  rating: [Number],
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}