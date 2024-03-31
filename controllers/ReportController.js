import ReportModel from "../models/Report.js";

export const createReport = async (req, res) => {
  try {
    const doc = new ReportModel({
      userId: req.userId,
      word: req.body.word,
      translatedWord: req.body.translatedWord,
      correctedWord: req.body.correctedWord,
    });

    await doc.save();

    res.json({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Smth went wrong",
    });
  }
};
