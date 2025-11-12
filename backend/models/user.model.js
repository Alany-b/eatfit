import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    age: {
      type: Number,
      min: 0,
      max: 120,
    },
    gender: {
      type: String,
      enum: ["Femenino", "Masculino", "Otro"],
    },
    condition: { type: String },
    objective: { type: String },
  },
  { timestamps: true ,
    versionKey: false,
  }
);

export const UserModel = mongoose.model("User", userSchema);
