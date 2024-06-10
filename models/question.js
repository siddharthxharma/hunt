import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const questionSchema = new mongoose.Schema({
  problem: {
    type: String,
    required: [true, "Please provide problem statement!"],
  },
  answer: {
    type: String,
    required: [true, "Please provide the answer!"],
    select: false, // Don't include the answer in queries by default
  },
  level: {
    type: Number,
    min: 0,
    unique: true,
    required: [true, "Please provide level number!"],
  },
  image: {
    type: [String],
    required: false,
  }
});

// Pre-save hook to hash the answer before saving it
questionSchema.pre("save", async function (next) {
  if (!this.isModified("answer")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.answer = await bcrypt.hash(this.answer.toLowerCase(), salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Questions = mongoose.models.Questions || mongoose.model("Questions", questionSchema);
export default Questions;
