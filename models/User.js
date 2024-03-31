import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://media1.popsugar-assets.com/files/thumbor/buWdnDGXIwq2W0GPi4GphC0BYHo/1053x0:4798x3745/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/07/09/676/n/1922283/5f4fe68a5d24af5c764be1.10464443_/i/Who-Plays-Alexei-Stranger-Things-Season-3.jpg",
    },
    dictionary: [
      {
        word: { type: String, required: true },
        translatedWord: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
