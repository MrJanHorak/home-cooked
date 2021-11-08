import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ingredientSchema = new Schema({
  ammount: Number,
  measurement: String,
  itemName: String,
  metricImperial: Boolean,
}, {
  timestamps: true
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

export {
  Ingredient
}