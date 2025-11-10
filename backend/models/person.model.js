import { Schema , model} from "mongoose";

export const PersonSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
 
});

export const PersonModel = model("Person", PersonSchema);

