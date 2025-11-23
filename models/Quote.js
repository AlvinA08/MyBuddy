import { Schema, model } from "mongoose";

const QuoteSchema = new Schema({
  text: { type: String, required: true },
  author: { type: String },
});

const Quote = model("Quote", QuoteSchema);

export default Quote;
