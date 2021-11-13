import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    name: String,
    avatar: String,
    role: { type:String, default:"user"},
    likeLevel: Number,
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    mealplans: [{ type: Schema.Types.ObjectId, ref: "MealPlan" }],
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export { Profile };
