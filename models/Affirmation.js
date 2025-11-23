import { Schema, model } from "mongoose";

const AffirmationSchema = new Schema({
  text: { type: String, required: true },
});

const Affirmation = model("Affirmation", AffirmationSchema);

export default Affirmation;
