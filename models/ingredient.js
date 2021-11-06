import mongoose from 'mongoose'

const ingredientSchema = new mongoose.Schema({
  ammount: Number,
  measurement: String,
  itemName: String,
  metricImperial: Boolean,
}, {
  timestamps: true
})

const Ingredient = mongoose.model('Ingredient', ingretientSchema)

export {
  Ingredient
}