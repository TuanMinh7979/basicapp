import User from "../models/User.js";
import { createError } from "../utils/errorUtil.js";
//
import Candidate from "../models/Candidate.js";
import Rec from "../models/Rec.js";
import { filterNotObj } from "../utils/commonUtil.js";

export const updateUser = async (req, res, next) => {
  req.body = filterNotObj(req.body, "roleInp", "passwordInp");
  try {
    const {
      usernameInp,

      ...details
    } = req.body;

    //khong cho cap nhat role
    const generalUser = {
      username: usernameInp,
    };
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: generalUser,
      },
      { new: true }
    );

    if (updatedUser === null)
      return next(createError(404, "Deo tim thay User roi"));

    let updatedUserDetail = {};
    if (updatedUser.role !== "admin") {
      try {
        if (updatedUser.role == "candidate") {
          updatedUserDetail = await Candidate.findOneAndUpdate(
            { userId: updatedUser._id },
            {
              $set: details,
            },
            { new: true }
            //return updated model
          );
        } else if (updatedUser.role == "rec") {
          updatedUserDetail = await Rec.findOneAndUpdate(
            { userId: updatedUser._id },
            {
              $set: details,
            },
            //return updated model
            { new: true }
          );
        }
      } catch (e) {
        next(e);
      }
    }

    //doi voi user la admin thi return o day
    return res
      .status(200)
      .json({ ...updatedUser._doc, ...updatedUserDetail._doc });
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser === null)
      return next(createError(404, "Khong tim thay User roi"));

    if (deletedUser.role !== "admin") {
      try {
        if (deletedUser.role === "candidate") {
          let deletedCandidate = await Candidate.deleteOne({
            userId: req.params.id,
          });
        } else if (deletedUser.role === "rec") {
          let deletedRec = await Rec.deleteOne({
            userId: req.params.id,
          });
        }
      } catch (e) {
        next(e);
      }
    }

    return res.status(200).json("User deleted");
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user === null) return next(createError(404, "Khong tim thay User"));
    let userDetail = {};
    try {
      if (user.role === "candidate") {
        userDetail = await Candidate.findOne({ userId: user._id });
      } else if (user.role === "rec") {
        userDetail = await Rec.findOne({ userId: user._id });
      }
    } catch (e) {
      next(e);
    }

    res.status(200).json({ ...user._doc, ...userDetail._doc });
  } catch (err) {
    next(err);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
