import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        message: "Wrong email or password",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return res.status(401).json({
        message: "Wrong password or email",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({ userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Smth went wrong",
    });
  }
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      nickname: req.body.nickname,
      passwordHash: hash,
      dictionary: [],
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Smth went wrong",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "No user found",
      });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "No access",
    });
  }
};

export const addWord = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    let dublicate = false;
    if (!user) {
      return res.status(404).json({
        message: "No user found",
      });
    }

    console.log(user.dictionary);
    user.dictionary.forEach(({ word }) => {
      if (word.toLowerCase() === req.body.word.toLowerCase()) {
        dublicate = true;
      }
    });
    if (dublicate) {
      res.json({ message: "dublicate" });
      console.log("dubl");
    } else {
      user.dictionary.push(req.body);
      await user.save();
      res.json({ message: "Success" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "No access",
    });
  }
};
