import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    word: {
      type: String,
      required: true,
    },
    translatedWord: {
      type: String,
      required: true,
    },
    correctedWord: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Report", ReportSchema);
